import { Bell, Cpu, LogOut, Settings } from 'lucide-react'
import { env } from '../../config/env'
import { useAuth } from '../auth/hooks'

export function TopBar() {
  const { user, logoutSubmit } = useAuth()

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center gap-3 border-b border-white/5 bg-[#060B12]/95 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-2.5">
        <div className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-[#00D4FF] to-[#0066CC] text-white shadow-[0_0_18px_rgba(0,212,255,0.22)] after:absolute after:-inset-0.5 after:rounded-lg after:border after:border-[#00D4FF]/40">
          <Cpu size={14} />
        </div>
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#E4EDFB]">Digital Twin</div>
          <div className="text-[8px] uppercase tracking-[0.16em] text-[#3D5368]">IDC Command Center</div>
        </div>
      </div>
      <div className="h-5 w-px bg-white/5" />
      <div className="flex items-center gap-1 rounded-full border border-[#00E5A0]/20 bg-[#00E5A0]/10 px-2.5 py-1 font-mono text-[9px] text-[#00E5A0]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00E5A0]" /> LIVE
      </div>
      {env.useMockCore ? <div className="rounded-full border border-[#FFB020]/20 bg-[#FFB020]/10 px-2.5 py-1 font-mono text-[9px] text-[#FFB020]">MOCK CORE</div> : null}
      <div className="flex-1" />
      <div className="hidden gap-5 md:flex">
        <Kpi label="PUE" value="1.2" tone="ok" />
        <Kpi label="UPTIME" value="99.98%" tone="ok" />
        <Kpi label="POWER" value="2.5MW" tone="warn" />
        <Kpi label="TEMP" value="42°C" tone="ok" />
        <Kpi label="ALERTS" value="3" tone="err" />
      </div>
      <div className="h-5 w-px bg-white/5" />
      <button className="relative grid h-8 w-8 place-items-center rounded-md text-[#7A90AA] transition hover:bg-[#152338] hover:text-[#E4EDFB]" type="button">
        <Bell size={16} />
        <span className="absolute right-0.5 top-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#FF3D5A] text-[7px] font-bold text-white">3</span>
      </button>
      <button className="grid h-8 w-8 place-items-center rounded-md text-[#7A90AA] transition hover:bg-[#152338] hover:text-[#E4EDFB]" type="button">
        <Settings size={16} />
      </button>
      <button className="flex items-center gap-2 rounded-full border border-white/5 bg-[#152338] py-0.5 pl-1 pr-2.5" onClick={logoutSubmit} type="button">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[#00D4FF] to-[#A855F7] text-[9px] font-bold text-white">{user?.avatarInitials ?? 'OP'}</span>
        <span className="text-left leading-tight">
          <span className="block text-[11px] font-semibold text-[#E4EDFB]">{user?.displayName ?? user?.username}</span>
          <span className="block text-[9px] text-[#3D5368]">{user?.roles[0] ?? 'Operator'}</span>
        </span>
        <LogOut size={12} className="text-[#7A90AA]" />
      </button>
    </header>
  )
}

function Kpi({ label, value, tone }: { label: string; value: string; tone: 'ok' | 'warn' | 'err' }) {
  const color = tone === 'ok' ? 'text-[#00E5A0]' : tone === 'warn' ? 'text-[#FFB020]' : 'text-[#FF3D5A]'
  return (
    <div className="flex flex-col items-end gap-0.5 font-mono text-[10px] text-[#3D5368]">
      {label}<b className={`text-[11px] ${color}`}>{value}</b>
    </div>
  )
}
