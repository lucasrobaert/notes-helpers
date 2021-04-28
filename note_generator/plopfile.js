module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a note',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'What is your note title'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../_notes/{{lowerCase title}}.md',
        templateFile: 'templates/faq.md.hbs'
      }
    ]
  })
}
