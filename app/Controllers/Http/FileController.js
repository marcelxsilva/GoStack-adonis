'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async store({ request, response }) {
    try {
      if (!request.file('file')) return
      const upload = request.file('file', { size: '2mb' })

      const fileName = `${Date.now()}.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName,
      })

      if (!upload.moved()) {
        throw upload.error()
      }
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })
      return file

    } catch (error) {
      return response.send({ error: { message: 'erro no upload de arquivo' } })
    }
  }
  async show({ params, response }) {
    try {
      const file = await File.findOrFail(params.id)
      return response.download(Helpers.tmpPath(`uploads/${file.file}`))

    } catch (error) {
      return response.send({ error: { message: 'erro ao buscar arquivo' } })
    }
  }
}

module.exports = FileController
