/**
 * Clean-room parser for Bungie's TGXM gear-geometry container, plus a minimal
 * mesh extractor. The binary format was reverse-engineered from public
 * documentation (Lowlines' write-up) and validated byte-for-byte against live
 * Bungie geometry — no third-party code was copied (the reference loader is
 * unlicensed and 2017-era).
 *
 * Container layout (validated):
 *   header:  "TGXM"(4) version:u32 fileTableOffset:u32 fileCount:u32
 *   table:   fileCount entries, stride 272 = name[256] offset:u64 size:u64
 *   files:   render_metadata.js (JSON) + *.vertexbuffer.tgx + *.indexbuffer.tgx
 */

export type PlatePlacement = {
  /** Exact internal PNG name to resolve from the gear-asset textures[]. */
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type DiffusePlate = {
  width: number;
  height: number;
  placements: PlatePlacement[];
};

export type GearMesh = {
  /** xyz triplets in model space */
  positions: number[];
  /** xyz triplets */
  normals: number[];
  /** uv pairs (dequantized into [0,1] plate space) */
  uvs: number[];
  /** triangle-list indices */
  indices: number[];
  /** Diffuse texture plate (placements resolved to PNGs server-side). */
  diffusePlate: DiffusePlate | null;
};

type VertexElement = {
  semantic: string;
  type: string;
  offset: number;
  normalized?: boolean;
};
type VertexFormat = { stride: number; elements: VertexElement[] };
type LayoutDef = { formats: VertexFormat[] };
type StagePart = {
  start_index: number;
  index_count: number;
  primitive_type: number;
  lod_category?: { value: number };
};
type RenderMesh = {
  vertex_buffers: { file_name: string; stride: number }[];
  index_buffer: { file_name: string; value_byte_size?: number };
  stage_part_list: StagePart[];
  stage_part_vertex_stream_layout_definitions: LayoutDef[];
  /** [scaleX, scaleY, offsetX, offsetY] to dequantize the texcoord stream. */
  texcoord0_scale_offset?: number[];
};
type TexturePlacement = {
  texture_tag_name: string;
  position_x: number;
  position_y: number;
  texture_size_x: number;
  texture_size_y: number;
};
type TexturePlate = {
  plate_set?: {
    diffuse?: { plate_size?: number[]; texture_placements?: TexturePlacement[] };
  };
};
type RenderMetadata = {
  render_model?: { render_meshes?: RenderMesh[] };
  texture_plates?: TexturePlate[];
};

const TABLE_ENTRY_STRIDE = 272;
const NAME_BYTES = 256;
const HIGHEST_LOD = 0;

function parseContainer(buffer: ArrayBuffer): {
  files: Map<string, Uint8Array>;
  metadata: RenderMetadata;
} {
  const u8 = new Uint8Array(buffer);
  const dv = new DataView(buffer);
  const magic = String.fromCharCode(u8[0], u8[1], u8[2], u8[3]);
  if (magic !== "TGXM") {
    throw new Error(`Not a TGXM container (magic="${magic}")`);
  }

  const tableOffset = dv.getUint32(8, true);
  const fileCount = dv.getUint32(12, true);
  const files = new Map<string, Uint8Array>();

  for (let i = 0; i < fileCount; i += 1) {
    const base = tableOffset + i * TABLE_ENTRY_STRIDE;
    let name = "";
    for (let c = 0; c < NAME_BYTES; c += 1) {
      const ch = u8[base + c];
      if (ch === 0) break;
      name += String.fromCharCode(ch);
    }
    // offset/size are u64 LE; geometry files are well under 4 GB so the low
    // dword is sufficient.
    const offset = dv.getUint32(base + NAME_BYTES, true);
    const size = dv.getUint32(base + NAME_BYTES + 8, true);
    files.set(name, u8.subarray(offset, offset + size));
  }

  const metaBytes = files.get("render_metadata.js");
  if (!metaBytes) {
    throw new Error("TGXM container missing render_metadata.js");
  }
  return {
    files,
    metadata: JSON.parse(new TextDecoder().decode(metaBytes)) as RenderMetadata,
  };
}

/** Byte size of one vertex attribute by its TFX format name. */
function elementByteSize(type: string): number {
  if (type.includes("float4")) return 16;
  if (type.includes("float3")) return 12;
  if (type.includes("float2")) return 8;
  if (type.includes("short4")) return 8;
  if (type.includes("short2")) return 4;
  if (type.includes("ubyte4") || type.includes("byte4")) return 4;
  if (type.includes("short")) return 2;
  if (type.includes("float")) return 4;
  return 4;
}

function findElement(mesh: RenderMesh, semanticPart: string) {
  const defs = mesh.stage_part_vertex_stream_layout_definitions ?? [];
  for (const def of defs) {
    for (let formatIndex = 0; formatIndex < (def.formats?.length ?? 0); formatIndex += 1) {
      const format = def.formats[formatIndex];
      const elements = format.elements ?? [];
      for (let ei = 0; ei < elements.length; ei += 1) {
        const element = elements[ei];
        if (element.semantic?.includes(semanticPart)) {
          // The declared `offset` field is unreliable — it overlaps siblings
          // (e.g. position float4@0 and normal short4@8 both claim byte 8).
          // The real layout is tightly packed in declaration order, so derive
          // the byte offset from the sizes of the preceding elements. Verified
          // against live data: position@0, normal@16, tangent@24 (stride 32).
          let packed = 0;
          for (let j = 0; j < ei; j += 1) packed += elementByteSize(elements[j].type);
          return {
            bufferIndex: formatIndex,
            type: element.type,
            normalized: element.normalized,
            offset: packed,
            stride: format.stride,
          };
        }
      }
    }
    if (def.formats?.length) break; // first layout describes the renderable streams
  }
  return null;
}

function readVec3(
  view: DataView,
  byteOffset: number,
  type: string,
  normalized: boolean | undefined,
): [number, number, number] {
  if (type.includes("float")) {
    return [
      view.getFloat32(byteOffset, true),
      view.getFloat32(byteOffset + 4, true),
      view.getFloat32(byteOffset + 8, true),
    ];
  }
  // short / normalized short
  const divisor = normalized ? 32767 : 1;
  return [
    view.getInt16(byteOffset, true) / divisor,
    view.getInt16(byteOffset + 2, true) / divisor,
    view.getInt16(byteOffset + 4, true) / divisor,
  ];
}

function extractRenderMesh(
  mesh: RenderMesh,
  files: Map<string, Uint8Array>,
  plate: DiffusePlate | null,
): GearMesh | null {
  const position = findElement(mesh, "position");
  if (!position) return null;
  const normal = findElement(mesh, "normal");
  const texcoord = findElement(mesh, "texcoord");

  const positionFile = mesh.vertex_buffers?.[position.bufferIndex]?.file_name;
  const positionBytes = positionFile ? files.get(positionFile) : undefined;
  if (!positionBytes) return null;
  const vbView = new DataView(
    positionBytes.buffer,
    positionBytes.byteOffset,
    positionBytes.byteLength,
  );
  const stride = position.stride;
  const vertexCount = Math.floor(positionBytes.byteLength / stride);

  // Texcoords usually live in a second vertex buffer (stride 4, short2),
  // dequantized into [0,1] plate space via texcoord0_scale_offset.
  const uvFile =
    texcoord != null ? mesh.vertex_buffers?.[texcoord.bufferIndex]?.file_name : undefined;
  const uvBytes = uvFile ? files.get(uvFile) : undefined;
  const uvView = uvBytes
    ? new DataView(uvBytes.buffer, uvBytes.byteOffset, uvBytes.byteLength)
    : null;
  const [su, sv, ou, ov] = mesh.texcoord0_scale_offset ?? [1, 1, 0, 0];

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const sameBuffer = normal != null && normal.bufferIndex === position.bufferIndex;
  for (let v = 0; v < vertexCount; v += 1) {
    const vertexBase = v * stride;
    const p = readVec3(vbView, vertexBase + position.offset, position.type, position.normalized);
    positions.push(p[0], p[1], p[2]);
    if (sameBuffer && normal) {
      const n = readVec3(vbView, vertexBase + normal.offset, normal.type, normal.normalized);
      normals.push(n[0], n[1], n[2]);
    } else {
      normals.push(0, 0, 1);
    }
    if (uvView && texcoord) {
      const o = v * texcoord.stride + texcoord.offset;
      const rawU = uvView.getInt16(o, true) / 32767;
      const rawV = uvView.getInt16(o + 2, true) / 32767;
      uvs.push(rawU * su + ou, rawV * sv + ov);
    } else {
      uvs.push(0, 0);
    }
  }

  const indexBytes = files.get(mesh.index_buffer.file_name);
  if (!indexBytes) return null;
  const ibView = new DataView(indexBytes.buffer, indexBytes.byteOffset, indexBytes.byteLength);
  const indexIsU16 = (mesh.index_buffer.value_byte_size ?? 2) === 2;
  const RESTART = indexIsU16 ? 0xffff : 0xffffffff;
  const readIndex = (i: number) =>
    indexIsU16 ? ibView.getUint16(i * 2, true) : ibView.getUint32(i * 4, true);

  const indices: number[] = [];
  for (const part of mesh.stage_part_list ?? []) {
    if ((part.lod_category?.value ?? 0) !== HIGHEST_LOD) continue;
    const start = part.start_index;
    const count = part.index_count;
    if (part.primitive_type === 5) {
      // Triangle strip. Bungie joins sub-strips with a 0xFFFF primitive-restart
      // sentinel (and sometimes degenerate triangles). Reset the running window
      // and winding parity on restart / any out-of-range index; skip degenerate
      // triangles but keep advancing parity so winding stays consistent.
      let a = -1;
      let b = -1;
      let tri = 0;
      for (let i = 0; i < count; i += 1) {
        const idx = readIndex(start + i);
        if (idx === RESTART || idx >= vertexCount) {
          a = -1;
          b = -1;
          tri = 0;
          continue;
        }
        if (a >= 0 && b >= 0) {
          if (a !== b && b !== idx && a !== idx) {
            if (tri % 2 === 0) indices.push(a, b, idx);
            else indices.push(a, idx, b);
          }
          tri += 1;
        }
        a = b;
        b = idx;
      }
    } else {
      // triangle list
      for (let i = 0; i + 2 < count; i += 3) {
        const a = readIndex(start + i);
        const b = readIndex(start + i + 1);
        const c = readIndex(start + i + 2);
        if (a >= vertexCount || b >= vertexCount || c >= vertexCount) continue;
        indices.push(a, b, c);
      }
    }
  }

  return { positions, normals, uvs, indices, diffusePlate: plate };
}

function readDiffusePlate(metadata: RenderMetadata): DiffusePlate | null {
  const diffuse = metadata.texture_plates?.[0]?.plate_set?.diffuse;
  const size = diffuse?.plate_size;
  const placements = diffuse?.texture_placements;
  if (!diffuse || !size || !placements?.length) return null;
  return {
    width: size[0],
    height: size[1],
    placements: placements.map((p) => ({
      name: p.texture_tag_name,
      x: p.position_x,
      y: p.position_y,
      w: p.texture_size_x,
      h: p.texture_size_y,
    })),
  };
}

/** Parse a TGXM geometry container into renderable LOD-0 meshes. */
export function extractGearMeshes(buffer: ArrayBuffer): GearMesh[] {
  const { files, metadata } = parseContainer(buffer);
  const plate = readDiffusePlate(metadata);
  const meshes: GearMesh[] = [];
  for (const mesh of metadata.render_model?.render_meshes ?? []) {
    const extracted = extractRenderMesh(mesh, files, plate);
    if (extracted && extracted.indices.length > 0) {
      meshes.push(extracted);
    }
  }
  return meshes;
}
