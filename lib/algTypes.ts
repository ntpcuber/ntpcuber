// Shared algorithm data types — mirrors the JSON structure in cll-data.json / eg1-data.json / eg2-data.json

export interface AlgCase {
  img: string      // path relative to /public, e.g. "/image/cll-sune-01.png"
  alg: string      // primary algorithm string
  alt?: string     // optional alternate algorithm string
}

export interface AlgSet {
  id: string         // used as anchor href, e.g. "sune"
  title: string      // section heading, e.g. "CLL Sune"
  sectionClass: string  // extra class on <section>, e.g. "bg-neutral-900"
  gridClass: string     // grid columns class, e.g. "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  cases: AlgCase[]
}
