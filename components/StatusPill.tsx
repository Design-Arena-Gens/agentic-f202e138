import clsx from "clsx";
import type { WorkflowNode } from "@/lib/workflow";

const STATUS_MAP: Record<
  NonNullable<WorkflowNode["status"]>,
  { label: string; className: string }
> = {
  automated: {
    label: "Automated",
    className: "bg-emerald-400/10 text-emerald-300 border border-emerald-300/30"
  },
  human: {
    label: "Human",
    className: "bg-rose-400/10 text-rose-200 border border-rose-200/40"
  },
  hybrid: {
    label: "Hybrid",
    className: "bg-amber-400/10 text-amber-200 border border-amber-200/40"
  },
  checkpoint: {
    label: "Checkpoint",
    className: "bg-sky-400/10 text-sky-200 border border-sky-200/40"
  }
};

export function StatusPill({ status }: { status: WorkflowNode["status"] }) {
  if (!status) return null;

  const config = STATUS_MAP[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
