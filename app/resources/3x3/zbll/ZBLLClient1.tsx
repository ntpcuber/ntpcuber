'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import zbllData from '@/lib/zbllData';
import { PNG, Type, PNGVisualizerOptions } from "sr-puzzlegen";

// Sanitize IDs: replace spaces/special chars so querySelector won't break
const sanitizeId = (str: string) => str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');

export default function ZBLLClient1() {
  const [mainFilter, setMainFilter] = useState('All');
  const [subFilter, setSubFilter] = useState('All');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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

  const getSubsetLabel = (setName: string, subsetName: string) => {
    const setPrefix = setName.split(' ')[0];
    return subsetName.startsWith(setPrefix) ? subsetName : `${setPrefix}${subsetName}`;
  };

  // ✅ Run PNG() AFTER the DOM has rendered, not during render
  useEffect(() => {
    filteredSets.forEach((set) => {
      set.subsets.forEach((subset) => {
        const subsetLabel = sanitizeId(getSubsetLabel(set.name, subset.name));
        subset.cases.forEach((c, i) => {
          const elementId = `${subsetLabel}-${i}`;
          const el = document.getElementById(elementId);
          if (!el) return; // guard: skip if not in DOM yet
          // Clear previous render before re-drawing
          el.innerHTML = '';
          const options: PNGVisualizerOptions = {
            width: 250,
            height: 250,
            strokeWidth: 0.03,
            puzzle: { case: c.alg },
          };
          try {
            PNG(`#${elementId}`, Type.CUBE_TOP, options);
          } catch (err) {
            console.warn(`Failed to render cube for ${elementId}:`, err);
          }
        });
      });
    });
  }, [mainFilter, subFilter]); // re-run when filters change

  const getCubeUrl = (alg: string) =>
    `https://visualcube.api.cubing.net/visualcube.php?fmt=svg&pzl=3&view=plan&stage=ll&bg=transparent&case=${encodeURIComponent(alg)}`;

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 1500);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans min-h-screen relative">
      <div className="absolute inset-x-0 top-[-12rem] h-[32rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10" />

      {/* Hero */}
      <section className="pt-32 pb-20">
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
              src="/image/zb_hero.png"
              alt="3x3 ZBLL case diagram"
              className="max-w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Filters & Tables */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 flex items-center gap-4">
            <label className="text-neutral-300 font-medium">Select Set:</label>
            <select
              value={mainFilter}
              onChange={handleMainFilterChange}
              className="bg-neutral-900 border border-neutral-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {mainOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

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
                  <img src={subset.image} alt={subset.name} className="w-7 h-7 rounded-full bg-white/10" />
                  <span>{subset.name}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-16">
            {filteredSets.map((set) => (
              <div key={set.name}>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-neutral-800 pb-3">
                  {set.name}
                </h2>
                <div className="flex flex-col gap-10">
                  {set.subsets.map((subset) => {
                    const subsetLabel = sanitizeId(getSubsetLabel(set.name, subset.name));
                    return (
                      <div key={subset.name}>
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
                          {getSubsetLabel(set.name, subset.name)}
                        </h3>
                        <div className="flex justify-center">
                          <div className="overflow-x-auto max-w-full">
                            <table className="w-max border-collapse overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg">
                              <tbody>
                                {subset.cases.map((c, i) => {
                                  const mainCopyKey = `${subsetLabel}-${i}-main`;
                                  const altCopyKey = `${subsetLabel}-${i}-alt`;
                                  return (
                                    <tr key={`${subset.name}-${i}`} className="border-b border-neutral-800 last:border-b-0">
                                      {/* ✅ Just render the container div — PNG() will fill it in useEffect */}
                                      <td className="w-[152px] min-w-[152px] border-r border-neutral-800 bg-neutral-950/40 p-4 align-middle">
                                        <div className="flex items-center justify-center">
                                          <div
                                            id={`${subsetLabel}-${i}`}
                                            className="w-24 h-24 md:w-28 md:h-28"
                                          />
                                        </div>
                                      </td>
                                      <td className="p-4 align-middle whitespace-nowrap">
                                        <div className="flex flex-col gap-4">
                                          <div className="flex items-center gap-3">
                                            <p className="font-mono text-indigo-400 font-medium text-[14px] md:text-[15px] leading-relaxed">
                                              {c.alg}
                                            </p>
                                            <button
                                              type="button"
                                              onClick={() => copyToClipboard(c.alg, mainCopyKey)}
                                              className="shrink-0 rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
                                            >
                                              {copiedKey === mainCopyKey ? 'Copied' : 'Copy'}
                                            </button>
                                          </div>
                                          {c.alt && (
                                            <div>
                                              <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Alternate</p>
                                              <div className="flex items-center gap-3">
                                                <p className="font-mono text-neutral-400 text-sm leading-relaxed">{c.alt}</p>
                                                <button
                                                  type="button"
                                                  onClick={() => copyToClipboard(c.alt!, altCopyKey)}
                                                  className="shrink-0 rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
                                                >
                                                  {copiedKey === altCopyKey ? 'Copied' : 'Copy'}
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
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