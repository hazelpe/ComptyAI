export function integer(value, label, min = 0) {
  if (!Number.isSafeInteger(value) || value < min) {
    throw new TypeError(`${label} must be a safe integer >= ${min}`);
  }
  return value;
}

export function identifier(value, label) {
  if (typeof value !== 'string' || !/^[a-zA-Z0-9:_-]{1,128}$/.test(value)) {
    throw new TypeError(`${label} must be a non-empty identifier (1–128 characters)`);
  }
  return value;
}
