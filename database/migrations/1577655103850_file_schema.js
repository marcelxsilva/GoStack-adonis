'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.string('file').notNullable(),
      table.string('name').notNullable(),
      table.string('type',20) // image or arquivo
      table.string('subtype',20) // png or docx
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
