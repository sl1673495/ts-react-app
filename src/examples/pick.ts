/**
 * 从对象中选出一个key的值。
 * @param obj
 * @param key
 */
export function pick<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4, f: 2 };
pick(x, "a");
