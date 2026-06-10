'use client';

import { useState } from 'react';
import zbllData from '@/lib/zbllData';

export default function ZBLLClient() {
  const [mainFilter, setMainFilter] = useState('All');
  const [subFilter, setSubFilter] = useState('All');

  const mainOptions = ['All', 'T set', 'U set', 'L set', 'H set', 'Pi set'];
  
  const currentSet = zbllData.find(s => s.name === mainFilter);
  const subsets = currentSet ? currentSet.subsets : [];

  const handleMainFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMainFilter(e.target.value);
    setSubFilter('All');
  };

  let displayedCases: { alg: string, alt?: string, setName: string, subsetName: string }[] = [];

  // Filter the sets and subsets based on the current dropdown/pill selections
  const filteredSets = zbllData
    .filter((set) => mainFilter === 'All' || set.name === mainFilter)
    .map((set) => ({
      ...set,
      subsets: set.subsets.filter((subset) => subFilter === 'All' || subset.name === subFilter),
    }))
    // Remove sets that end up having no subsets to show
    .filter((set) => set.subsets.length > 0);

  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans min-h-screen">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-[-12rem] h-[32rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10" />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">3x3 ZBLL</h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              Zborowski-Bruchem Last Layer. Solves the entire last layer in one algorithm when the edges are already oriented.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={`https://cube.rider.biz/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=ll&case=${encodeURIComponent("R U R' U R U2 R' F R U R' U' F'")}`}
              alt="3x3 ZBLL case diagram"
              className="max-w-xs rounded-xl shadow-lg bg-neutral-800 p-4"
            />
          </div>
        </div>
      </section>

      {/* Filters & Algorithm Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Main Filter Dropdown */}
          <div className="mb-8 flex items-center gap-4">
            <label className="text-neutral-300 font-medium">Select Set:</label>
            <select
              value={mainFilter}
              onChange={handleMainFilterChange}
              className="bg-neutral-900 border border-neutral-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {mainOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Sub Filter Pills (Only visible when a specific set is selected) */}
          {mainFilter !== 'All' && subsets.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-3">
              <button
                onClick={() => setSubFilter('All')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  subFilter === 'All'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                All {mainFilter.split(' ')[0]}
              </button>
              {subsets.map((subset) => (
                <button
                  key={subset.name}
                  onClick={() => setSubFilter(subset.name)}
                  className={`flex items-center gap-2 pr-5 pl-2 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    subFilter === subset.name
                      ? 'bg-indigo-600 text-white'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  <img
                    src={subset.image}
                    alt={subset.name}
                    className="w-7 h-7 rounded-full bg-white/10"
                  />
                  <span>{subset.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Algorithms Grid Grouped by Set */}
          <div className="flex flex-col gap-16">
            {filteredSets.map((set) => (
              <div key={set.name}>
                
                {/* Heading Text for the Set */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-neutral-800 pb-3">
                  {set.name}
                </h2>

                {/* 4 Items per row algorithm grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {set.subsets.flatMap((subset) =>
                    subset.cases.map((c, i) => (
                      <div
                        key={`${subset.name}-${i}`}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col items-center hover:border-neutral-600 transition-colors"
                      >
                        <div className="text-xs text-neutral-500 mb-2 font-mono uppercase tracking-wider">
                          {set.name} - {subset.name}
                        </div>
                        <img
                          src={`https://visualcube.api.cubing.net/visualcube.php?fmt=png&bg=transparent&pzl=3&view=plan&stage=ll&case=${encodeURIComponent(c.alg)}`}
                          alt={`${subset.name} algorithm`}
                          className="w-32 h-32 mb-4"
                        />
                        <div className="text-center w-full mt-auto">
                          <p className="font-mono text-indigo-400 font-medium text-[14px] mb-2 leading-relaxed">
                            {c.alg}
                          </p>
                          {c.alt && (
                            <p className="font-mono text-neutral-500 text-xs">
                              {c.alt}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
