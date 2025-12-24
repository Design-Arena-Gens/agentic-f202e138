import { motion } from "framer-motion";
import { StatusPill } from "@/components/StatusPill";
import type { WorkflowNode } from "@/lib/workflow";

const statusAccent: Record<
  NonNullable<WorkflowNode["status"]>,
  string
> = {
  automated: "from-emerald-400/20 via-transparent",
  human: "from-rose-400/20 via-transparent",
  hybrid: "from-amber-300/20 via-transparent",
  checkpoint: "from-sky-400/20 via-transparent"
};

export function NodeCard({ node }: { node: WorkflowNode }) {
  const accent =
    node.status && statusAccent[node.status]
      ? statusAccent[node.status]
      : "from-slate-500/15 via-transparent";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="relative h-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md"
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${accent} to-transparent`}
        aria-hidden
      />
      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400">
            Node {node.id.toString().padStart(2, "0")}
          </span>
          <StatusPill status={node.status} />
        </div>
        <h3 className="text-lg font-semibold text-slate-50">{node.title}</h3>
        <p className="text-sm leading-relaxed text-slate-300">{node.summary}</p>
        {node.signals && node.signals.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {node.signals.map((signal) => (
              <span
                key={signal}
                className="rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-xs text-slate-300"
              >
                {signal}
              </span>
            ))}
          </div>
        )}
        {node.tools && node.tools.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            {node.tools.map((tool) => (
              <span key={tool} className="font-mono">
                {tool}
              </span>
            ))}
          </div>
        )}
        {node.cost && (
          <p className="mt-auto text-xs font-semibold uppercase tracking-wide text-amber-300">
            Cost: {node.cost}
          </p>
        )}
      </div>
    </motion.article>
  );
}
