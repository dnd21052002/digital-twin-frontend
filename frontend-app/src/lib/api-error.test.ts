import { describe, expect, it } from 'vitest'
import { ApiError, parseApiError } from './api-error'

describe('parseApiError', () => {
  it('maps backend error payload', () => {
    const error = parseApiError(
      { error: { code: 'validation_failed', message: 'from must be before to', details: { field: 'from' } } },
      400,
    )

    expect(error).toBeInstanceOf(ApiError)
    expect(error.code).toBe('validation_failed')
    expect(error.message).toBe('from must be before to')
    expect(error.status).toBe(400)
    expect(error.details).toEqual({ field: 'from' })
  })
})
