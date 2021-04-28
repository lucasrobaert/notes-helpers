/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function noteData() {
  const notesDirectory = path.join(process.cwd(), '_notes')
  const fileNames = fs.readdirSync(notesDirectory)
  const notes = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(notesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      slug,
      title: matterResult.data.title
    }
  })
  return `export const notes = ${JSON.stringify(notes)}`
}

try {
  fs.readdirSync('cache')
} catch (e) {
  fs.mkdirSync('cache')
}

fs.writeFile('cache/data.js', noteData(), function (err) {
  if (err) return console.log(err)
  console.log('Notes cached.')
})
