import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = 5002;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_FOLDER = path.join(__dirname, './dist');

app.use(express.static(DIST_FOLDER));

app.get('/*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  next();
});

app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.set('Content-Type', 'application/javascript');
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
