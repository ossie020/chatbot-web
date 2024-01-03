import { Buffer } from 'buffer'
import PNGtext from 'png-chunk-text'
import extract from 'png-chunks-extract'

import { Tag } from '@/api/character'

export type CharCard = {
  name: string
  intro: string
  tags: string[]
  greeting: string
  personality: string
  scenario: string
  example_dialogs: string
}

export const importCharacter = async (
  filedata: File,
  format: string,
  allTagList: Tag[],
): Promise<CharCard | undefined> => {
  let jsonObj
  if (format == 'json') {
    const jsonText = await filedata.text()
    jsonObj = JSON.parse(jsonText)
  } else if (format == 'png') {
    const img_data = await parseText(filedata, format)
    if (img_data === undefined) throw new Error('Failed to read character file')
    jsonObj = JSON.parse(img_data)
  }

  if (jsonObj === undefined) {
    return undefined
  }

  console.debug(jsonObj)

  const filename = filedata.name.toLowerCase().replace(`.${format}`, '')
  if (filename.endsWith('_spec_v2')) {
    return parseCharaV2(jsonObj, allTagList)
  } else if (filename.endsWith('_spec_v1')) {
    return parseCharaV1(jsonObj, allTagList)
  } else if (filename.endsWith('_tavern')) {
    return parseTavern(jsonObj, allTagList)
  } else {
    return parseCharaV2(jsonObj, allTagList)
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

// tavern
const parseTavern = (jsonObj: any, allTagList: Tag[]): CharCard => {
  return {
    name: jsonObj.name || '',
    intro: jsonObj.creator_notes || '',
    tags: checkTags(jsonObj.tags, allTagList) || [],
    greeting: jsonObj.first_mes || '',
    personality: jsonObj.description || '',
    scenario: jsonObj.scenario || '',
    example_dialogs: jsonObj.mes_example || '',
  }
}

// chara_card_v2
const parseCharaV2 = (jsonObj: any, allTagList: Tag[]): CharCard => {
  jsonObj.data = jsonObj.data || {}
  return {
    name: jsonObj.data.name || '',
    intro: jsonObj.data.creator_notes || '',
    tags: checkTags(jsonObj.data.tags, allTagList) || [],
    greeting: jsonObj.data.first_mes || '',
    personality: jsonObj.data.description || '',
    scenario: jsonObj.data.scenario || '',
    example_dialogs: jsonObj.data.mes_example || '',
  }
}

// chara_card_v1
const parseCharaV1 = (jsonObj: any, allTagList: Tag[]): CharCard => {
  //TODO:
  return parseCharaV2(jsonObj, allTagList)
}

const checkTags = (tags: string[], allTagList: Tag[]): string[] => {
  const resTags = []
  for (const tag of tags) {
    const resTag = checkTag(tag, allTagList)
    if (resTag) {
      resTags.push(resTag.name)
    }
  }
  return resTags
}

const checkTag = (tag: string, allTagList: Tag[]): Tag | undefined => {
  for (const t of allTagList) {
    if (t.name.toLowerCase() === tag.toLowerCase()) {
      return t
    }
  }
}
