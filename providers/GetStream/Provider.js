const { ServiceProvider } = require('@adonisjs/fold')

class GetStreamProvider extends ServiceProvider {
    register() {
        this.app.singleton('GetStream/IO', () => {
            const Config = this.app.use('Adonis/Src/Config')
            return new (require('.'))(Config)
        })
    }

    async boot() {
        const GetStream = this.app.use("GetStream/IO")
        await GetStream.connect()
    }
}

module.exports = GetStreamProvider