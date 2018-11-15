const Boom = require('boom')
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
    .then(res => res.features)
    .catch(err => Boom.badRequest(err))
})

const init = async () => {
  await server.start()
  console.log(`Server running at ${server.info.uri}...`)
}

init()
