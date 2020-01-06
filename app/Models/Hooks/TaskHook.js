'use strict'
const Mail = use('Mail')
const Helpers = use('Helpers')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
  // caso o user id nao seja fornecido, ou alterado ele nao fara nada
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()
  const { title } = taskInstance

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
