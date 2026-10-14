export type ConceptViewId = "math" | "chinglish" | "graphic";

export interface ConceptView {
  id: ConceptViewId;
  label: string;
  body: string;
}

export interface Concept {
  slug: string;
  title: string;
  /** Optional short hint on the index list */
  blurb?: string;
  views: ConceptView[];
}

/** Shared view labels — keep order stable across concepts. */
export const VIEW_ORDER: ConceptViewId[] = ["math", "chinglish", "graphic"];

export const VIEW_LABELS: Record<ConceptViewId, string> = {
  math: "Mathematical definition",
  chinglish: "Chinglish",
  graphic: "Graphic",
};

/** Short tab chrome — full names stay in VIEW_LABELS / aria. */
export const VIEW_SHORT_LABELS: Record<ConceptViewId, string> = {
  math: "Math",
  chinglish: "Chinglish",
  graphic: "Graphic",
};

/**
 * Add new concepts here. Each gets a page at /<slug>/ via getStaticPaths.
 * For math views, put copyable LaTeX source in `body`.
 * Leave graphic `body` empty to hide that tab for now.
 */
export const concepts: Concept[] = [
  {
    slug: "signal",
    title: "Signal",
    blurb: "A function of time (or space) that carries information.",
    views: [
      {
        id: "math",
        label: VIEW_LABELS.math,
        body: `A continuous-time signal is a function $x\\colon\\mathbb{R}\\to\\mathbb{C}$ (or $\\mathbb{R}$). A discrete-time signal is a sequence $x\\colon\\mathbb{Z}\\to\\mathbb{C}$ (or $\\mathbb{R}$), often written $x[n]$.

When they exist, energy and power are defined via integrals / sums of $|x|^2$ over time.`,
      },
      {
        id: "chinglish",
        label: VIEW_LABELS.chinglish,
        body: `一个 signal 就是随 time（或 space）变化的量：continuous-time 写成 x(t)，discrete-time 写成 x[n]。

它可以是 voltage、sound pressure、pixel brightness——任何“带着信息、随自变量变化”的东西。Course 里我们主要关心它的数学性质：periodic 吗？energy 有限吗？怎么用 impulse / step 去拆它？`,
      },
      {
        id: "graphic",
        label: VIEW_LABELS.graphic,
        body: `A signal is just “stuff that varies” — usually with time — that we want to measure, store, or process.

Once you treat it as a function (or sequence), every later tool (convolution, Fourier, filtering) is a way of asking: what is inside this variation, and how can I reshape it?`,
      },
    ],
  },
  {
    slug: "system",
    title: "System",
    blurb: "A rule that turns an input signal into an output signal.",
    views: [
      {
        id: "math",
        label: VIEW_LABELS.math,
        body: `A system is a mapping $S$ that takes an input signal $x$ to an output signal $y=S\\{x\\}$.

Key properties include linearity, time-invariance, causality, and BIBO stability. An LTI system is characterized by its impulse response $h$ via
\\[
y = x * h.
\\]`,
      },
      {
        id: "chinglish",
        label: VIEW_LABELS.chinglish,
        body: `一个 system 是一个 rule：input signal x 进去，output signal y = S{x} 出来。

我们最关心它有没有这些性质：linear、time-invariant、causal、BIBO stable。如果它是 LTI，那只要知道 impulse response h，任意 input 的 output 都能用 convolution y = x ∗ h 算出来。`,
      },
      {
        id: "graphic",
        label: VIEW_LABELS.graphic,
        body: `A system is a machine that eats one signal and spits out another — a filter, a circuit, a differential equation, even a piece of code.

Signals and systems is mostly about classifying those machines (especially linear and time-invariant ones) so their behavior becomes predictable and computable.`,
      },
    ],
  },
];

export function getConcept(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getSortedViews(concept: Concept): ConceptView[] {
  const byId = new Map(concept.views.map((v) => [v.id, v]));
  return VIEW_ORDER.map((id) => byId.get(id)).filter(
    (v): v is ConceptView => v != null && v.body.trim() !== "",
  );
}
