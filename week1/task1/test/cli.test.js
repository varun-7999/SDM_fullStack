import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const cli = fileURLToPath(new URL("../src/index.js", import.meta.url));

test("greets the world by default", () => {
  const output = execFileSync(process.execPath, [cli], { encoding: "utf8" });
  assert.equal(output, "Hello, World!\n");
});

test("greets a named person", () => {
  const output = execFileSync(process.execPath, [cli, "Ada"], {
    encoding: "utf8"
  });
  assert.equal(output, "Hello, Ada!\n");
});
