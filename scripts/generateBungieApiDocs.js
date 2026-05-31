#!/usr/bin/env node

const fs = require("fs");
const https = require("https");
const path = require("path");

const OPENAPI_URL =
  "https://raw.githubusercontent.com/Bungie-net/api/master/openapi-2.json";
const RENDERED_DOCS_URL = "https://bungie-net.github.io/";
const DOCS_DIR = path.join(__dirname, "..", "docs");
const OPENAPI_OUT = path.join(DOCS_DIR, "bungie-openapi-2.json");
const MARKDOWN_OUT = path.join(DOCS_DIR, "bungie-api-reference.md");

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          resolve(fetchText(new URL(res.headers.location, url).toString()));
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`GET ${url} failed with HTTP ${res.statusCode}`));
          res.resume();
          return;
        }

        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function cleanText(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function tableText(value) {
  return cleanText(value).replace(/\|/g, "\\|").replace(/\n/g, "<br>");
}

function schemaName(schema) {
  if (!schema) return "";
  if (schema.$ref) return schema.$ref.replace("#/definitions/", "");
  if (schema.type === "array") {
    return `${schemaName(schema.items) || schema.items?.type || "unknown"}[]`;
  }
  if (schema.enum) return `${schema.type || "enum"} enum`;
  if (schema.format) return `${schema.type || "value"}(${schema.format})`;
  return schema.type || "object";
}

function paramType(param) {
  if (param.schema) return schemaName(param.schema);
  if (param.type === "array") {
    return `${schemaName(param.items) || param.items?.type || "unknown"}[]`;
  }
  return param.format ? `${param.type}(${param.format})` : param.type || "object";
}

function emitParameters(lines, parameters = []) {
  if (!parameters.length) return;

  lines.push("#### Parameters", "");
  lines.push("| Name | In | Required | Type | Description |");
  lines.push("| --- | --- | --- | --- | --- |");

  for (const param of parameters) {
    lines.push(
      `| \`${param.name}\` | ${param.in || ""} | ${
        param.required ? "yes" : "no"
      } | \`${paramType(param)}\` | ${tableText(param.description)} |`
    );
  }

  lines.push("");
}

function emitResponses(lines, responses = {}) {
  const entries = Object.entries(responses);
  if (!entries.length) return;

  lines.push("#### Responses", "");
  lines.push("| Status | Type | Description |");
  lines.push("| --- | --- | --- |");

  for (const [status, response] of entries) {
    lines.push(
      `| ${status} | \`${schemaName(response.schema)}\` | ${tableText(
        response.description
      )} |`
    );
  }

  lines.push("");
}

function emitSecurity(lines, security) {
  if (!security || !security.length) return;

  const descriptions = security.map((entry) =>
    Object.entries(entry)
      .map(([name, scopes]) =>
        scopes && scopes.length ? `${name}(${scopes.join(", ")})` : name
      )
      .join(", ")
  );

  lines.push(`Security: ${descriptions.join(" OR ")}`, "");
}

function buildMarkdown(spec) {
  const lines = [];
  const paths = spec.paths || {};
  const definitions = spec.definitions || {};

  lines.push("# Bungie.Net API Reference Snapshot", "");
  lines.push(`Source OpenAPI: ${OPENAPI_URL}`, "");
  lines.push(`Rendered docs: ${RENDERED_DOCS_URL}`, "");
  lines.push(`API version: ${spec.info?.version || "unknown"}`, "");
  lines.push(`Generated: ${new Date().toISOString()}`, "");
  lines.push(
    "Note: This markdown is generated from Bungie's official OpenAPI specification. Re-generate when Bungie updates the spec or the live manifest changes.",
    ""
  );
  lines.push("---", "");

  lines.push("## API Info", "");
  lines.push(`Title: ${spec.info?.title || "Bungie.Net API"}`, "");
  if (spec.info?.description) lines.push(cleanText(spec.info.description), "");
  lines.push(
    `Base URL: ${spec.schemes?.[0] || "https"}://${spec.host || "www.bungie.net"}${
      spec.basePath || "/Platform"
    }`,
    ""
  );

  lines.push("## Security Definitions", "");
  for (const [name, definition] of Object.entries(
    spec.securityDefinitions || {}
  )) {
    lines.push(`### ${name}`, "");

    for (const [key, value] of Object.entries(definition)) {
      if (key === "scopes") continue;
      lines.push(`- ${key}: ${Array.isArray(value) ? value.join(", ") : value}`);
    }

    if (definition.scopes) {
      lines.push("", "Scopes:", "");
      for (const [scope, description] of Object.entries(definition.scopes)) {
        lines.push(`- \`${scope}\`: ${cleanText(description)}`);
      }
    }

    lines.push("");
  }

  lines.push("## Endpoints", "");
  for (const routePath of Object.keys(paths).sort()) {
    const pathItem = paths[routePath];
    const pathParams = pathItem.parameters || [];

    for (const method of Object.keys(pathItem)
      .filter((key) => ["get", "post", "put", "patch", "delete"].includes(key))
      .sort()) {
      const operation = pathItem[method];

      lines.push(`### ${method.toUpperCase()} ${routePath}`, "");
      if (operation.tags?.length) lines.push(`Tags: ${operation.tags.join(", ")}`, "");
      if (operation.operationId) {
        lines.push(`Operation ID: \`${operation.operationId}\``, "");
      }
      if (operation.summary) lines.push(cleanText(operation.summary), "");
      if (operation.description) lines.push(cleanText(operation.description), "");

      emitSecurity(lines, operation.security || spec.security);
      emitParameters(lines, [...pathParams, ...(operation.parameters || [])]);
      emitResponses(lines, operation.responses || {});
    }
  }

  lines.push("## Definitions", "");
  for (const [name, definition] of Object.entries(definitions).sort(([a], [b]) =>
    a.localeCompare(b)
  )) {
    lines.push(`### ${name}`, "");
    if (definition.description) lines.push(cleanText(definition.description), "");
    if (definition.type || definition.format) {
      lines.push(`Type: \`${schemaName(definition)}\``, "");
    }

    if (definition.enum) {
      lines.push("Enum values:", "");
      for (const value of definition.enum) lines.push(`- \`${value}\``);
      lines.push("");
    }

    const properties = Object.entries(definition.properties || {});
    if (properties.length) {
      const required = new Set(definition.required || []);

      lines.push("| Property | Type | Required | Description |");
      lines.push("| --- | --- | --- | --- |");
      for (const [property, schema] of properties) {
        lines.push(
          `| \`${property}\` | \`${schemaName(schema)}\` | ${
            required.has(property) ? "yes" : "no"
          } | ${tableText(schema.description)} |`
        );
      }
      lines.push("");
    }
  }

  return lines.join("\n");
}

async function main() {
  await fs.promises.mkdir(DOCS_DIR, { recursive: true });

  const openApiText = await fetchText(OPENAPI_URL);
  const spec = JSON.parse(openApiText);
  const markdown = buildMarkdown(spec);

  await fs.promises.writeFile(OPENAPI_OUT, `${JSON.stringify(spec, null, 2)}\n`);
  await fs.promises.writeFile(MARKDOWN_OUT, `${markdown}\n`);

  console.log(
    `Generated Bungie API docs: ${spec.info?.version || "unknown"} (${
      Object.keys(spec.paths || {}).length
    } paths, ${Object.keys(spec.definitions || {}).length} definitions)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
