'use strict'

class SignUpUser {
  get rules() {
    return {
      "name": "required|min:2",
      "lastname": "required|min:2",
      "email": "required|email|unique:users",
      "password": "required|min:6",
      "dob": "required|date"
    }
  }

  get messages() {
    return {
      "name.required": "Informe seu nome",
      "name.min": "Seu nome deve ter no mínimo 2 letras",
      
      "lastname.required": "Informe seu sobrenome",
      "lastname.min": "Seu sobrenome deve ter no mínimo 2 letras",

      "email.required": "Informe seu email",
      "email.email": "Seu email deve ser válido",
      "email.unique": "Este email já está sendo usado",

      "password.required": "Informe uma senha",
      "password.min": "Sua senha deve ter no mínimo 6 caracteres",
      
      "dob.required": "Informe sua data de nascimento",
      "dob.date": "Informe dia, mês e ano"
    }
  }

  get sanitizationRules () {
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

module.exports = SignUpUser
