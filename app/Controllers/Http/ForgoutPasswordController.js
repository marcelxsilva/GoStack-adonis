'use strict'
const crypto = require('crypto')
const User = use('App/Models/User')

class ForgoutPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      await user.save()
      return
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Email nao encontrado' }})
    }
  }
}

module.exports = ForgoutPasswordController
