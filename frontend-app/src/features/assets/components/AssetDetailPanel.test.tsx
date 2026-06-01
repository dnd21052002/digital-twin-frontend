import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'
import { AssetDetailPanel } from './AssetDetailPanel'

function renderPanel() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <AssetDetailPanel />
    </QueryClientProvider>,
  )
}

describe('AssetDetailPanel', () => {
  it('renders empty selection state', () => {
    renderPanel()
    expect(screen.getByText(/Click vào asset/)).toBeInTheDocument()
  })
})
