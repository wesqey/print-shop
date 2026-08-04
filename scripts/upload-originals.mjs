// Uploads your full-resolution print originals to Vercel Blob storage,
// and writes lib/originals-map.json mapping each filename to its
// hosted URL — that's what lib/prodigi.ts reads from when it submits
// a print order.
//
// SETUP (one-time):
// 1. In your Vercel dashboard: Storage tab -> Create Database -> Blob
// 2. Copy the BLOB_READ_WRITE_TOKEN it gives you into .env.local
//    (this script needs it to run locally)
// 3. npm install @vercel/blob
//
// USAGE:
//   node scripts/upload-originals.mjs "/path/to/your/full-res/folder"
//
// Filenames in that folder MUST match the "imageFile" values in
// lib/products.ts (e.g. if products.ts says imageFile: "coney-island.jpg",
// this folder needs a file named exactly "coney-island.jpg", just at
// full resolution instead of the compressed web-preview version).
//
// Safe to re-run any time you add/replace originals — it just
// re-uploads and rewrites the map.

import { put } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
dotenv.config({ path: path.join(projectRoot, ".env.local") });

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error('Usage: node scripts/upload-originals.mjs "/path/to/originals"');
  process.exit(1);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN in .env.local — see setup instructions at the top of this script.");
  process.exit(1);
}

const VALID_EXT = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff"]);

async function main() {
  const files = (await fs.readdir(sourceDir)).filter((f) =>
    VALID_EXT.has(path.extname(f).toLowerCase())
  );

  if (files.length === 0) {
    console.error(`No images found in ${sourceDir}`);
    process.exit(1);
  }

  const map = {};

  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const buffer = await fs.readFile(filePath);

    const { url } = await put(`originals/${file}`, buffer, {
      access: "public",
      addRandomSuffix: false, // keep filenames predictable so re-uploads overwrite cleanly
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    map[file] = url;
    console.log(`${file} -> ${url}`);
  }

  const mapPath = path.join(projectRoot, "lib", "originals-map.json");
  await fs.writeFile(mapPath, JSON.stringify(map, null, 2));
  console.log(`\nWrote ${Object.keys(map).length} entries to lib/originals-map.json`);
}

main();
