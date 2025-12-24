/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { workflowSections } from "@/lib/workflow";
import { SectionPanel } from "@/components/SectionPanel";

type StatusFilter = "automated" | "human" | "hybrid" | "checkpoint";

const STATUS_OPTIONS: { id: StatusFilter; label: string }[] = [
  { id: "automated", label: "Automated" },
  { id: "hybrid", label: "Hybrid" },
  { id: "checkpoint", label: "Checkpoints" },
  { id: "human", label: "Human" }
];

export function WorkflowExplorer() {
  const [search, setSearch] = useState("");
  const [activeStatuses, setActiveStatuses] = useState<Set<StatusFilter>>(
    () => new Set()
  );

  const toggleStatus = (status: StatusFilter) => {
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };

  const resetFilters = () => {
    setActiveStatuses(new Set());
    setSearch("");
  };

  const filteredSections = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();
    return workflowSections
      .map((section) => {
        const matchNodes = section.nodes.filter((node) => {
          const statusMatch =
            activeStatuses.size === 0 ||
            (node.status && activeStatuses.has(node.status));
          if (!statusMatch) return false;
          if (!normalizedQuery) return true;

          const corpus = [node.title, node.summary, ...(node.signals ?? [])]
            .join(" ")
            .toLowerCase();
          return corpus.includes(normalizedQuery);
        });
        return {
          ...section,
          nodes: matchNodes
        };
      })
      .filter((section) => section.nodes.length > 0);
  }, [search, activeStatuses]);

  const hasResults =
    filteredSections.length > 0 &&
    filteredSections.some((section) => section.nodes.length > 0);

  return (
    <div className="flex flex-col gap-10">
      <div className="sticky top-4 z-20 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 backdrop-blur">
        <div className="flex flex-col gap-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Discovery Console
          </label>
          <div className="group relative">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search nodes by title, capability, or signal…"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/30"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-4 flex items-center text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {STATUS_OPTIONS.map((option) => {
            const isActive = activeStatuses.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleStatus(option.id)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                  isActive
                    ? "border-emerald-400 bg-emerald-400/20 text-emerald-100"
                    : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500"
                }`}
              >
                {option.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={resetFilters}
            className="ml-auto text-xs text-slate-400 hover:text-slate-100"
          >
            Reset
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {hasResults ? (
          <motion.div
            layout
            className="flex flex-col gap-16"
            key="sections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredSections.map((section) => (
              <SectionPanel
                key={section.id}
                section={section}
                filteredStatuses={activeStatuses}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-16 text-center text-slate-400"
          >
            <span className="text-sm uppercase tracking-[0.4em] text-slate-500">
              No Matches
            </span>
            <p className="max-w-md text-sm text-slate-300">
              Adjust the filters or clear the search query to explore the full
              workflow again.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
