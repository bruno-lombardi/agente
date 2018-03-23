'use strict'

const Model = use('Model')

class Todo extends Model {

    static castDates(field, value) {
        if (field === 'created_at') {
            return `${value.locale("pt").fromNow()}`
        }
        return super.formatDates(field, value)
    }
}

module.exports = Todo
