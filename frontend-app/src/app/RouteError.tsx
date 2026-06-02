import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'Unexpected application error'

  return (
    <main className="grid min-h-screen place-items-center bg-[#060B12] px-6 text-[#E4EDFB]">
      <section className="max-w-md rounded-2xl border border-[#FF3D5A]/20 bg-[#0A1220] p-6 shadow-2xl shadow-black/40">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF3D5A]">Application Error</p>
        <h1 className="mt-3 text-xl font-bold">Something failed while rendering this view.</h1>
        <p className="mt-3 text-sm leading-6 text-[#7A90AA]">{message}</p>
        <button className="mt-5 rounded-lg bg-[#00D4FF] px-4 py-2 text-sm font-bold text-[#06111F]" onClick={() => window.location.reload()} type="button">
          Reload app
        </button>
      </section>
    </main>
  )
}
