export interface ZBLLCase {
  alg: string;
  alt?: string;
}

export interface ZBLLSubset {
  name: string;
  image: string;
  cases: ZBLLCase[];
}

export interface ZBLLSet {
  name: string;
  subsets: ZBLLSubset[];
}

const zbllData: ZBLLSet[] = [
  {
    "name": "T set",
    "subsets": [
      {
        "name": "T 1",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U']RUR'URU2R'U2R'U'RU'R'U2R"),
        "cases": [
          {
            "alg": "[U'] R U R' U R U2 R' U2 R' U' R U' R' U2 R", "alt": "[U'] R U R' U R U2 R' L' U' L U' L' U2 L"
          },
          {
            "alg": "R U R' U R U' R2 U' R' U' R U R' U' R2 U2 R"
          },
          {
            "alg": "R U2 R' U' R U' R2 U2 R U R' U R"
          },
          {
            "alg": "[U2] R' U2 R U R' U R2 U2 R' U' R U' R'"
          },
          {
            "alg": "R' U R U2 R' U' R U2 R' U' R U' R' U R"
          },
          {
            "alg": "[U2] R U' R' U2 R U R' U2 R U R' U R U' R'"
          },
          {
            "alg": "R U2 R' U' R U' R' U R U R' U R U2 R'"
          },
          {
            "alg": "[U2] R' U2 R U R' U R U' R' U' R U' R' U2 R"
          },
          {
            "alg": "[U'] R U R' U R U' R' U R' U' R2 U' R2 U2 R"
          },
          {
            "alg": "[U'] R' U' R U' R' U R U' R U R2 U R2 U2 R'"
          },
          {
            "alg": "[U'] R U R2 U' R2 U' R2 U2 R U' R U' R'"
          },
          {
            "alg": "[U'] R' U' R2 U R2 U R2 U2 R' U R' U R"
          }
        ]
      },
      {
        "name": "T 2",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U2]RU'R'U2LRU'R'UL'"),
        "cases": [
          {
            "alg": "[U2] R U' R' U2 L R U' R' U L'"
          },
          {
            "alg": "R' U R U2 L' R' U R U' L"
          },
          {
            "alg": "R U2 R' U' R' F R2 U' R' U' R U R' F' R U' R'"
          },
          {
            "alg": "[U'] R U R D R' U' R D' R' U2 R' U' R U' R'\r\n[U] F' U' F R U R' F R' F' R2 U' R'"
          },
          {
            "alg": "[U2] r U' r U2 R' F R U2 r2 F"
          },
          {
            "alg": "[U2] R' U' R2 U R' F' R U R' U' R' F R2 U' R' U' R' U R"
          },
          {
            "alg": "F U' R' U2 R U F' R' U' R U R' U R"
          },
          {
            "alg": "R D R' U' R D' R' U' R' U R U' R' U R U R' U' R"
          },
          {
            "alg": "R U' R' U R U R' U' R U R' U' R' D' R U' R' D R"
          },
          {
            "alg": "R U R' U R U' R' U' R' F2 R F2 L' U2 L"
          },
          {
            "alg": "F R U' R' U' R U2 R' U' F' R' U' R U' R' U2 R"
          },
          {
            "alg": "R' U2 R U R' U R F U R U2 R' U R U R' F'"
          }
        ]
      },
      {
        "name": "T 3",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("R'D'RUR'DR2UR'U2RU'R'U'RU'R'"),
        "cases": [
          {
            "alg": "R' D' R U R' D R2 U R' U2 R U' R' U' R U' R'"
          },
          {
            "alg": "[U] R' U' R U' F U' R' U R U F' R' U R"
          },
          {
            "alg": "[U2] F R U R' U' R U' R' U' R U R' F'"
          },
          {
            "alg": "[U'] R U R' U2 R U' R' U2 R U' R2 F' R U R U' R' F"
          },
          {
            "alg": "R' U R2 D R' U R D' R' U R' U' R U' R' U' R"
          },
          {
            "alg": "[U2] R U' R2 D' R U' R' D R U' R U R' U R U R'\r\n[U2] R U2 R' U' R U' R2 F' r U R U' r' F"
          },
          {
            "alg": "R' U2 R' D' R U2 R' D R' U R' U R U2 R'"
          },
          {
            "alg": "[U2] R U2 R D R' U2 R D' R U' R U' R' U2 R"
          },
          {
            "alg": "R' D' R U R' D R U2 R U2 R' U R U R'"
          },
          {
            "alg": "[U] R' U' R' D' R U R' D R U' R U' R' U2 R"
          },
          {
            "alg": "[U2] R U2 R' U2 R' F' R U2 R U2 R' F \r\n[U'] l' U2 R' D2 R U2 R' D2 (R l)"
          },
          {
            "alg": "R' U2 R U' R' F R U R' U' R' F' R U' R \r\n[U'] l U2 R D2 R' U2 R D2 (R' l')"
          }
        ]
      },
      {
        "name": "T 4",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U2]RU'R2D'rU2r'DR2UR'"),
        "cases": [
          {
            "alg": "[U2] R U' R2 D' r U2 r' D R2 U R'"
          },
          {
            "alg": "R' U R2 D r' U2 r D' R2 U' R"
          },
          {
            "alg": "[U] R U R' U' R U R2 D' R U' R' D R U2 R U' R'"
          },
          {
            "alg": "R' U' R U R2 D' R U2 R' D R2 U2 R' U2 R\r\nR' U' R2 U2 L' U R2 U' L U' R2 U' R'"
          },
          {
            "alg": "[U2] R U R' U2 R' D' R U R' D R2 U' R' U R U' R'"
          },
          {
            "alg": "R' U' R U2 R D R' U' R D' R2 U R U' R' U R"
          },
          {
            "alg": "[U2] R U R' F' R U R' U' R' F R U' R' F R U R U' R' F'\r\n[U] R U R' U R U R2' D' r U2 r' D R2 U R'"
          },
          {
            "alg": "[U] R U' R2 D' r U2 r' D R2 U' R' U' R U' R'"
          },
          {
            "alg": "[U'] F R' D' R U R' D R U R' D' R U' R' D R U' F'\r\nR U2 R' U L U' R U L2 U R' U' L"
          },
          {
            "alg": "[U2] R2 F R U R' U' R' F' R' U' R2 U2 R U2 R"
          },
          {
            "alg": "[U'] R (U' D) R' U2 R D' R U R' U2 R U R2'\r\n[U] R2' F R U R U' R' F R U2 R' U2 R' F2 R2"
          },
          {
            "alg": "R U' R' U R U R' U' R U R' U R' D' R U R' D R\r\nF U' R2 U R' U R U2 R2' U' R U2 R' F'"
          }
        ]
      },
      {
        "name": "T 5",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U']rUR'U'r'FRF'"),
        "cases": [
          {
            "alg": "[U'] r U R' U' r' F R F'"
          },
          {
            "alg": "[U'] R U2 R' U2 R' F R U R U' R' F'"
          },
          {
            "alg": "[U2] R' U' R (U D') R U' R U R U' R2' D"
          },
          {
            "alg": "[U2] R' U' R U' R' U R' F' R U R U' R' F R"
          },
          {
            "alg": "[U'] R' D' R U R' D R2 U' R' U R U R' U' R U R'"
          },
          {
            "alg": "[U'] R U R' U' R U' R' L U' R U R' L'"
          },
          {
            "alg": "[U] R U R' U R U R' U2 L R U' R' U L'"
          },
          {
            "alg": "[U2] R2 U R' U' R' U R' (U' D) U' R' U2 R D'\r\n[U'] R U R D R' U2 R D' R' U' R' U R U' R' U' R U' R'"
          },
          {
            "alg": "R' U' R U' R2' F' R U R U' R' F U R U' R' U2 R\r\n[U'] R' U2 R U2 R' U R U' L U' R' U L' U R"
          },
          {
            "alg": "[U2] r' F R F' r U' R' U' R U R' U' R U' R'\r\n[U2] L' R U R' U' L U R U R' U' R U' R'"
          },
          {
            "alg": "[U'] R U' R' U' R U R D R' U2 R D' R' U' R'"
          },
          {
            "alg": "[U] M U' r U R' U' R' F R F' (R r') U M'\r\n[U2] F R U R' U' R' F' U2 R U R U' R2' U2 R"
          }
        ]
      },
      {
        "name": "T 6",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U]R'F'rURU'r'F"),
        "cases": [
          {
            "alg": "[U] R' F' r U R U' r' F", alt:"[U'] F R F' r U R' U' r'"
          },
          {
            "alg": "[U] R U R' U' R' F' R U2 R U2 R' F"
          },
          {
            "alg": "R2 F2 R U2 R U2 R' F2 R U' R' U R"
          },
          {
            "alg": "[U] F U R U2 R' U R U R' F'"
          },
          {
            "alg": "[U'] R D R' U' R D' R2 U R U' R' U' R U R' U' R\r\n[U2] F R2 D R' U' R D' R2 U' R U2 R' U' F'"
          },
          {
            "alg": "R U R' U' R U' R' U' F R U R' U' R' F' R"
          },
          {
            "alg": "[U] R' U' R U' R' U' R U2 r' R' F R F' r\r\n[U] R' U' R U' R' U' R U2 L' R' U R U' L"
          },
          {
            "alg": "R' U2 R F U' R' U R U F' R' U R\r\nR' U2 R U' R2 F' R U R U' R' F R U2 R' U R"
          },
          {
            "alg": "[U] F R U R' U' R U R' U' F' R U R' U' R' F R F'"
          },
          {
            "alg": "[U] R U R' U' R U R2 D' R U2 R' D R U' R U' R'"
          },
          {
            "alg": "[U'] R' U R U R' U' R' D' R U2 R' D R U R"
          },
          {
            "alg": "[U] R' U2 R2 U R' U' R' U2 F' R U2 R U2 R' F"
          }
        ]
      }
    ]
  },
  {
    "name": "U set",
    "subsets": [
      {
        "name": "U 1",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U]R'F'RUR'U'R'FD'RUR'DR2[U]RU2R'U'RU'R'U2R'U2RUR'UR[U]RU2R'U'RU'R'L'U2LUL'UL"),
        "cases": [
          {
            "alg": "[U] R' F' R U R' U' R' F D' R U R' D R2\r\n[U] R U2 R' U' R U' R' U2 R' U2 R U R' U R\r\n[U] R U2 R' U' R U' R' L' U2 L U L' U L"
          },
          {
            "alg": "R U R' U' R' U R U R U' R' U R' U R U2  R' U' R\r\nx' R2 D2 R' U' R D2 R2' D R U R' D'"
          },
          {
            "alg": "R' U' R U' R' U2 R2 U R' U R U2 R'"
          },
          {
            "alg": "[U2] R U R' U R U2 R2 U' R U' R' U2 R"
          },
          {
            "alg": "[U'] R U R' U' R U' R' U2 R U' R' U2 R U R'"
          },
          {
            "alg": "[U'] R' U' R U R' U R U2 R' U R U2 R' U' R"
          },
          {
            "alg": "[U] R' U2 R2 U R2 U R U' R U R' U' R U' R'"
          },
          {
            "alg": "[U] R U2 R2 U' R2 U' R' U R' U' R U R' U R"
          },
          {
            "alg": "[U] R U2 R' U' R U' R' U' R U R' U R U2 R'"
          },
          {
            "alg": "[U] R' U2 R U R' U R U R' U' R U' R' U2 R"
          },
          {
            "alg": "R' U' R U' R U R' U R U2 R' U2 R' U2 R\r\nR' U' R U' R U2 R2 U' R2 U' R2 U R\r\nR' U' R U' R U R2 U' R2 U R2 U R2 U' R'"
          },
          {
            "alg": "[U2] R U R' U R' U2 R2 U R2 U R2 U' R'\r\n[U2] R U R' U R' U' R U R U2 R' U2 R' U2 R \r\n[U2] R U R' U R' U' R2 U R2 U' R2 U' R2 U R"
          }
        ]
      },
      {
        "name": "U 2",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U']F2RU'R'U'RUR'F'RUR'U'R'FRF2'"),
        "cases": [
          {
            "alg": "[U'] F2 R U' R' U' R U R' F' R U R' U' R' F R F2'"
          },
          {
            "alg": "R' F R U' R' U' R U R' F' R U R' U' R' F R F' R"
          },
          {
            "alg": "(l R) U2 R' U2 R' F R F' r U' L' U R'\r\nR U R' U R U2 R' U R2 D' r U2 r' D R U2 R"
          },
          {
            "alg": "(r' L') U2 L U2 r U' r' F R' F R F' r\r\nR U2 R D r' U2 r D' R2 U R' U2 R U R' U R"
          },
          {
            "alg": "[U] R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R' U2 R"
          },
          {
            "alg": "[U'] R2' F' R U R' U' R' F R2 U' R' U2 R2 U R' U R\r\n[U'] S R U R' U' R' F R f' R' F R U R' U' F' U R\r\n[U2] R2 D R' U2 R D' R' U' R' U' R' F R2 U' R' U' R U R' F'"
          },
          {
            "alg": "[U'] r U R' U' r' F R2 U' R' U' R U2 R' U' F'"
          },
          {
            "alg": "R2' F R U R U' R' F' R U' R2' D' R U R' D R2 \r\n[U'] R2 D R' U2 R D' R' U2 R' U' R U2 R' U' R U' R'"
          },
          {
            "alg": "[U] F U R U2 R' U R U R2 F' r U R U' r'"
          },
          {
            "alg": "[U'] F' U' r' F2 r U' r' F' r2 U R' U' r' F R\r\n[U] R U R' U R U2 R' U R U2 R D R' U2 R D' R2"
          },
          {
            "alg": "[U'] F U R2 D' R U' R' D R2 F' R' U R"
          },
          {
            "alg": "[U'] R' U' R F R2 D' R U R' D R2 U' F'"
          }
        ]
      },
      {
        "name": "U 3",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U2]RUR'URUR'U2RU'R2D'RU'R'DR[U2]RUR'U'L'U2RU'R'U2LRU'R'"),
        "cases": [
          {
            "alg": "[U2] R U R' U R U R' U2 R U' R2 D' R U' R' D R\r\n[U2] R U R' U' L' U2 R U' R' U2 L R U' R'"
          },
          {
            "alg": "R' U' R U2 R' F' R U R' U' R' F R2 U2 R' U R\r\nR' U' R F U' R' U' R U F' U R' U R"
          },
          {
            "alg": "F R U' R' U R U R' U R U' R' F'"
          },
          {
            "alg": "[U] F' R U R' U' R' F R2 U R' U2 R U R' U2 R U' R'"
          },
          {
            "alg": "[U'] R' U R U R' U R U' R D R' U' R D' R2 U' R"
          },
          {
            "alg": "[U'] R U' R' U' R U' R' U R' D' R U R' D R2 U R'"
          },
          {
            "alg": "R U R' U R U' R' U2 R' D' R U2 R' D R2 U' R'"
          },
          {
            "alg": "[U'] R' U2 R U R' U R3 D R' U2 R D' R' U2 R'\r\n[U2] R' U' R U' R' U R U2 R D R' U2 R D' R2 U R"
          },
          {
            "alg": "R U' R' U' R U2 R' U2 R' D' R U' R' D R"
          },
          {
            "alg": "R' U2 R U R' U R' D' R U' R' D R U R"
          },
          {
            "alg": "(l R) D2 R' U2 R D2 R' U2 l'"
          },
          {
            "alg": "[U2] (l' R') D2 R U2 R' D2 R U2 l"
          }
        ]
      },
      {
        "name": "U 4",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U']rU2R2FRF'U2r'RURU'R'[U']RU2R2FRF'M'U'RU'R'UM"),
        "cases": [
          {
            "alg": "[U'] r U2 R2 F R F' U2 r' R U R U' R'\r\n[U'] R U2 R2 F R F' M' U' R U' R' U M"
          },
          {
            "alg": "F U R' U' R U' R' U' R U F' R' U2 R"
          },
          {
            "alg": "[U2] R' U R U R' U' R' D' R U' R' D R2"
          },
          {
            "alg": "R U' R' U' R U R D R' U R D' R2\r\nR U' R' U' R U2 R2 D' R U R' D R"
          },
          {
            "alg": "R2 D' R U R' D R U R U' R' U' R"
          },
          {
            "alg": "[U'] R' D' R U' R' D R2 U2 R' U R U R'"
          },
          {
            "alg": "[U2] L' R U R' U R U R' U2 L R U' R'"
          },
          {
            "alg": "R U R' L' U2 R U' R' U' R U' R' L"
          },
          {
            "alg": "[U] F U R U' R' F' R U R' U' M' U R U' r'"
          },
          {
            "alg": "F R U' R' U' R U2 R' U' R U' R' U' R U2 R' U' F'"
          },
          {
            "alg": "[U'] R' U' F R' F' R U2 R S' R' U' R S\r\n[U] F R U R' U' F' R' F R2 B' R2 F' R2 B R'"
          },
          {
            "alg": "[U] S' R' U R S R' U2' R' F R F' U R\r\n[U'] F R U R' U' R U R' U' F' U' R' F' U' F U R"
          }
        ]
      },
      {
        "name": "U 5",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("R2D'RU2R'DRU2R"),
        "cases": [
          {
            "alg": "R2 D' R U2 R' D R U2 R"
          },
          {
            "alg": "[U'] R2' F' R U2 R U2 R' F U' R U R' U' R"
          },
          {
            "alg": "R2 D' r U2 r' D R U2 R"
          },
          {
            "alg": "R2' D' R U2 R' (U' D) R' U' R2 U R U R2'"
          },
          {
            "alg": "[U] R2 D' R U' R' D R2 U' R' U2 R"
          },
          {
            "alg": "[U] R B R' U2 R B' R2 D2 r U' r' D2 R\r\nR U' R' D R' U' R D' R2 U R' U' R' U2 R'"
          },
          {
            "alg": "[U2] R' U R U R' U2 R U R D R' U2 R D' R'"
          },
          {
            "alg": "R D r' U2 r D' R' U2 R' U R U R' U R\r\n[U'] R' U R U R' U2 R (U' D') R U' R' U2 R U' R' D"
          },
          {
            "alg": "[U] F U R U2 R' U R U2 R2 F R F' R U' R' F'"
          },
          {
            "alg": "F U R U' R D R' U' R D' R2 U R U R' F'\r\nR2' D' R U2 R' D R U R U' R U R2' U R U' R U' R'"
          },
          {
            "alg": "[U'] R' U R U' R' U' R U2 R D R' U' R D' R2 U' R"
          },
          {
            "alg": "[U'] R' U2 R' D' R U2 R' D R U2 R U R' U R"
          }
        ]
      },
      {
        "name": "U 6",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U2]R2DR'U2RD'R'U2R'"),
        "cases": [
          {
            "alg": "[U2] R2 D R' U2 R D' R' U2 R'"
          },
          {
            "alg": "[U'] R U R' U R U' R' U F' R U2 R' U2 R' F R"
          },
          {
            "alg": "[U2] R2 D r' U2 r D' R' U2 R'"
          },
          {
            "alg": "[U] R' U R' (U' D') R U' R' U2 R U' R' D R U' R\r\n[U2] R2 D R' U2 R D' R U' R U R U2 R' U' R' U R"
          },
          {
            "alg": "[U] R U R2 D' R U R' D R2 U2 R'"
          },
          {
            "alg": "R' U' R U R U R' U' R' U F R U R U' R' F'"
          },
          {
            "alg": "R U' R' U' R U2 R' U' R' D' R U2 R' D R"
          },
          {
            "alg": "[U2] R' D' r U2 r' D R U2 R U' R' U' R U' R'\r\nR U R' F' U' F2 D R' U R' U' R D' F'"
          },
          {
            "alg": "[U'] R U2 R2 D' R U2 R' D R2 U' R' U2 R U2 R'"
          },
          {
            "alg": "[U] R U R' U R U' R' U R U' R' U' r' F R F' M'\r\n[U] R U R' U R U' R' U R U' R' U' L' U R U' R' L\r\n[U2] R2 D R' U2 R D' R' U' R' U R' U' R2 U' R' U R' U R"
          },
          {
            "alg": "[U'] R U' R' U R U R' U2 R' D' R U R' D R2 U R'"
          },
          {
            "alg": "[U'] R U2 R D R' U2 R D' R' U2 R' U' R U' R'"
          }
        ]
      }
    ]
  },
  {
    "name": "L set",
    "subsets": [
      {
        "name": "L 1",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U']R'U'R'FD'RUR'DR2U'R'F'R[U2]RU'R'UR'U'R2U'R2'URU'RUR2'UR[U']RU'R'L'U2LUL'ULRU2'R'"),
        "cases": [
          {
            "alg": "[U'] R' U' R' F D' R U R' D R2 U' R' F' R\r\n[U2] R U' R' U R' U' R2 U' R2' U R U' R U R2' U R\r\n[U'] R U' R' L' U2 L U L' U L R U2' R'"
          },
          {
            "alg": "[U2] R U R' U R U' R' U R U' R' U R U2 R' \r\n[U2] R U2 R' U' R U R' U' R U R' U' R U' R'"
          },
          {
            "alg": "R U2 R' U' R U' R' U2 R U R' U R U2 R'"
          },
          {
            "alg": "R U R' U R U2 R' U2 R U2 R' U' R U' R'"
          },
          {
            "alg": "[U'] R2 U R' U' R' U R U R' U R U' R U' R2\r\n[U2] R U2 R' U' R U' R2' U2 R' U R' U' R U R' U R"
          },
          {
            "alg": "[U'] R' U' R U' R' U2 R U' R U R' U R U2 R'"
          },
          {
            "alg": "[U'] R' U2 R U R' U R U' R U2 R' U' R U' R'"
          },
          {
            "alg": "[U] R2 U' R U' R U R' U R U R' U' R' U R2\r\nR' U' R U' R' U R U' R' U2 R U2 R U R' U R U2 R'"
          },
          {
            "alg": "R U R' U R U2 R' U R' U' R U' R' U2 R"
          },
          {
            "alg": "R2 U' R U R U' R' U' R U' R' U R' U R2\r\n[U] R' U' R U' R' U2 R2 U2 R' U' R U R' U' R U' R'"
          },
          {
            "alg": "[U2] R2 U R' U R' U' R U' R' U' R U R U' R2"
          },
          {
            "alg": "R U2 R' U' R U' R' U R' U2 R U R' U R"
          }
        ]
      },
      {
        "name": "L 2",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("RU2RDR'U2RD'R2'"),
        "cases": [
          {
            "alg": "R U2 R D R' U2 R D' R2'"
          },
          {
            "alg": "R U2 R D r' U2 r D' R2"
          },
          {
            "alg": "[U] R U2 R' U' R2 D R' U' R D' R2"
          },
          {
            "alg": "[U'] R' D' R U2 R' D R U R U2 R' U R U R'"
          },
          {
            "alg": "R D2 r' U' r D2 R2 F' R U2 R' F R\r\n[U] F R U R' U' R' F' U' R U R U' R' U' R' U R"
          },
          {
            "alg": "[U] R' F' R U2 R U2 R' F U' R U R' U' R U' R'"
          },
          {
            "alg": "[U] R U R' U R U R' U2 R' D' r U2 r' D R\r\nR' U' R U2 R' U' R (U' D') R U2 R' U R U R' D"
          },
          {
            "alg": "R' U R' D' R U R' U2 R U R' (U D) R U' R"
          },
          {
            "alg": "R U2 R' U2 R U R2 D' R U2 R' D R2 U2 R'"
          },
          {
            "alg": "[U2] R' F' R U R' U' R' F D' R U' R' D R2 U R' U R\r\nR U2 R D R' U2 R D' R U R' U' R' U' R' U R U R2"
          },
          {
            "alg": "[U] R U R' U R U2 R D R' U2 R D' R' U2 R'"
          },
          {
            "alg": "R U' R2 D' R U' R' D R U2 R U' R' U' R U R'"
          }
        ]
      },
      {
        "name": "L 3",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U']R'U2R'D'RU2R'DR2"),
        "cases": [
          {
            "alg": "[U'] R' U2 R' D' R U2 R' D R2"
          },
          {
            "alg": "[U'] R' U2 R' D' r U2 r' D R2"
          },
          {
            "alg": "[U2] R' U2 R U R2 D' R U R' D R2"
          },
          {
            "alg": "R D R' U2 R D' R' U' R' U2 R U' R' U' R"
          },
          {
            "alg": "[U'] R' D2 r U r' D2 R2 B R' U2 R B' R'\r\nR U2 R' F U2 F' U' R F U' F' U2 R'"
          },
          {
            "alg": "[U'] R' U R U' R' U F' R U2 R' U2 R' F R2"
          },
          {
            "alg": "‌[U2] R' U' R U' R' U' R U2 R D r' U2 r D' R'"
          },
          {
            "alg": "[U'] R' U2 R' D' R' F2 R2 U2 R2 F2 R D R2\r\n[U'] R' U2 R' D' R U2 R' D U' F B' R2 F' B U' R2"
          },
          {
            "alg": "[U'] R' U2 R U2 R' U' R2 D R' U2 R D' R2 U2 R"
          },
          {
            "alg": "[U2] F R U' R' U' R2 D R' U R D' R' U R' U' F'\r\n[U2] R U' R2 F2 R U2 R U2 R' F2 U2 R U' R'"
          },
          {
            "alg": "F' R U R' U' R' F R2 U' R' U' R U' R' U R U R'\r\n[U2] R' U' R U' R' U2 R' D' R U2 R' D R U2 R"
          },
          {
            "alg": "[U'] R' U R2 D R' U R D' R' U2 R' U R U R' U' R"
          }
        ]
      },
      {
        "name": "L 4",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("rU2R2FRF'RU2r'"),
        "cases": [
          {
            "alg": "r U2 R2 F R F' R U2 r'"
          },
          {
            "alg": "[U2] L' U2 R U' R' U2 L R U' R'\r\n[U'] L U L' U' L F L' U' L U L F' L2"
          },
          {
            "alg": "R' U R U' R' U' R U' R' U R2 D R' U' R D' R' \r\n[U2] F R U R' U' R' F R2 U' R' U' R U R' F2"
          },
          {
            "alg": "[U'] R U' R' U R U R' U R U' R2 D' R U R' D R\r\n[U2] R' U' R U R' U' R' F R2 U' R' U' R U R' F' U R\r\nR' D' R U' R' D R2 U R' U' R U' R' U' R U R'"
          },
          {
            "alg": "F R U R2 F R F' R U' R' F'"
          },
          {
            "alg": "R' (U' D) R' U' R D' R2 U R' U' R2' U2 R\r\n[U2] F R U' R' U' R U R D R' U' R D' R' U2 R' U' F'"
          },
          {
            "alg": "r U2 r2' F R F' R' r2 U2 r'"
          },
          {
            "alg": "[U'] r U2 r2' R F R' F' r2 U2 r'\r\n[U2] R' F2 R2 L' U' L U R2 F2 R"
          },
          {
            "alg": "R U' R' U R U' R' U' R U R' U2 R' D' R U R' D R\r\n[U'] R U2 R' U' L' U2 R U R' L U L' U L"
          },
          {
            "alg": "[U'] R' D' R U' R' D R U2 R U' R' U R U R' U' R U R'\r\n[U2] L' U2 L U R U2 L' U' L R' U' R U' R'"
          },
          {
            "alg": "[U'] r U r' R U R' U' r U' r' F U R U' R' F'"
          },
          {
            "alg": "[U'] r U R2' D' R U2 R' D R U r' F R F'\r\nF R U R' U' F' r U r' U R U' R' r U' r'"
          }
        ]
      },
      {
        "name": "L 5",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("FR'F'rURU'r'"),
        "cases": [
          {
            "alg": "F R' F' r U R U' r'"
          },
          {
            "alg": "F R U R' U' R' F' R U2 R U2 R'"
          },
          {
            "alg": "[U'] R2 U R' U' R' U R' D U' R' U R D'"
          },
          {
            "alg": "R U' R' U R U' R' U' R U R2 D' R U' R' D R"
          },
          {
            "alg": "[U2] R' F' R U R' U' R' F R U' R U R' U R"
          },
          {
            "alg": "[U'] L R U' R' U L' R U R' U R U' R'"
          },
          {
            "alg": "[U'] L U' R U R' L' U2 R U' R' U' R U' R'"
          },
          {
            "alg": "[U2] R' U2 R (U2 D') R U' R U R U' R2 D"
          },
          {
            "alg": "[U'] R' U2 R U R' U' F' R U R' U' R' F R2 U R' U R\r\n[U'] R' U' R U' R' U R U' R' U R U' R2 D' R U2 R' D R2"
          },
          {
            "alg": "[U'] R U R' U R U' R' U' r' F R F' M'"
          },
          {
            "alg": "R U R D R' U2 R D' R' U' R' U R U R'"
          },
          {
            "alg": "[U'] R' U2 R2 U R' U' R' U2 F R U R U' R' F'"
          }
        ]
      },
      {
        "name": "L 6",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U]F'rUR'U'r'FR"),
        "cases": [
          {
            "alg": "[U] F' r U R' U' r' F R"
          },
          {
            "alg": "[U] F' R U2 R' U2 R' F R U R U' R'"
          },
          {
            "alg": "[U2] R2' D' r U2 (r' R) U R' D R U R\r\n[U2] R' U' R U R' F2 R U2 R' U2 R' F2 R2"
          },
          {
            "alg": "[U] F U R U2 R' U R2 D R' U R D' R2 F'"
          },
          {
            "alg": "[U2] F R U' R' U' R U2 R' U' F'"
          },
          {
            "alg": "[U2] R' F R U R U' R' F' U R U R' U R U' R'\r\nL' R' U R U' L R' U' R U' R' U R"
          },
          {
            "alg": "r' F R' F' r R U2 R' U R U R' U R"
          },
          {
            "alg": "R' U' R F U' R' U' R U F' R' U2 R"
          },
          {
            "alg": "[U'] F R' F' R U R U' R' F U R U' R' U R U' R' F'\r\nR U R' U R U' R' U R U' R' U R2 D R' U2 R D' R2'"
          },
          {
            "alg": "R' U' R U' R' U R F R' U R U' F'\r\nR U R' U R' D' R U2 R' D R2 U' R' U R U' R'"
          },
          {
            "alg": "[U'] R' U' R' D' R U2 R' D R U R U' R' U' R"
          },
          {
            "alg": "[U] F' R U2 R' U2 R' F U2 R U R U' R2 U2 R"
          }
        ]
      }
    ]
  },
  {
    "name": "H set",
    "subsets": [
      {
        "name": "H 1",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("RUR'URU'R'URU'R'UR'U'R2U'R'UR'UR"),
        "cases": [
          {
            "alg": "R U R' U R U' R' U R U' R' U R' U' R2 U' R' U R' U R"
          },
          {
            "alg": "R U R' U R U2 R' U' R' U2 R U R' U R"
          },
          {
            "alg": "[U2] R U R' U R U' R' U R U2 R'"
          },
          {
            "alg": "R' U' R U' R' U R U' R' U2 R"
          },
          {
            "alg": "[U'] R U2 R' U' R U R' U' R U' R'"
          },
          {
            "alg": "[U'] R' U2 R U R' U' R U R' U R"
          },
          {
            "alg": "R U2 R' U' R U' R' U' R' U' R U' R' U2 R"
          },
          {
            "alg": "R' U2 R U R' U R U R U R' U R U2 R'"
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          }
        ]
      },
      {
        "name": "H 2",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U]FRUR'U'RUR'U'RUR'U'F'"),
        "cases": [
          {
            "alg": "[U] F R U R' U' R U R' U' R U R' U' F'"
          },
          {
            "alg": "x' U' R U' R' U R' F2 R U' R U R' U x"
          },
          {
            "alg": "[U'] R U R' U y' R' U R U' R2' F R F' R"
          },
          {
            "alg": "[U'] R' U' R U' y R U' R' U (l R) U' R' U l'"
          },
          {
            "alg": "R' F' R U R' U' R' F D' R U2 R' D R U R U' R' U' R\r\n[U'] F R U R' U' R U R' U' F' U R' F' U' F U R"
          },
          {
            "alg": "R' U' F' U F R U' F U R U' R' U R U' R' F'\r\n[U'] R' U' R U' R' U2 R U R' U' R U R' F' R U R' U' R' F R2"
          },
          {
            "alg": "R' U2 R U R' U R U R' U' R U R' F' R U R' U' R' F R2"
          },
          {
            "alg": "R U' R' U R U R' U' L U L' U' R U R' U2 L U L'"
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          }
        ]
      },
      {
        "name": "H 3",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("FRU'R'URU2R'U'RUR'U'F'"),
        "cases": [
          {
            "alg": "F R U' R' U R U2 R' U' R U R' U' F'"
          },
          {
            "alg": "[U2] R U R' U R U' R2' F' R U2 R U2 R' F R U' R'\r\n[U] F R U R' U' R' F' U2 R U R' U R2 U2 R'"
          },
          {
            "alg": "F U R U' R' F' r' F' r U r U' r' F\r\n[U] F R' F' L F R F' L2 U2 L U L' U L"
          },
          {
            "alg": "[U'] R' U' F' U F R U R U R' U' R' F R F'\r\n[U'] F' r U R' U' r' F R2 U2 R' U' R U' R'"
          },
          {
            "alg": "[U] R U2 R' U' R U R' U' F' R U R' U' R' F R2 U' R'\r\n[U] R U' R2 F2 R U2 R U2 R' F2 U' R U2 R'"
          },
          {
            "alg": "[U2] R' F' R U R' U' R' F D' R U' R' D R U2 R\r\n[U'] R U2 R' U L' U2 R U2 R' U2 L R U' R'"
          },
          {
            "alg": "[U2] F U' R U2 R' U2 R U' R' U' R U R' U F'"
          },
          {
            "alg": "[U2] R' F R U R' U' F' R U' R' U R' F R F' U R\r\n[U2] R F R2' U' R2 U' R2' U2 R2 U' F' R'"
          },
          {
            "alg": "R' U2 R U R' U R' D R' U R D' R' U' R'"
          },
          {
            "alg": "[U] R U2 R' U' R U R' U2 R' F R2 U' R' U' R U R' F'\r\n[U2] R U2 R' U' R U' R D' R U' R' D R U R"
          },
          {
            "alg": "[U] R' U2 R U2 R2 F' R U R U' R' F U R"
          },
          {
            "alg": "[U'] F' R U2 R' U2 R' F R U R U R' U' R U' R'"
          }
        ]
      },
      {
        "name": "H 4",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("RUR'URUL'UR'U'L"),
        "cases": [
          {
            "alg": "R U R' U R U L' U R' U' L"
          },
          {
            "alg": "R' F' R U2 R U2 R' F U' R U' R'\r\n[U2] L' U' L U' L' U' R U' L U R'\r\nR' U' R U' R' U' L U' R U L'"
          },
          {
            "alg": "[U] R U R' U R U2 R' F R U' R' U' R U2 R' U' F'"
          },
          {
            "alg": "[U'] u R' U' R D' R U' R' U2 R U2 R U R U' R2 \r\n[U'] F R U' R' U' R U2 R' U' F' U R U R' U R U2 R'\r\nR' U' R D' R U' R' U2 R U2 R U R U' R2' D"
          },
          {
            "alg": "[U'] R U R2' F R F' r U' r' U r U r'"
          },
          {
            "alg": "[U] R' F R' F' R2 U' r' U r U' r' U' r"
          },
          {
            "alg": "R' F' R U2 R U2 R' F R' U' R2 U' R' U R' U R\r\nF R' F' R U2 R U2 R' U' R' F2 r U r' F R"
          },
          {
            "alg": "[U2] R' U' R U' R' U F' R U R' U' R' F R2 U' R' U R"
          },
          {
            "alg": "[U'] R U2 R' U' R2 D R' U R D' R2' U' R U' R'"
          },
          {
            "alg": "[U] R' U2 R U R2' D' R U' R' D R2 U R' U R"
          },
          {
            "alg": "[U'] R' U2 R U R' U' F' R U R' U' R' F R U2 R"
          },
          {
            "alg": "[U2] R2' D' R U' R' D R2 U' R2 D' R U2 R' D R2"
          }
        ]
      }
    ]
  },
  {
    "name": "Pi set",
    "subsets": [
      {
        "name": "Pi 1",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("RUR2U'R2U'R2U2R2U'R'URU2R'"),
        "cases": [
          {
            "alg": "R U R2 U' R2 U' R2 U2 R2 U' R' U R U2 R'"
          },
          {
            "alg": "[U] R U R' U R U2 R' U R U R' U R U2 R'"
          },
          {
            "alg": "R U2 R2 U' R2 U' R2 U2 R"
          },
          {
            "alg": "R' U2 R2 U R2 U R2 U2 R'"
          },
          {
            "alg": "[U']  R U2 R' U2 R U' R' U2 R U' R' U2 R U R'"
          },
          {
            "alg": "[U] R' U2 R U2 R' U R U2 R' U R U2 R' U' R"
          },
          {
            "alg": "[U2] R' U R U' R2 U2 R U R' U R2 U' R' U R\r\n[U2] R U' R' U2 R U R' U2 R U R' U2 R U2 R'"
          },
          {
            "alg": "[U2] R2' U2 R U R U' R' U R' U R2 U' R' U R\r\n[U2] R' U R U2 R' U' R U2 R' U' R U2 R' U2 R"
          },
          {
            "alg": "R U R' U R U2 R' U' R U R' U R U2 R'"
          },
          {
            "alg": "R U R' U' R' U2 R U R' U R2 U2 R'\r\nR U2 R2 U' R U' R' U2 R U R U' R'"
          },
          {
            "alg": "[U] R U2 R' U' R U' R2 U' R U' R' U2 R"
          },
          {
            "alg": "[U] R U R' U R U2 R2 U2 R U R' U R"
          }
        ]
      },
      {
        "name": "Pi 2",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("RU'L'UR'ULUL'UL"),
        "cases": [
          {
            "alg": "R U' L' U R' U L U L' U L"
          },
          {
            "alg": "[U2] L' U R U' L U' R' U' R U' R'"
          },
          {
            "alg": "[U'] F U R U2 R' U R U R' F' R U2 R' U' R U' R'"
          },
          {
            "alg": "R U2 R' U' R U' R' U' F U R U2 R' U R U R' F'\r\n[U2] R U2 R' U' R U L' U2 L U2 R' U' L' U L"
          },
          {
            "alg": "r U' r' U' r U r' U' (l R) U' R' U l'"
          },
          {
            "alg": "r' U r U r' U' r U R2 F R F' R"
          },
          {
            "alg": "R' U' R U R2 F' R U R U' R' F U' R U R' U R"
          },
          {
            "alg": "[U2] R' F' r U' r' F2 R U R U2 R' U2 R' F R F' \r\n[U'] R' U' F' R U2 R' U' R U' R' F U R U R' U2 R"
          },
          {
            "alg": "R U R' U R2 D R' U' R D' R2 U R U2 R'"
          },
          {
            "alg": "R' U' R U' R2' D' R U R' D R2 U' R' U2 R"
          },
          {
            "alg": "[U2] R' U2 R' F' R U R U' R' F U R U' R' U2 R\r\n[U'] R2 D R' U2 R D' R2 U' R2 D R' U' R D' R2"
          },
          {
            "alg": "[U2] R' U R U' R' U R U R' U2 r' F R F' r\r\n[U] R2 D' R U2 R' D R2 U R2 D' R U R' D R2"
          }
        ]
      },
      {
        "name": "Pi 3",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("[U]FURU'R'URU2R'U'RUR'F'"),
        "cases": [
          {
            "alg": "[U] F U R U' R' U R U2 R' U' R U R' F'"
          },
          {
            "alg": "[U'] R U R' U R U2 R2 U' R' F R U R U' R' F' R\r\n[U'] R U R' U R U2 R2 F' r U R U' r' F"
          },
          {
            "alg": "[U'] L' U' L U' r' F2 r2 U R' U' r' F R F'"
          },
          {
            "alg": "R2' F R U R U' R' F' R U' R' U' R U R' U R"
          },
          {
            "alg": "[U2] R' U' R' D' R U R' D R3 U R' U R U2 R'"
          },
          {
            "alg": "[U2] R U R D R' U' R D' R U' R U' R' U2 R"
          },
          {
            "alg": "R U R' U R' F R F' R' U' F' U F R2 U' R'"
          },
          {
            "alg": "[U2] L' U' L U' L F' L' F L U F U' F' L2 U L\r\nF R U R' U' R' F' R U2 R' U' R2 U' R2' U2 R"
          },
          {
            "alg": "[U'] F U' R U' R' U R U R' U2 R U2 R' U F'"
          },
          {
            "alg": "[U2] R' D R' U R U' R' U' R U2 R' U2 R D' R"
          },
          {
            "alg": "R' U' F' R U R' U' R' F R2 U2 R' U2 R"
          },
          {
            "alg": "[U'] R U R' U R U' R' U' R' F' R U2 R U2 R' F"
          }
        ]
      },
      {
        "name": "Pi 4",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("R'F'U'FU'RUS'R'URS"),
        "cases": [
          {
            "alg": "R' F' U' F U' R U S' R' U R S"
          },
          {
            "alg": "[U] R U2 R' U' F' R U2 R' U' R U' R' F R U' R'"
          },
          {
            "alg": "R (U D') R U R' D R2 U' R' U' R2 U2 R"
          },
          {
            "alg": "[U2] R U2 R' U R' D' R U R' D R2 U' R' U R U' R'\r\n[U2] R' U R U F U R' U' R F' U' R' U' R"
          },
          {
            "alg": "R' U R U F R' U R U' F' U' R' U' R"
          },
          {
            "alg": "[U'] r U R' U R' F R F' R U' R' U R U2 r'\r\nR F' U' R2 F U' F' U R2 U F R'"
          },
          {
            "alg": "[U] R' U' R' D' R U R' D R U2 R' D' R U2 R' D R2"
          },
          {
            "alg": "F U R' U' R2 U' R2 U2 R U2 R U R' F'"
          },
          {
            "alg": "R2 D R' U' R D' R' U' R' U R U' R' U' R U' R'"
          },
          {
            "alg": "R2' D' R U R' D R U R U' R' U R U R' U R"
          },
          {
            "alg": "[U2] R F U' R2 U2 R U R' U R2 U F' R'"
          },
          {
            "alg": "R2 D R' U2 R D' R2 U' R U R D R' U2 R D' R2\r\nR F U' R2 U' R U' R' U2 R2 U F' R'"
          }
        ]
      },
      {
        "name": "Pi 5",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("RUR'U'R'FR2UR'U'RUR'U'F'"),
        "cases": [
          {
            "alg": "R U R' U' R' F R2 U R' U' R U R' U' F'"
          },
          {
            "alg": "[U2] R U2 R' U2 R' F R2 U' R' U2 R U2 R' U' F'"
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          },
          {
            "alg": ""
          }
        ]
      },
      {
        "name": "Pi 6",
        "image": "https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=coll&case=" + encodeURIComponent("R'U'R'D'RU'R'DR2UR'U'RUR'UR"),
        "cases": [
          {
            "alg": "R' U' R' D' R U' R' D R2 U R' U' R U R' U R"
          },
          {
            "alg": "[U] F U R U2 R' U2 R U R2 F' R U2 R U2 R'"
          },
          {
            "alg": "[U2] R' D' R U R' D R U2 R U2 R' U R U' R' U' R U' R'"
          },
          {
            "alg": "[U2] R' U2 R U R' U' R U R2 F R U R U' R' F' R"
          },
          {
            "alg": "R U' R' U' R U' R' U R U R' U R' F' R U R U' R' F"
          },
          {
            "alg": "[U] r' F R F' r U R' U R U2 R' U' R U' R'"
          },
          {
            "alg": "R' F2 R U2 R U2 R' F2 U' R U' R'"
          },
          {
            "alg": "[U] r' F R F' r U R2 U' R U' R' U2 R"
          },
          {
            "alg": "[U] R2' F2 R2 U' R' U' R' F2 R2 U R' F2 R"
          },
          {
            "alg": "[U] R U R' U R U' R' U R2 D R' U' R D' R' U' R'"
          },
          {
            "alg": "[U] F U R U' R' U R U' R2 F' R U R U' R'"
          },
          {
            "alg": "F U R U' R2 F' R2 U R' F' U' F U2 R U' R'"
          }
        ]
      }
    ]
  }
];

export default zbllData;
