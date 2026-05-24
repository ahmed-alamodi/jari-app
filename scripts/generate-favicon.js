const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

async function generateFavicon() {
  const svgPath = path.join(__dirname, '../public/logo.svg');
  
  // Render SVG at different sizes
  const sizes = [16, 32, 48, 256];
  const pngBuffers = [];
  
  for (const size of sizes) {
    const png = await sharp(svgPath)
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers.push({ size, buffer: png });
  }
  
  // Create ICO file containing these PNGs
  const icoBuffer = createIco(pngBuffers);
  
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
  
  // Also write individual favicon-16 and favicon-32 PNGs
  const png16 = pngBuffers.find(img => img.size === 16).buffer;
  const png32 = pngBuffers.find(img => img.size === 32).buffer;
  const png180 = await sharp(svgPath).resize(180, 180).png().toBuffer(); // Apple touch icon
  
  fs.writeFileSync(path.join(__dirname, '../public/icons/favicon-16.png'), png16);
  fs.writeFileSync(path.join(__dirname, '../public/icons/favicon-32.png'), png32);
  fs.writeFileSync(path.join(__dirname, '../public/icons/apple-touch-icon.png'), png180);
  
  // Also write src/app/favicon.png (32x32 PNG) which is used by some Next.js configs
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.png'), png32);
  
  console.log('Successfully generated favicon.ico (ICO format) and individual PNGs.');
}

function createIco(images) {
  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type (1 = Icon)
  header.writeUInt16LE(images.length, 4); // Number of images
  
  const entries = [];
  let currentOffset = 6 + 16 * images.length;
  
  for (const img of images) {
    const entry = Buffer.alloc(16);
    const width = img.size >= 256 ? 0 : img.size;
    const height = img.size >= 256 ? 0 : img.size;
    
    entry.writeUInt8(width, 0); // Width
    entry.writeUInt8(height, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Size of image data
    entry.writeUInt32LE(currentOffset, 12); // Offset of image data
    
    entries.push(entry);
    currentOffset += img.buffer.length;
  }
  
  return Buffer.concat([
    header,
    ...entries,
    ...images.map(img => img.buffer)
  ]);
}

generateFavicon().catch(console.error);
