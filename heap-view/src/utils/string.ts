export const snakeToCamel = (value: any) =>
  String(value).replace(/-\w/g, m => m[1].toUpperCase());
