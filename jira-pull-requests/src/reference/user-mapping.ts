function getWhatKey(what: UserMappingDbKeys): number {
  validateWhat(what);
  return keys.indexOf(what);
}

function validateWhat(what: UserMappingDbKeys, exception = true) {
  const result = keys.includes(what);
  if (exception) {
    if (!result) {
      throw new Error(
        "Wrong argument, should be one of [" + keys.join(", ") + "]"
      );
    }
  }
  return result;
}

export default function get(
  db: UserMappingDbRow[],
  what: UserMappingDbKeys,
  by_what: UserMappingDbByKeys | UserMappingDbKeys,
  needle: string | number
): string | number | null {
  let what2: UserMappingDbKeys;
  if (by_what.startsWith("by_")) {
    what2 = by_what.substring(3) as UserMappingDbKeys;
  } else {
    what2 = by_what as UserMappingDbKeys;
  }
  const what_key: number = getWhatKey(what);
  const by_what_key: number = getWhatKey(what2);
  const found = db.find((r) => r[by_what_key] == needle);
  if (found) {
    return found[what_key];
  }
  return null;
}
