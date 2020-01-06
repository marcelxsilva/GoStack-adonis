'use strict'
const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  static get concurrency() {
    return 1 // quantidade de execucoes por vez
  }

  static get key() {
    return 'NewTaskMail-job' // um identificador da fila
  }

  async handle({ email, username, title, file }) {
    await Mail.send(
      ['emails.new_task'], // template
      { username, title, hasAttachment: !!file }, // dados a ser enviado para o template
      message => {
        message
          .to(email) // para
          .from('test@mail.com', 'Testando | Adonis') // quem enviará
          .subject('Nova Tarefa Atribuida') // titulo do email

        if (file) { // se existir um arquivo em anexo será enviado
          message.attach(Helpers.tmpPath(`uploads/${file.file}`),
            {
              filename: file.name
            })
        }
      }
    )
  }
}

module.exports = NewTaskMail

