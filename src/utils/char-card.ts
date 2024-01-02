import { Buffer } from 'buffer'
import PNGtext from 'png-chunk-text'
import extract from 'png-chunks-extract'

export const importCharacter = async (filedata: File, format: string) => {
  console.log(format)
  console.log(filedata)
  // let png_name = '';
  // let uploadPath = path.join(UPLOADS_PATH, filedata.filename);

  if (format == 'png') {
    try {
      const img_data = await parseText(filedata, format)

      if (img_data === undefined)
        throw new Error('Failed to read character file')

      let jsonObject = JSON.parse(img_data)
      console.log(jsonObject)
    } catch (err) {}
  }
}

const parseText = async (filedata: File, format: string) => {
  let fileFormat = format === undefined ? 'png' : format
  try {
    switch (fileFormat) {
      case 'png': {
        // we need to get the raw bytes
        const buffer = await filedata.arrayBuffer()
        // each entry of array should contain 8 bits
        const bytes = new Uint8Array(buffer)

        const chunks = extract(bytes)

        const textChunks = chunks
          .filter(function (chunk: any) {
            return chunk.name === 'tEXt'
          })
          .map(function (chunk: any) {
            return PNGtext.decode(chunk.data)
          })

        if (textChunks.length === 0) {
          console.error('PNG metadata does not contain any character data.')
          throw new Error('No PNG metadata.')
        }

        const resText = Buffer.from(textChunks[0].text, 'base64').toString(
          'utf8',
        )
        return resText
      }
      default:
        break
    }
  } catch (err) {
    console.log(err)
  }
}
