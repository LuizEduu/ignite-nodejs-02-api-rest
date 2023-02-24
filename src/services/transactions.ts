import { knex } from '../infra/database'

import { randomUUID } from 'node:crypto'

export class TransactionsService {
  async save(transaction: any) {
    await knex('transactions').insert({
      id: randomUUID(),
      title: transaction.title,
      amount: transaction.amount,
      created_at: Date.now(),
    })
  }

  async get() {
    return knex('transactions').select('*')
  }
}
