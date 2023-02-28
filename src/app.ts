import fastify from 'fastify'

import cookie from '@fastify/cookie'

import { transactionRoutes } from './infra/routes/transactions'

const app = fastify()

app.register(cookie)

app.register(transactionRoutes, {
  prefix: '/transactions',
})

export { app }
