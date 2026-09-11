import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root = path.resolve('out');
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};
try {
  await stat(path.join(root, 'index.html'));
} catch {
  console.error('Primero ejecuta npm run build.');
  process.exit(1);
}
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://127.0.0.1');
      const pathname = decodeURIComponent(url.pathname);
      let file = path.resolve(root, '.' + pathname);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
      } catch {}
      let data = await readFile(file);
      if (process.env.QA_METRICS === '1' && path.extname(file) === '.html') {
        const script = await readFile(path.resolve('scripts/browser-metrics.js'), 'utf8');
        data = Buffer.from(
          data.toString('utf8').replace('</body>', `<script>${script}</script></body>`),
        );
      }
      const gzip =
        data.length > 1024 &&
        /gzip/.test(req.headers['accept-encoding'] || '') &&
        /\.(html|js|css|json|txt|svg|xml)$/.test(file);
      if (gzip) data = gzipSync(data);
      res.writeHead(200, {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        Vary: 'Accept-Encoding',
        ...(gzip ? { 'Content-Encoding': 'gzip' } : {}),
      });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(await readFile(path.join(root, '404.html')));
    }
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`Entre etapas: http://127.0.0.1:${port} (solo este equipo)`),
  );
