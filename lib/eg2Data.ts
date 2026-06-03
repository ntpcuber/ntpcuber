import type { AlgSet } from '@/lib/algTypes'

const eg2Data: AlgSet[] = [
  {
    id: 'sune',
    title: 'EG-2 Sune',
    sectionClass: '',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-sune-01.png', alg: "[U'] R' F R2 F' R U2 R' U' F2 R2" },
      { img: '/image/cll-sune-02.png', alg: "R U R' U R U2' R B2 R2'",                                   alt: "alt: [U'] R' U2' R U R' U R' F2 R2" },
      { img: '/image/cll-sune-03.png', alg: "R U' R' F R' F' R' F2 R2" },
      { img: '/image/cll-sune-04.png', alg: "F R' F' R U2 R U2' R B2 R2'" },
      { img: '/image/cll-sune-05.png', alg: "R2 B2 R' U' R' F R' F' R" },
      { img: '/image/cll-sune-06.png', alg: "R' F2 R U2 R U' R' F' R2 B2" },
    ],
  },
  {
    id: 'antisune',
    title: 'EG-2 Antisune',
    sectionClass: 'bg-neutral-900',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-asune-01.png', alg: "R' U R U' R2' F R F' R U R' U' R' F2 R2" },
      { img: '/image/cll-asune-02.png', alg: "R' F' R U' R' F2 R' F2 R2",                                alt: "alt: [U'] R U2 R' U' R U' R B2 R2'" },
      { img: '/image/cll-asune-03.png', alg: "R' F R F' R U R B2 R2'" },
      { img: '/image/cll-asune-04.png', alg: "F' R U R' U2' R' F2 R' F2 R2" },
      { img: '/image/cll-asune-05.png', alg: "R2' F2 R F R F' R U R'" },
      { img: '/image/cll-asune-06.png', alg: "R U2' R' U2' R' F R F R2 B2" },
    ],
  },
  {
    id: 't',
    title: 'EG-2 T',
    sectionClass: '',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-t-01.png', alg: "F R F' R U R' U' R B2 R2'",                                   alt: "alt: F R F' U' R' U' R' F2 R2" },
      { img: '/image/cll-t-02.png', alg: "R U R' U' R' F R F R2 B2" },
      { img: '/image/cll-t-03.png', alg: "[U'] R2' F2 R U' R' F R F' U R",                               alt: "alt: [U] R2 F2 R U' F R' F' R U R" },
      { img: '/image/cll-t-04.png', alg: "[U] R' U R U2' R2' F' R U' R" },
      { img: '/image/cll-t-05.png', alg: "[U2] R' U2' R' F2 R F2 R",                                    alt: "alt: [U2] R U R' U2' R U R' U R' F R F R2 B2" },
      { img: '/image/cll-t-06.png', alg: "[U] R' U R U2' R2' F R F' R' F2 R2" },
    ],
  },
  {
    id: 'u',
    title: 'EG-2 U',
    sectionClass: 'bg-neutral-900',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-u-01.png', alg: "[U'] R' U' F R' F' R U R' F2 R2",                             alt: "alt: [U] F R U R' U' F R2 B2" },
      { img: '/image/cll-u-02.png', alg: "[U'] F U' R U2 R U' R' U2 R' U' F'" },
      { img: '/image/cll-u-03.png', alg: "[U2] R2 B2 R' U R' U' R' F R F'" },
      { img: '/image/cll-u-04.png', alg: "[U2] R2 F2 R F' R U R U' R' F",                               alt: "alt: [U2] R2 B2 R2' F R F' R U R' U' R'" },
      { img: '/image/cll-u-05.png', alg: "R U R' U' R B2 R' U R U' R'" },
      { img: '/image/cll-u-06.png', alg: "[U'] R2' F2 R U R U2' R2' F R F' R" },
    ],
  },
  {
    id: 'l',
    title: 'EG-2 L',
    sectionClass: '',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-l-01.png', alg: "R U2' R2 F R F' R U2' R B2 R2'",                              alt: "alt: [U2] R' U' R U R' F' R U R' U' R' F' R2" },
      { img: '/image/cll-l-02.png', alg: "R' U R' U2 R U' R' U R U' B2 R2'" },
      { img: '/image/cll-l-03.png', alg: "[U] R2 B2 R' U R U' R' F R' F'",                              alt: "alt: [U] R2' F2 R2 F' R U R' F' U' R' F R" },
      { img: '/image/cll-l-04.png', alg: "[U2] R2' F2 R2 F R' F' R U R U' R'" },
      { img: '/image/cll-l-05.png', alg: "F R' F' R U R U' R B2 R2'" },
      { img: '/image/cll-l-06.png', alg: "[U] F' R U R' U' R' F R' F2 R2",                              alt: "alt: [U'] R U R U' R' F R' F' R2 B2 R2" },
    ],
  },
  {
    id: 'pi',
    title: 'EG-2 Pi',
    sectionClass: 'bg-neutral-900',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-pi-01.png', alg: "[U'] R' U' R' F R F' R U' R' U2 R' F2 R2" },
      { img: '/image/cll-pi-02.png', alg: "R U' R2' U R2 U R2' U' R' F2 R2" },
      { img: '/image/cll-pi-03.png', alg: "[U2] R' F R F' R U' R' U' R U' R B2 R2'" },
      { img: '/image/cll-pi-04.png', alg: "[U] F R2 U' R2' U R2 U R2' F' R2 B2 R2" },
      { img: '/image/cll-pi-05.png', alg: "[U] F R' F' R U2 R U' R' U R U2' R B2 R2'" },
      { img: '/image/cll-pi-06.png', alg: "R U2' R' U' R U R' U2' R' F R F R2 B2" },
    ],
  },
  {
    id: 'h',
    title: 'EG-2 H',
    sectionClass: '',
    gridClass: 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-4',
    cases: [
      { img: '/image/cll-h-01.png', alg: "[U] R' F R F' R U R2' F R F' R U R B2 R2'" },
      { img: '/image/cll-h-02.png', alg: "R2 U2' R' U2' F2 R2" },
      { img: '/image/cll-h-03.png', alg: "[U'] R U R' U R U R' F R' F' R' F2 R2" },
      { img: '/image/cll-h-04.png', alg: "[U'] F R2 U' R2' U' R2 U R2' F R2 B2" },
    ],
  },
]

export default eg2Data
