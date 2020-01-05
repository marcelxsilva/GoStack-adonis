'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('session', 'SessionController.store')
Route.post('forgout-password', 'ForgoutPasswordController.store')
Route.put('forgout-password', 'ForgoutPasswordController.update')
Route.get('files/:id', 'FileController.show')

Route.group(() => {

  Route.post('files', 'FileController.store')
  Route.resource('projects', 'ProjectController').apiOnly()

}).middleware(['auth'])
