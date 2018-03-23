'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const Todo = use("App/Models/Todo")

Route.on("/").render("welcome").as("home")

Route.on("/registrar").render("registrar").as('signup')
Route.on("/entrar").render("entrar").as('login')

Route.post("/usuario/registrar", "UserController.store").as("storeUser")
Route.get("/usuario/perfil", "UserController.show").as("userProfile")

Route.post("/todos", "TodoController.store").as("storeTodo")
Route.post("/api/todos", "TodoController.apiStore")
Route.get("/todos/delete/:id", "TodoController.destroy").as("destroyTodo")
Route.get("/todos/edit/:id", "TodoController.edit").as("editTodo")
Route.post("/todos/update/:id", "TodoController.update").as("updateTodo")