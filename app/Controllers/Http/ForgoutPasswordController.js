'use strict'
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgoutPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      await user.save()

      await Mail.send(
        ['emails.forgout_password'], // template de email
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        }, // parametros para o email
        message => {
          message.
            to(user.email)
            .from('test@gmail.com', 'Test | GoStack')
            .subject('Recuperacao de senha')
        }
      )


    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Email nao encontrado' } })
    }
  }
}

module.exports = ForgoutPasswordController
