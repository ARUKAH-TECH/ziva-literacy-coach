// After `next build`, list every file in /out so the service worker can
// download the whole app for offline use (it is small: pages, scripts,
// styles and icons — no learner data).
import { readdirSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { createHash } from "node:crypto";

const out = "out";
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else files.push(path);
  }
})(out);

const skip = /(^|\/)(sw\.js|precache\.json|404\.html|.*\.txt|.*\.map)$/;
const urls = [];
const hash = createHash("sha256");
for (const file of files.sort()) {
  const rel = "/" + relative(out, file).split("\\").join("/");
  if (skip.test(rel)) continue;
  hash.update(rel).update(readFileSync(file));
  // Pages are requested as "/folder/" (trailing slash), not ".../index.html".
  urls.push(rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel);
}
const version = hash.digest("hex").slice(0, 12);
writeFileSync(join(out, "precache.json"), JSON.stringify({ version, urls }));
console.log(`precache.json: ${urls.length} files, version ${version}`);
