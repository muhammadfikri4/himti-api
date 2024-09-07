import sharp from "sharp"

export const compressImage = async (buffer:Buffer) => {
  return await sharp(buffer)
    .webp({ quality: 100 })
    .toBuffer()

}