import { MetaHeader } from "@/components/MetaHeader";
import { WorkflowExplorer } from "@/components/WorkflowExplorer";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-16 px-6 pb-20 pt-16 md:px-10 lg:px-14">
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/90 p-10 shadow-card">
        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-xs font-mono uppercase tracking-[0.3em] text-emerald-100">
              Workflow 1 · AI Content Factory
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-slate-50 md:text-5xl">
              65-node automated pipeline that crafts daily avatar-led videos
              with cinematic polish and data-backed optimization.
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
              This blueprint orchestrates research, scriptwriting, asset
              generation, post-production, and distribution in roughly half an
              hour. It blends Claude 4.5, GPT-5.2, Gemini 3, HeyGen, Leonardo,
              Sora 2, Veo 3.1, Luma AI, and YouTube automations with human
              review checkpoints to deliver consistent, monetizable video
              content at scale.
            </p>
          </div>
          <MetaHeader />
        </div>
      </section>
      <WorkflowExplorer />
    </main>
  );
}
