'use strict'

const Env = use('Env')

module.exports = {
    apiKey: Env.get('STREAM_API_KEY', 'nuwj7gkk6j2q'),
    apiSecret: Env.get("STREAM_API_SECRET", "e55fmvym3xgsjfrzj52xy49sv7xpxc5fvwyue5yebdszhhauu5s8hkgrzuar55sf"),
    appId: Env.get("STREAM_APP_ID", "34815")

}
