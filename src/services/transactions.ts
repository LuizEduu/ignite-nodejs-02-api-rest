import { knex } from '../infra/database'

import { randomUUID } from 'node:crypto'

export class TransactionsService {
  async save(transaction: any) {
    await knex('transactions').insert({
      id: randomUUID(),
      title: transaction.title,
      amount:
        transaction.type === 'credit'
          ? transaction.amount
          : transaction.amount * -1,
      created_at: new Date(),
      session_id: transaction.sessionId,
    })
  }

  async get(sessionId: string) {
    return knex('transactions').select('*').where({
      session_id: sessionId,
    })
  }

  async getOne(id: string, sessionId: string) {
    return knex('transactions')
      .select('*')
      .where({
        session_id: sessionId,
        id,
      })
      .first()
  }

  async getSummary(sessionId: string) {
    return knex('transactions')
      .sum('amount', {
        as: 'amount',
      })
      .where({
        session_id: sessionId,
      })
      .first()
  }
}
