// ─── Types ────────────────────────────────────────────────────────────────────

export interface MegaCase {
  img: string
  alg: string
  alt?: string
  /** EP 4-edges card uses aspect-video instead of aspect-square */
  wide?: boolean
}

export interface MegaGroup {
  /** Sub-heading, e.g. "2 Corners" */
  label: string
  labelTh: string
  /** Tailwind grid class */
  gridClass: string
  /** Bottom margin class — mb-12 for all groups except the last in a section */
  mb?: string
  cases: MegaCase[]
}

export interface MegaSection {
  id: 'eo' | 'co' | 'ep' | 'cp'
  titleEn: string
  titleTh: string
  /** Extra class on <section>, e.g. "bg-neutral-900" */
  sectionClass: string
  groups: MegaGroup[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const fourLLLData: MegaSection[] = [
  // ── EO ──────────────────────────────────────────────────────────────────────
  {
    id: 'eo',
    titleEn: 'EO (Edge Orientation)',
    titleTh: 'EO (การพลิกชิ้นขอบ)',
    sectionClass: '',
    groups: [
      {
        label: '', labelTh: '',
        gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        cases: [
          { img: '/image/mega-eo-1.png', alg: "F R U2 R2' F R F' U2' F'" },
          { img: '/image/mega-eo-2.png', alg: "F U R U' R' F'" },
          { img: '/image/mega-eo-3.png', alg: "F R U R' U' F'" },
        ],
      },
    ],
  },

  // ── CO ──────────────────────────────────────────────────────────────────────
  {
    id: 'co',
    titleEn: 'CO (Corner Orientation)',
    titleTh: 'CO (การพลิกชิ้นมุม)',
    sectionClass: 'bg-neutral-900',
    groups: [
      {
        label: '2 Corners', labelTh: 'พลิก 2 มุม',
        gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        mb: 'mb-12',
        cases: [
          { img: '/image/mega-co-01.png', alg: "R U R' U R U R' U2' R U' R'" },
          { img: '/image/mega-co-02.png', alg: "[U2] F R U2 R' U' R U' R' F'" },
          { img: '/image/mega-co-03.png', alg: "F R U2 R' U' R U' R' F'",         alt: "alt: [U2'] R U R' U2 R U' R' U' R U' R'" },
          { img: '/image/mega-co-04.png', alg: "[U'] R U2' R' U' R U2' R'",         alt: "alt: R U2 R' U R U2 R'" },
        ],
      },
      {
        label: '3 Corners', labelTh: 'พลิก 3 มุม',
        gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        mb: 'mb-12',
        cases: [
          { img: '/image/mega-co-05.png', alg: "R U R' U R U2' R'",               alt: "alt: [U'] R' U2 R U2 R' U R" },
          { img: '/image/mega-co-06.png', alg: "[U] R' U' R U' R' U2 R",           alt: "alt: [U2] R U2' R' U2' R U' R'" },
          { img: '/image/mega-co-07.png', alg: "R U R' U2 R U2 R'",               alt: "alt: [U'] R' U2' R U R' U R" },
          { img: '/image/mega-co-08.png', alg: "R U2 R' U' R U' R'",              alt: "alt: [U'] R' U' R U2' R' U2' R" },
        ],
      },
      {
        label: '4 Corners', labelTh: 'พลิก 4 มุม',
        gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        mb: 'mb-12',
        cases: [
          { img: '/image/mega-co-09.png', alg: "[U'] R U R' U R U' R' U R U2' R'",  alt: "alt: [U] R' U' R U' R' U R U' R' U2 R" },
          { img: '/image/mega-co-10.png', alg: "[U'] R U2 R' U' R U R' U' R U' R'",  alt: "alt: [U] R' U2' R U R' U' R U R' U R" },
          { img: '/image/mega-co-11.png', alg: "[U'] R U2 R2' U' R2 U' R2' U2 R" },
          { img: '/image/mega-co-12.png', alg: "[U] R' U2' R2 U R2' U R2 U2' R'" },
          { img: '/image/mega-co-13.png', alg: "R U R' U R U R' U' R U2' R'" },
          { img: '/image/mega-co-14.png', alg: "[U] R U2' R' U2' R U2 R' U2' R U' R'" },
        ],
      },
      {
        label: '5 Corners', labelTh: 'พลิก 5 มุม',
        gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
        cases: [
          { img: '/image/mega-co-15.png', alg: "[U] R U R' U2 R U2' R' U R U2' R'" },
          { img: '/image/mega-co-16.png', alg: "[U2] R U2 R' U' R U2 R' U2' R U' R'" },
        ],
      },
    ],
  },

  // ── EP ──────────────────────────────────────────────────────────────────────
  {
    id: 'ep',
    titleEn: 'EP (Edge Permutation)',
    titleTh: 'EP (การย้ายชิ้นขอบ)',
    sectionClass: '',
    groups: [
      {
        label: '3 Edges', labelTh: 'ย้ายขอบ 3 ชิ้น',
        gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        mb: 'mb-12',
        cases: [
          { img: '/image/mega-ep-01.png', alg: "R U R' F' R U R' U' R' F R2 U' R'" },
          { img: '/image/mega-ep-02.png', alg: "L U' R' U L' U2' R U' R' U2 R",    alt: "alt: [U2] R U R' F' R U R' U' R' F R2 U' R'" },
          { img: '/image/mega-ep-03.png', alg: "R2 U2' R2' U' R2 U2' R2'" },
          { img: '/image/mega-ep-04.png', alg: "R2' U2 R2 U R2' U2 R2" },
        ],
      },
      {
        label: '4 Edges', labelTh: 'ย้ายขอบ 4 ชิ้น',
        gridClass: 'grid-cols-1',
        cases: [
          {
            img: '/image/mega-ep-05.png',
            alg: "R U R' F' R U R' U' R' F R U' R' F R2 U' R' U' R U R' F'",
            alt: "alt: (R U R' U) R2 U2' R2' U' R2 U2' R2' (U2' R U' R')",
            wide: true,
          },
        ],
      },
    ],
  },

  // ── CP ──────────────────────────────────────────────────────────────────────
  {
    id: 'cp',
    titleEn: 'CP (Corner Permutation)',
    titleTh: 'CP (การย้ายชิ้นมุม)',
    sectionClass: 'bg-neutral-900',
    groups: [
      {
        label: '3 Corners', labelTh: 'ย้ายมุม 3 ชิ้น',
        gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        mb: 'mb-12',
        cases: [
          { img: '/image/mega-cp-01.png', alg: "BR R BR' R' U R BR R2' U' R U R BR' R'" },
          { img: '/image/mega-cp-02.png', alg: "[U] F' R' F R U' R' F' R2 U R' U' R' F R" },
          { img: '/image/mega-cp-03.png', alg: "BR' R' U L U' R' U L' U' R2 BR" },
          { img: '/image/mega-cp-04.png', alg: "BR' R2' U L U' R U L' U' R BR" },
        ],
      },
      {
        label: '4 Corners', labelTh: 'ย้ายมุม 4 ชิ้น',
        gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        mb: 'mb-12',
        cases: [
          { img: '/image/mega-cp-05.png', alg: "[U] L' R U2 R' U' R U R' U' R U R' U' R U' R' L" },
          { img: '/image/mega-cp-06.png', alg: "R U R' U R' U' R F' R U R' U' R' F R2 U' R2' U R" },
          { img: '/image/mega-cp-07.png', alg: "[U2] F U' R U' R U R' U R U2' R' U R' U' R U2 R' F'" },
        ],
      },
      {
        label: '5 Corners', labelTh: 'ย้ายมุม 5 ชิ้น',
        gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        cases: [
          { img: '/image/mega-cp-08.png',  alg: "(U' R' U' R U' R U R2' U R U' R U' R')*2" },
          { img: '/image/mega-cp-09.png',  alg: "(U R U R' U R' U' R2 U' R' U R' U R)*2" },
          { img: '/image/mega-cp-10.png',  alg: "R2 U2 R2' U' R2 U' R2' y' R2' U' R2 U' R2' U2 R2" },
          { img: '/image/mega-cp-11.png',  alg: "R2' U2' R2 U R2' U R2 y R2 U R2' U R2 U2' R2'" },
          { img: '/image/mega-cp-12.png',  alg: "R2 U2' R2' U' R2 U2' R' U R' U' R' F R2 U' R' U' R U R' F'" },
          { img: '/image/mega-cp-13.png',  alg: "[U] R' U2 R U' R' U2 R U2' R' U' R U2' R' U R U2' R' U R" },
          { img: '/image/mega-cp-14.png',  alg: "R2 U2' R2' U' R2 U R2' U' R2 U R2' U' R2 U2' R2'" },
          { img: '/image/mega-cp-15.png',  alg: "R2' U2 R2 U R2' U' R2 U R2' U' R2 U R2' U2 R2" },
        ],
      },
    ],
  },
]

export default fourLLLData