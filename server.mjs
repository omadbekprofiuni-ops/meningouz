// MeningoUz — tashqi bog'lamsiz statik SPA server.
// dist/ jildidagi fayllarni xizmat qiladi, topilmagan yo'llarni index.html ga
// yo'naltiradi (client-side routing uchun). Ishga tushirish: `npm start`.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "dist");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json",
};

async function send(res, filePath, status = 200) {
  const body = await readFile(filePath);
  res.writeHead(status, {
    "Content-Type": MIME[extname(filePath).toLowerCase()] || "application/octet-stream",
  });
  res.end(body);
}

const server = createServer(async (req, res) => {
  try {
    // so'rovdagi yo'lni xavfsiz tarzda dist ichiga moslash
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
    let filePath = join(ROOT, safe);

    let s = await stat(filePath).catch(() => null);
    if (s && s.isDirectory()) filePath = join(filePath, "index.html"), (s = await stat(filePath).catch(() => null));

    if (s && s.isFile()) return await send(res, filePath);

    // statik fayl topilmadi — bu SPA yo'li, index.html qaytaramiz
    return await send(res, join(ROOT, "index.html"), 200);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server xatosi: " + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`\n  MeningoUz SPA server ishga tushdi:`);
  console.log(`  ➜  http://localhost:${PORT}\n`);
});
