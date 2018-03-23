'use strict'

const Todo = use("App/Models/Todo")
const { validateAll } = use("Validator")

class TodoController {

    async index({ view }) {

        const todos = await Todo.all()
        console.log(todos)
        return view.render("home", { todos: todos.toJSON() })
    }

    async validateStoreRequest(body) {
        const rules = {
            title: "required",
            content: "required"
        }

        const messages = {
            "title.required": "Sua tarefa precisa de um nome",
            "content.required": "Informe uma descrição para sua tarefa"
        }

        const validation = await validateAll(body, rules, messages)
        if (validation.fails()) {
            console.log()
            return {
                valid: false,
                messages: validation.messages()
            }
        }
        return {
            valid: true,
            messages: {}
        }
    }

    /**
     * Salva o todo no banco de dados
     * @param {*} param0 
     */
    async store({ request, response, session }) {
        const body = request.all()

        const validation = await this.validateStoreRequest(body)

        if (validation.valid) {
            const todo = await Todo.create({
                title: body.title,
                content: body.content
            })
        } else {
            session.withErrors(validation.messages).flashAll()
        }

        return response.redirect("/")
    }
    
    async destroy({response, session, params}) {
        const { id } = params

        const todo = await Todo.find(id)

        if(todo) {
            await todo.delete()
            session.flash({notification: "Tarefa deletada com sucesso!"})
            return response.redirect("back")
        }
        session.flash({notification: "Esta tarefa não existe!"})
        return response.redirect("back")

    }

    async edit({view, params, session, response}) {
        const {id} = params

        const todo = await Todo.find(id)

        if(todo) {
            return view.render("todo.edit", {todo: todo.toJSON()})
        } else {
            session.flash({notification: "Esta tarefa não existe"})
            return response.redirect("/")
        }

    }

    async update({request, response, session, params}) {
        const body = request.all()
        const {id} = params

        const validation = await this.validateStoreRequest(body)

        if (validation.valid) {
            const todo = await Todo.find(id)
            
            if(todo) {
                todo.title = body.title
                todo.content = body.content
                await todo.save()
                session.flash({notification: "Tarefa salva com sucesso!"})
                return response.redirect("/")
            } else {
                session.flash({notification: "Esta tarefa não existe!"})
                return response.redirect("/")
            }

        }

        session.withErrors(validation.messages).flashAll()
        return response.redirect("back")
    }

    async apiStore({ request, response }) {
        console.log(request.all())

        const { title, content } = request.all()

        const todo = await Todo.create({
            title,
            content
        })

        return response.json({ todo })
    }
}

module.exports = TodoController
