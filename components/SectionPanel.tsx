import { motion } from "framer-motion";
import { NodeCard } from "@/components/NodeCard";
import type { WorkflowSection } from "@/lib/workflow";

export function SectionPanel({
  section,
  filteredStatuses
}: {
  section: WorkflowSection;
  filteredStatuses: Set<string>;
}) {
  const filteredNodes = section.nodes.filter((node) => {
    if (filteredStatuses.size === 0) {
      return true;
    }
    if (!node.status) {
      return filteredStatuses.has("unclassified");
    }
    return filteredStatuses.has(node.status);
  });

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-mono uppercase tracking-[0.3em] text-slate-300">
              {section.label}
            </span>
            <span className="text-xs text-slate-400">{section.range}</span>
          </div>
          <motion.div
            layout
            className="hidden text-sm text-slate-400 md:block"
          >
            {section.nodes.length} nodes
          </motion.div>
        </div>
        <p className="max-w-3xl text-sm text-slate-300">{section.description}</p>
      </header>
      <motion.div
        layout
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {filteredNodes.map((node) => (
          <NodeCard key={node.id} node={node} />
        ))}
      </motion.div>
    </section>
  );
}
