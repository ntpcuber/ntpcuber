import type { AlgSet } from '@/lib/algTypes'

const cllData: AlgSet[] = [
  {
    id: 'sune',
    title: 'CLL Sune',
    sectionClass: '',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-sune-01.png', alg: "R U R' U R U2' R'",                                          alt: "alt: [U'] R' U2' R U R' U R" },
      { img: '/image/cll-sune-02.png', alg: "[U'] R' F R2 F' U' R' U' R2 U R'",                           alt: "alt: [U2] R U R' U R' F R F' R U2' R'" },
      { img: '/image/cll-sune-03.png', alg: "F R' F' R U2 R U2' R'" },
      { img: '/image/cll-sune-04.png', alg: "R U' R' F R' F' R" },
      { img: '/image/cll-sune-05.png', alg: "R' F2 R U2' R U' R' F" },
      { img: '/image/cll-sune-06.png', alg: "R U R' U' R' F R F' R U R' U R U2' R'",                     alt: "alt: [U2] R U' R U' R' U R' U' F R' F'" },
    ],
  },
  {
    id: 'antisune',
    title: 'CLL Antisune',
    sectionClass: 'bg-neutral-900',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-asune-01.png', alg: "L' U' L U' L' U2 L",                                        alt: "alt: [U'] R U2 R' U' R U' R'" },
      { img: '/image/cll-asune-02.png', alg: "R' U R U' R2' F R F' R U R' U' R",                          alt: "alt: [U2] R U2 R' F R' F' R U' R U' R'" },
      { img: '/image/cll-asune-03.png', alg: "F' R U R' U2' R' F2 R" },
      { img: '/image/cll-asune-04.png', alg: "R' F R F' R U R'" },
      { img: '/image/cll-asune-05.png', alg: "R U2' R' U2' R' F R F'" },
      { img: '/image/cll-asune-06.png', alg: "[U'] F R' F' R U R U' R2' U' R U' R' U2 R",                alt: "alt: [U2] F R F' U R U' R U R' U R'" },
    ],
  },
  {
    id: 't',
    title: 'CLL T',
    sectionClass: '',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-t-01.png', alg: "R U R' U' R' F R F'",                                          alt: "alt: F' U' F U R U R'" },
      { img: '/image/cll-t-02.png', alg: "[U2] L' U' L U L F' L' F",                                     alt: "alt: F R F' R U R' U' R'" },
      { img: '/image/cll-t-03.png', alg: "[U] R' U R U2' R2' F' R U' R' F2 R2",                          alt: "alt: R U R' U R U2 R2' F' R U' R' F2 R" },
      { img: '/image/cll-t-04.png', alg: "[U] F U' R U2 R' U' F2 R U R'",                                alt: "alt: [U'] R U F R' F' R U2 R U2' R2'" },
      { img: '/image/cll-t-05.png', alg: "[U] R' U R U2' R2' F R F' R",                                  alt: "alt: [U'] R' F R' F' R2 U2' R' U' R" },
      { img: '/image/cll-t-06.png', alg: "[U2] R U R' U2 R U R' U R' F R F'",                            alt: "alt: [U2] R U' x' z' R' U R' U' R U' R" },
    ],
  },
  {
    id: 'u',
    title: 'CLL U',
    sectionClass: 'bg-neutral-900',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-u-01.png', alg: "[U'] R2' F2 R U R' F R2 U2' R' U' R",                         alt: "alt: [U] R U2' R' U' R U' R2' F2 R U R' F R" },
      { img: '/image/cll-u-02.png', alg: "[U'] F R U R' U' F'",                                          alt: "alt: [U'] R' U' F R' F' R U R" },
      { img: '/image/cll-u-03.png', alg: "R U' R2' F R F' R U R' U' R U R'" },
      { img: '/image/cll-u-04.png', alg: "R' U R' F R F' R U2' R' U R",                                  alt: "alt: [U2] F' R' F R2 U R' U' R' F R2 U' R'" },
      { img: '/image/cll-u-05.png', alg: "[U2] F R U R' U2 F' R U' R' F" },
      { img: '/image/cll-u-06.png', alg: "[U'] F R' F' R U' R U' R' U2 R U' R'",                        alt: "alt: x R U' R U' R' U R' F' R" },
    ],
  },
  {
    id: 'l',
    title: 'CLL L',
    sectionClass: '',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-l-01.png', alg: "[U] R' U R' U2 R U' R' U R U' R2'",                           alt: "alt: [U'] R U' R2' F2 R U R' F R2 U2' R'" },
      { img: '/image/cll-l-02.png', alg: "R U2' R2 F R F' R U2' R'" },
      { img: '/image/cll-l-03.png', alg: "F R' F' R U R U' R'" },
      { img: '/image/cll-l-04.png', alg: "[U] F' R U R' U' R' F R",                                     alt: "alt: [U'] R U R U' R' F R' F'" },
      { img: '/image/cll-l-05.png', alg: "R U R' U' R' F R2 F' U' R' U' R" },
      { img: '/image/cll-l-06.png', alg: "R' U' R U2' R' F R' F' R U' R" },
    ],
  },
  {
    id: 'pi',
    title: 'CLL Pi',
    sectionClass: 'bg-neutral-900',
    gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cases: [
      { img: '/image/cll-pi-01.png', alg: "F R U R' U' R U R' U' F'",                                   alt: "alt: R' U R2 U' R2' U' R2 U R'" },
      { img: '/image/cll-pi-02.png', alg: "[U'] R' U' R' F R F' R U' R' U2 R" },
      { img: '/image/cll-pi-03.png', alg: "[U] F R2 U' R2' U R2 U R2' F'",                              alt: "alt: [U'] R U' R U' R' U R F R2 F'" },
      { img: '/image/cll-pi-04.png', alg: "[U2] R' F R F' R U' R' U' R U' R'",                          alt: "alt: R U' R' F R' F R U R' F R" },
      { img: '/image/cll-pi-05.png', alg: "R U2' R' U' R U R' U2' R' F R F'" },
      { img: '/image/cll-pi-06.png', alg: "[U] F R' F' R U2 R U' R' U R U2' R'" },
    ],
  },
  {
    id: 'h',
    title: 'CLL H',
    sectionClass: '',
    gridClass: 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-4',
    cases: [
      { img: '/image/cll-h-01.png', alg: "R2 U2' R' U2' R2",                                            alt: "alt: R2 U2' R U2' R2'" },
      { img: '/image/cll-h-02.png', alg: "[U] R' F R F' R U R2' F R F' R U R'" },
      { img: '/image/cll-h-03.png', alg: "[U] R U R' U R U R' F R' F' R" },
      { img: '/image/cll-h-04.png', alg: "[U] F R2 U' R2' U' R2 U R2' F'" },
    ],
  },
]

export default cllData
