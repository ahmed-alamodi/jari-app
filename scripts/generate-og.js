const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // 1. Read logo.svg and remove the text element to keep only the icon (crescent + waves)
  const logoSvgPath = path.join(__dirname, '../public/logo.svg');
  const logoSvgContent = fs.readFileSync(logoSvgPath, 'utf8');
  
  // Regex to remove the text tag and its contents
  const logoIconOnlySvg = logoSvgContent.replace(/<text[\s\S]*?<\/text>/gi, '');
  
  // Resize the logo icon to 180x180 pixels
  const logoIconBuffer = await sharp(Buffer.from(logoIconOnlySvg))
    .resize(180, 180)
    .png()
    .toBuffer();

  // 2. Generate the background and typography SVG
  const bgSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background dark slate/blue gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    
    <!-- Primary brand emerald gradient -->
    <linearGradient id="jariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    
    <!-- Central glowing radial gradient -->
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#047857" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  
  <!-- Central Glow -->
  <circle cx="600" cy="315" r="450" fill="url(#glowGrad)" />

  <!-- Decorative Corner Frames -->
  <!-- Top Left -->
  <path d="M 50 120 L 50 50 L 120 50" stroke="#047857" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" />
  <!-- Top Right -->
  <path d="M 1150 120 L 1150 50 L 1080 50" stroke="#047857" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" />
  <!-- Bottom Left -->
  <path d="M 50 510 L 50 580 L 120 580" stroke="#047857" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" />
  <!-- Bottom Right -->
  <path d="M 1150 510 L 1150 580 L 1080 580" stroke="#047857" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" />

  <!-- App Name (Arabic) -->
  <text x="600" y="340" text-anchor="middle" fill="url(#jariGrad)" font-family="'Tajawal', 'Geeza Pro', 'Arial', sans-serif" font-weight="900" font-size="76">جاري</text>

  <!-- Subtitle -->
  <text x="600" y="405" text-anchor="middle" fill="#f8fafc" font-family="'Tajawal', 'Geeza Pro', 'Arial', sans-serif" font-weight="700" font-size="30">صدقة جارية وأذكار المسلم اليومية</text>

  <!-- Features List (Arabic) -->
  <text x="600" y="465" text-anchor="middle" fill="#94a3b8" font-family="'Tajawal', 'Geeza Pro', 'Arial', sans-serif" font-weight="500" font-size="22">أذكار الصباح والمساء • أذكار النوم والاستيقاظ • مسبحة إلكترونية تفاعلية • فهرس حصن المسلم</text>

  <!-- Website Link -->
  <text x="600" y="540" text-anchor="middle" fill="#10b981" font-family="'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="600" font-size="18" letter-spacing="1.5">jari-app.vercel.app</text>
</svg>
  `;

  const ogPath = path.join(__dirname, '../public/og-image.png');
  
  // 3. Composite the logo icon onto the center top of the image
  await sharp(Buffer.from(bgSvg))
    .composite([{
      input: logoIconBuffer,
      top: 60, // Y coordinate
      left: 510, // X coordinate (600 - 180/2 = 510)
    }])
    .png()
    .toFile(ogPath);

  console.log('Successfully generated public/og-image.png via compositing.');
}

generateOgImage().catch(console.error);
