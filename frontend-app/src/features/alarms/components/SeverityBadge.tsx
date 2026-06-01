import type { AlarmSummary } from '../../core-types'

export function SeverityBadge({ severity }: { severity: AlarmSummary['severity'] }) {
  const classes = {
    info: 'border-[#00D4FF]/20 bg-[#00D4FF]/10 text-[#00D4FF]',
    warning: 'border-[#FFB020]/20 bg-[#FFB020]/10 text-[#FFB020]',
    critical: 'border-[#FF3D5A]/20 bg-[#FF3D5A]/10 text-[#FF3D5A]',
  }[severity]

  return <span className={`rounded-full border px-2 py-0.5 font-mono text-[8px] font-bold uppercase ${classes}`}>{severity}</span>
}
