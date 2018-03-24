'use strict'

class SignInUser {
  get rules() {
    return {
      "email": "required|email",
      "password": "required|min:6",
    }
  }

  get messages() {
    return {
      "email.required": "Informe seu email",
      "email.email": "Seu email deve ser válido",

      "password.required": "Informe uma senha",
      "password.min": "Sua senha deve ter no mínimo 6 caracteres",
    }
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email|escape',
      password: "escape"
    }
  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect("back")
  }
}

module.exports = SignInUser
