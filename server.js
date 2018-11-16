const Boom = require('boom')
const DataTransform = require('node-json-transform').DataTransform
const Hapi = require('hapi')
const Joi = require('joi')

const map = require('./transform-map.js')
const osm = require('./osm.js')

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
  handler: (req) => osm(req.query)
    .then(res => DataTransform(res, map).transform())
    .catch(err => Boom.badRequest(err))
})

const init = async () => {
  await server.start()
  console.log(`Server running at ${server.info.uri}...`)
}

init()
