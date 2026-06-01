import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LoginPage } from './LoginPage'

const loginSubmit = vi.fn()

vi.mock('./hooks', () => ({
  useAuth: () => ({
    loginForm: {
      register: (name: string) => ({ name, onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn() }),
      handleSubmit:
        () =>
        (event: SubmitEvent): void => {
          event.preventDefault()
        },
      formState: {
        errors: {
          identifier: { message: 'Username/email is required' },
          password: { message: 'Password is required' },
        },
        isSubmitting: false,
      },
    },
    loginSubmit,
    loginError: null,
  }),
}))

describe('LoginPage', () => {
  it('shows validation errors from form state', async () => {
    render(<LoginPage />)
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText('Username/email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })
})
