'use strict'

const User = use("App/Models/User")
const GetStream = use("GetStream/IO")

class UserController {

    async store({ request, response, auth }) {
        const { name, lastname, email, password, dob } = request.all()
        console.log(dob)
        console.log(new Date(dob))

        const user = await User.create({ name, lastname, email, password, dob: new Date(dob) })
        await auth.login(user)

        return response.redirect("/usuario/perfil")
    }

    async show({ auth, view }) {
        const user = await auth.getUser()

        let feed = GetStream.client.feed("user", user.id)

        const activities = await feed.get()

        return view.render("user/profile", { user, userFeed: JSON.stringify(activities, null, 2) })
    }

    async login({ request, response, auth, session }) {
        const { email, password } = request.all()

        try {
            await auth.attempt(email, password)
            return response.redirect("/usuario/perfil")
        } catch (e) {
            console.log(e)
            session.flash({ error: "Usuário ou senha incorretos" })
            return response.redirect("back")
        }
    }

}

module.exports = UserController
