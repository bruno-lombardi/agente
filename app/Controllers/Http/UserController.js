'use strict'

const User = use("App/Models/User")

class UserController {

    async store({ request, response, auth }) {
        const { name, lastname, email, password, dob } = request.all()
        const user = await User.create({ name, lastname, email, password, dob: new Date(dob) })
        await auth.login(user)

        return response.redirect("/")
    }

    async show({ auth, view }) {
        const user = await auth.getUser()
        console.log(user.name)
        return view.render("user/profile", { user })
    }

}

module.exports = UserController
