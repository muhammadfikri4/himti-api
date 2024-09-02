import sharp from "sharp"

export const compressImage = async (buffer:Buffer) => {
  return await sharp(buffer)
    .webp({ quality: 100 })
    .resize(150, 150)
    .toBuffer()

}