// @ts-check

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import fastify from 'fastify'
import fastifyView from '@fastify/view'
import Handlebars from 'handlebars'

const currentDir = dirname(fileURLToPath(import.meta.url))

// Create a fastify server
const server = fastify({
  logger: true,
})

// Register the `@fastify/view` plugin
server.register(fastifyView, {
  engine: {
    handlebars: Handlebars
  },
  root: join(currentDir, 'views'),
  viewExt: 'hbs',
  includeViewExtension: true,
  layout: join(currentDir, 'views', 'layouts', 'main.hbs'),
  defaultContext: {
    title: 'My App'
  },
})

// Declare a basic route that uses the handlebars template engine
server.get('/', async (_request, reply) => {
  return reply.view('home', { title: 'My Homepage' })
})

// Run the server!
await server.listen({ port: 8080 })
