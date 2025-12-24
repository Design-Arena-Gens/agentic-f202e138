import { workflowMeta } from "@/lib/workflow";

const metaItems = [
  { label: "Total Nodes", value: workflowMeta.totalNodes },
  { label: "Execution Time", value: workflowMeta.executionTime },
  { label: "Cost", value: workflowMeta.cost },
  { label: "Automation", value: workflowMeta.automation }
];

export function MetaHeader() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {metaItems.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-card"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            {item.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-100">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
