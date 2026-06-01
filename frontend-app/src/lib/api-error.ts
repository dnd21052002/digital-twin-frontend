export type ApiErrorCode =
  | 'invalid_request'
  | 'unauthorized'
  | 'permission_denied'
  | 'not_found'
  | 'conflict'
  | 'rate_limited'
  | 'validation_failed'
  | 'connector_unavailable'
  | 'simulation_failed'
  | 'internal_error'
  | 'network_error'

export type ApiErrorResponse = {
  error: {
    code: ApiErrorCode | string
    message: string
    details?: unknown
  }
}

export class ApiError extends Error {
  code: string
  status: number
  details?: unknown

  constructor(message: string, code = 'internal_error', status = 500, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
    this.details = details
  }
}

export function parseApiError(payload: unknown, status = 500): ApiError {
  if (
    payload &&
    typeof payload === 'object' &&
    'error' in payload &&
    payload.error &&
    typeof payload.error === 'object' &&
    'message' in payload.error
  ) {
    const error = payload.error as ApiErrorResponse['error']
    return new ApiError(error.message, String(error.code), status, error.details)
  }

  return new ApiError('Request failed', 'internal_error', status)
}
