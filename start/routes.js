'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('session', 'SessionController.store').validator('Session')
Route.post('forgout-password', 'ForgoutPasswordController.store').validator('ForgoutPassword')
Route.put('forgout-password', 'ForgoutPasswordController.update').validator('ResetPassword')
Route.get('files/:id', 'FileController.show')

Route.group(() => {

  Route.post('files', 'FileController.store')
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['project.store'], ['Project']]]))
  Route.resource('projects.tasks', 'TaskController')
  .apiOnly()
  .validator(new Map([[['project.tasks.store'], ['Task']]]))

}).middleware(['auth'])
