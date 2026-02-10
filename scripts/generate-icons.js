/**
 * PWA 아이콘 생성 스크립트
 * SVG를 다양한 크기의 PNG로 변환
 */
import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const inputSvg = path.join(__dirname, '../public/logo.svg')
const outputDir = path.join(__dirname, '../public/icons')

async function generateIcons() {
  try {
    // icons 폴더가 없으면 생성
    await fs.mkdir(outputDir, { recursive: true })

    console.log('🎨 PWA 아이콘 생성 시작...\n')

    // 각 크기별로 PNG 생성
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`)

      await sharp(inputSvg)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toFile(outputPath)

      console.log(`✅ ${size}x${size} 아이콘 생성 완료`)
    }

    console.log('\n🎉 모든 아이콘이 성공적으로 생성되었습니다!')
  } catch (error) {
    console.error('❌ 아이콘 생성 중 오류 발생:', error)
    process.exit(1)
  }
}

generateIcons()
