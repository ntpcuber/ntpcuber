// The soft indigo / purple / cyan glow behind the top of a page.
// Defined once here so every page that uses it looks identical.
export default function PageGlow() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[-12rem] h-[32rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10"
    />
  )
}
