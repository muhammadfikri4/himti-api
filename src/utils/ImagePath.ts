import { environment } from "libs"

export const ImagePath = (filename:string) => {
  const endpoint = environment.STORAGE.ENDPOINT
  const bucket = environment.STORAGE.BUCKET
  const path = 'object/public'
  const folder = 'assets'

  return `${endpoint}/${path}/${bucket}/${folder}/${filename}`
}