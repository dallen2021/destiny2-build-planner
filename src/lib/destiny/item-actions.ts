import type { ItemLocation, NormalizedDestinyItem } from "./inventory";

export type ItemActionType =
  | "transfer-to-vault"
  | "transfer-to-character"
  | "equip"
  | "equip-set"
  | "pull-postmaster"
  | "set-lock";

export type ItemActionRequest =
  | {
      action: "transfer-to-vault" | "transfer-to-character" | "pull-postmaster";
      characterId: string;
      itemId: string;
      itemReferenceHash: number;
      membershipType: number;
      stackSize?: number;
    }
  | {
      action: "equip";
      characterId: string;
      itemId: string;
      membershipType: number;
    }
  | {
      action: "equip-set";
      characterId: string;
      itemIds: string[];
      membershipType: number;
    }
  | {
      action: "set-lock";
      characterId: string;
      itemId: string;
      locked: boolean;
      membershipType: number;
    };

export type BungieItemActionCommand = {
  body: Record<string, boolean | number | string | string[]>;
  path: string;
};

export type ItemDropTarget = {
  characterId: string;
  location: Extract<ItemLocation, "carried" | "equipped" | "vault">;
};

function getItemId(item: Pick<NormalizedDestinyItem, "id" | "itemInstanceId">) {
  return item.itemInstanceId ?? item.id;
}

function getItemCharacterId(
  item: Pick<NormalizedDestinyItem, "characterId">,
): string | null {
  return item.characterId;
}

function makeTransferAction({
  action,
  characterId,
  item,
  membershipType,
}: {
  action: "transfer-to-vault" | "transfer-to-character" | "pull-postmaster";
  characterId: string;
  item: NormalizedDestinyItem;
  membershipType: number;
}): ItemActionRequest {
  return {
    action,
    characterId,
    itemId: getItemId(item),
    itemReferenceHash: item.itemHash,
    membershipType,
    stackSize: Math.max(1, item.quantity),
  };
}

function makeEquipAction({
  characterId,
  item,
  membershipType,
}: {
  characterId: string;
  item: NormalizedDestinyItem;
  membershipType: number;
}): ItemActionRequest {
  return {
    action: "equip",
    characterId,
    itemId: getItemId(item),
    membershipType,
  };
}

export function buildDestinyItemActionCommand(
  request: ItemActionRequest,
): BungieItemActionCommand {
  switch (request.action) {
    case "transfer-to-vault":
    case "transfer-to-character":
      return {
        body: {
          characterId: request.characterId,
          itemId: request.itemId,
          itemReferenceHash: request.itemReferenceHash,
          membershipType: request.membershipType,
          stackSize: request.stackSize ?? 1,
          transferToVault: request.action === "transfer-to-vault",
        },
        path: "/Destiny2/Actions/Items/TransferItem/",
      };

    case "pull-postmaster":
      return {
        body: {
          characterId: request.characterId,
          itemId: request.itemId,
          itemReferenceHash: request.itemReferenceHash,
          membershipType: request.membershipType,
          stackSize: request.stackSize ?? 1,
        },
        path: "/Destiny2/Actions/Items/PullFromPostmaster/",
      };

    case "equip":
      return {
        body: {
          characterId: request.characterId,
          itemId: request.itemId,
          membershipType: request.membershipType,
        },
        path: "/Destiny2/Actions/Items/EquipItem/",
      };

    case "equip-set":
      return {
        body: {
          characterId: request.characterId,
          itemIds: request.itemIds,
          membershipType: request.membershipType,
        },
        path: "/Destiny2/Actions/Items/EquipItems/",
      };

    case "set-lock":
      return {
        body: {
          characterId: request.characterId,
          itemId: request.itemId,
          membershipType: request.membershipType,
          state: request.locked,
        },
        path: "/Destiny2/Actions/Items/SetLockState/",
      };
  }
}

export function planItemDropTransaction({
  item,
  membershipType,
  target,
}: {
  item: NormalizedDestinyItem;
  membershipType: number;
  target: ItemDropTarget;
}): ItemActionRequest[] {
  const actions: ItemActionRequest[] = [];
  const currentCharacterId = getItemCharacterId(item);
  const targetCharacterId = target.characterId;

  if (target.location === "vault") {
    if (item.location !== "vault" && currentCharacterId) {
      actions.push(
        makeTransferAction({
          action: "transfer-to-vault",
          characterId: currentCharacterId,
          item,
          membershipType,
        }),
      );
    }

    return actions;
  }

  if (item.location === "postmaster") {
    actions.push(
      makeTransferAction({
        action: "pull-postmaster",
        characterId: targetCharacterId,
        item,
        membershipType,
      }),
    );
  } else if (item.location === "vault") {
    actions.push(
      makeTransferAction({
        action: "transfer-to-character",
        characterId: targetCharacterId,
        item,
        membershipType,
      }),
    );
  } else if (currentCharacterId && currentCharacterId !== targetCharacterId) {
    actions.push(
      makeTransferAction({
        action: "transfer-to-vault",
        characterId: currentCharacterId,
        item,
        membershipType,
      }),
      makeTransferAction({
        action: "transfer-to-character",
        characterId: targetCharacterId,
        item,
        membershipType,
      }),
    );
  }

  if (target.location === "equipped") {
    actions.push(
      makeEquipAction({
        characterId: targetCharacterId,
        item,
        membershipType,
      }),
    );
  }

  return actions;
}
