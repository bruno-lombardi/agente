'use strict'

const stream = require('getstream')

class GetStream {
  constructor (Config) {
    this.Config = Config
    this.client = {}
  }

  async connect () {
    const config = this.Config.get(`getstream`)
    try {
        this.client = await stream.connect(config.apiKey, config.apiSecret, config.appId)
    } catch (e) {
        throw new Error(e)
    }
  }

  client () {
      return this.client
  }


}

module.exports = GetStream