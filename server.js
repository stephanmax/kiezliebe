const Hapi = require('hapi')
const Joi = require('joi')

const OSM = require('./osm.js')

const server = Hapi.server({
  port: 3001,
  host: 'localhost'
})

server.route({
  method: 'GET',
  path: '/search',
  options: {
    validate: {
      query: {
        q: Joi.string(),
        limit: Joi.number().integer().min(1).max(20).default(5)
      }
    }
  },
  handler: (req) => OSM(req.query)
})

const init = async () => {
  await server.start()
  console.log(`Server running at ${server.info.uri}...`)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
