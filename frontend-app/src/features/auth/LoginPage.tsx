import { env } from '../../config/env'
import { useAuth } from './hooks'

export function LoginPage() {
  const { loginForm, loginSubmit, loginError } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = loginForm

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#0f172a,#020617_55%)] px-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-sky-950/30">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Operator Login</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{env.appName}</h1>
          <p className="mt-2 text-sm text-slate-400">Use backend auth. Core Digital Twin data can run in mock mode.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(loginSubmit)}>
          <label className="block text-left text-sm font-medium text-slate-200">
            Username or email
            <input
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-sky-500 transition focus:ring-2"
              autoComplete="username"
              {...register('identifier')}
            />
            {errors.identifier ? <span className="mt-1 block text-xs text-red-400">{errors.identifier.message}</span> : null}
          </label>

          <label className="block text-left text-sm font-medium text-slate-200">
            Password
            <input
              type="password"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-sky-500 transition focus:ring-2"
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password ? <span className="mt-1 block text-xs text-red-400">{errors.password.message}</span> : null}
          </label>

          {loginError ? <div className="rounded-lg border border-red-900 bg-red-950/70 px-3 py-2 text-sm text-red-200">{loginError}</div> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-sky-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  )
}
