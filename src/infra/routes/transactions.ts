import { FastifyInstance } from 'fastify'
import { TransactionsService } from '../../services/transactions'

const transactionService = new TransactionsService()

export async function transactionRoutes(app: FastifyInstance) {
  app.post('/', async (request, response) => {
    const { title, amount } = request.body

    await transactionService.save({ title, amount })
  })

  app.get('/', async (request, response) => {
    return transactionService.get()
  })
}
