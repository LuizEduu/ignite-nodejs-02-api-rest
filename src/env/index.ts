import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else {
  config()
}

// informa que precisa ser um objeto e os dados que estão nesse objeto precisam ser do formato passado
const envSchema = z.object({
  PORT: z.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
})

// vai verificar os dados que estão no process.env, e se der match com o schema verificar os tipos
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid enviroment variable', _env.error.format())

  throw new Error('Invalid enviroment variables')
}

export const env = _env.data
