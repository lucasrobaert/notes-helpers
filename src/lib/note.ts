import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const notesDirectory = path.join(process.cwd(), '_notes')

export type NoteProps = {
  slug: string
  title?: string
  contentHtml?: string
}

export function getAllNotesData() {
  const fileNames = fs.readdirSync(notesDirectory)
  const allnotesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')

    const fullPath = path.join(notesDirectory, fileName)

    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      slug,
      ...matterResult.data
    }
  })

  return allnotesData
}

export function getAllNotesIds() {
  const fileNames = fs.readdirSync(notesDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getNoteData(slug: string) {
  const fullPath = path.join(notesDirectory, `${slug}.md`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    ...matterResult.data
  }
}
