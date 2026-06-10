'use client';

import { useState, type ChangeEvent } from 'react';
import zbllData from '@/lib/zbllData';

export default function ZBLLClient1() {
  const [mainFilter, setMainFilter] = useState('All');
  const [subFilter, setSubFilter] = useState('All');

  const mainOptions = ['All', 'T set', 'U set', 'L set', 'H set', 'Pi set'];

  const currentSet = zbllData.find((s) => s.name === mainFilter);
  const subsets = currentSet ? currentSet.subsets : [];

  const handleMainFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMainFilter(e.target.value);
    setSubFilter('All');
  };

  const filteredSets = zbllData
    .filter((set) => mainFilter === 'All' || set.name === mainFilter)
    .map((set) => ({
      ...set,
      subsets: set.subsets.filter(
        (subset) => subFilter === 'All' || subset.name === subFilter
      ),
    }))
    .filter((set) => set.subsets.length > 0);

  const getCubeUrl = (alg: string) =>
    `https://visualcube.api.cubing.net/visualcube.php?fmt=svg&pzl=3&view=plan&stage=ll&bg=transparent&case=${encodeURIComponent(
      alg
    )}`;

  const getSubsetLabel = (setName: string, subsetName: string) => {
    const setPrefix = setName.split(' ')[0]; // e.g. "T" from "T set"
    return subsetName.startsWith(setPrefix) ? subsetName : `${setPrefix} ${subsetName}`;
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans min-h-screen relative">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-[-12rem] h-[32rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10" />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">3x3 ZBLL</h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              Zborowski-Bruchem Last Layer. Solves the entire last layer in one
              algorithm when the edges are already oriented.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src={getCubeUrl("R U R' U R U2 R' F R U R' U' F'")}
              alt="3x3 ZBLL case diagram"
              className="max-w-xs rounded-xl shadow-lg bg-neutral-800/60 p-4"
            />
          </div>
        </div>
      </section>

      {/* Filters & Table Layout */}
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
              {mainOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
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

          {/* Algorithms in table-style sections */}
          <div className="flex flex-col gap-16">
            {filteredSets.map((set) => (
              <div key={set.name}>
                {/* Set heading */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-neutral-800 pb-3">
                  {set.name}
                </h2>

                {/* Subsets stacked vertically */}
                <div className="flex flex-col gap-10">
                  {set.subsets.map((subset) => {
                    const subsetLabel = getSubsetLabel(set.name, subset.name);

                    return (
                      <div key={subset.name}>
                        {/* Subheading outside the table */}
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
                          {subsetLabel}
                        </h3>

                        {/* Table-style container */}
                        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
                          {/* Optional header row */}
                          <div className="hidden md:grid md:grid-cols-[180px_1fr] border-b border-neutral-800 bg-neutral-950/60">
                            <div className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                              Case
                            </div>
                            <div className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                              Algorithm
                            </div>
                          </div>

                          {subset.cases.map((c, i) => (
                            <div
                              key={`${subset.name}-${i}`}
                              className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-neutral-800 last:border-b-0"
                            >
                              {/* First column: image */}
                              <div className="flex items-center justify-center p-5 border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-950/40">
                                <img
                                  src={getCubeUrl(c.alg)}
                                  alt={`${subsetLabel} algorithm ${i + 1}`}
                                  className="w-28 h-28 md:w-32 md:h-32"
                                />
                              </div>

                              {/* Second column: algorithm + alternate */}
                              <div className="p-5 flex flex-col justify-center">
                                <p className="font-mono text-indigo-400 font-medium text-[14px] md:text-[15px] leading-relaxed break-words">
                                  {c.alg}
                                </p>

                                {c.alt && (
                                  <div className="mt-4">
                                    <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                                      Alternate
                                    </p>
                                    <p className="font-mono text-neutral-400 text-sm leading-relaxed break-words">
                                      {c.alt}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
