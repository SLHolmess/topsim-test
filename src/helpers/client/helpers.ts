export function replaceSimDetailVariables(sosim: string, nhamang: string, loaisim: string, giaban: string, raw: string): string {
  return raw
    .replace("{sosim}", sosim)
    .replace("{nhamang}", nhamang)
    .replace("{loaisim}", loaisim)
    .replace("{giaban}", giaban);
}