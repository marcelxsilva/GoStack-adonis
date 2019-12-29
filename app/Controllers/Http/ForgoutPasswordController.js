'use strict'
const crypto = require('crypto')
const moment = require('moment')

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

  async update({ request, response }) {
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)
      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'Token expridado' } })
      }
      user.token = null
      user.token_created_at = null
      user.password = password
      await user.save()

      return response.send({ response: { message: 'Senha Alterada com Sucesso !!' } })

    } catch (error) {
      return response.status(error.status).send({
        error: { message: 'Ocorreu um erro' }
      })
    }
  }
}

module.exports = ForgoutPasswordController
