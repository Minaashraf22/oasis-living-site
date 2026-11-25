// Standard fixed-rate loan: M = P*r / (1-(1+r)^-n), r = annual rate / 12. Zero rate => P/n.
export function monthly(principal, annualPct, years) {
  const n = Math.round(years * 12)
  if (!(principal > 0) || !(n > 0)) return 0
  const r = (Number(annualPct) || 0) / 100 / 12
  if (r === 0) return principal / n
  return principal * r / (1 - Math.pow(1 + r, -n))
}
export const egp = n => Math.round(n).toLocaleString('en-US')
