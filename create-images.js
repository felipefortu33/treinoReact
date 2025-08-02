const sharp = require('sharp');

async function createImages() {
  // Criar ícone principal (512x512)
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 59, g: 130, b: 246, alpha: 1 } // Azul #3B82F6
    }
  })
  .png()
  .toFile('./assets/images/icon.png');

  console.log('✅ icon.png criado');

  // Criar splash icon (200x200 como configurado)
  await sharp({
    create: {
      width: 200,
      height: 200,
      channels: 4,
      background: { r: 59, g: 130, b: 246, alpha: 1 }
    }
  })
  .png()
  .toFile('./assets/images/splash-icon.png');

  console.log('✅ splash-icon.png criado');

  // Criar favicon (32x32)
  await sharp({
    create: {
      width: 32,
      height: 32,
      channels: 4,
      background: { r: 59, g: 130, b: 246, alpha: 1 }
    }
  })
  .png()
  .toFile('./assets/images/favicon.png');

  console.log('✅ favicon.png criado');
}

createImages().catch(console.error);
