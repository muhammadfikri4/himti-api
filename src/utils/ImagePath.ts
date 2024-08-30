import { environment } from "libs"

export const ImagePath = (filename:string) => {
  const endpoint = environment.STORAGE.ENDPOINT.replace('s3', "")

  return `${endpoint}/${filename}`
}