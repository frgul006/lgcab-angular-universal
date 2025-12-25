const https = require('https');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'assets', 'data');
const outputDir = path.join(__dirname, '..', 'src', 'assets', 'media', 'graphassets');
const urlPattern = /^https:\/\/[^\s"]*graphassets\.com\//i;

const contentTypeToExt = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg'
};

function walkAndCollectUrls(value, urls) {
  if (Array.isArray(value)) {
    value.forEach(item => walkAndCollectUrls(item, urls));
    return;
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach(item => walkAndCollectUrls(item, urls));
    return;
  }

  if (typeof value === 'string' && urlPattern.test(value)) {
    urls.add(value);
  }
}

function walkAndReplaceUrls(value, replacements) {
  if (Array.isArray(value)) {
    return value.map(item => walkAndReplaceUrls(item, replacements));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, walkAndReplaceUrls(item, replacements)])
    );
  }

  if (typeof value === 'string' && replacements.has(value)) {
    return replacements.get(value);
  }

  return value;
}

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadFile(res.headers.location, destination).then(resolve).catch(reject);
        return;
      }

      if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`Failed to fetch ${url} (${res.statusCode})`));
        res.resume();
        return;
      }

      const fileStream = fs.createWriteStream(destination);
      res.pipe(fileStream);
      fileStream.on('finish', () => fileStream.close(resolve));
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

function headContentType(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'HEAD' }, res => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        headContentType(res.headers.location).then(resolve).catch(reject);
        return;
      }

      if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`Failed to head ${url} (${res.statusCode})`));
        res.resume();
        return;
      }

      resolve(res.headers['content-type'] || '');
    });

    req.on('error', reject);
    req.end();
  });
}

async function run() {
  const files = fs
    .readdirSync(dataDir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(dataDir, file));

  const urls = new Set();

  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    walkAndCollectUrls(content, urls);
  }

  if (!urls.size) {
    console.log('No graphassets.com URLs found.');
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const replacements = new Map();

  for (const url of urls) {
    const parsed = new URL(url);
    const baseName = path.basename(parsed.pathname);
    let extension = '';

    try {
      const contentType = await headContentType(url);
      extension = contentTypeToExt[contentType.split(';')[0].trim()] || '';
    } catch (error) {
      console.warn(`Warning: could not resolve content type for ${url}: ${error.message}`);
    }

    const filename = `${baseName}${extension}`;
    const localPath = path.join(outputDir, filename);
    const publicPath = `assets/media/graphassets/${filename}`;

    if (!fs.existsSync(localPath)) {
      await downloadFile(url, localPath);
      console.log(`Downloaded ${url} -> ${localPath}`);
    } else {
      console.log(`Already exists ${localPath}`);
    }

    replacements.set(url, publicPath);
  }

  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    const updated = walkAndReplaceUrls(content, replacements);
    fs.writeFileSync(file, `${JSON.stringify(updated, null, 2)}\n`);
    console.log(`Updated ${file}`);
  }
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
