# Learned Multi-LoRA Fusion / Nexus shell — archived concept repository

> **Status:** Historical generated prototype repository with two distinct phases. It does not implement or validate learned multi-LoRA fusion, and its current active UI is a mock agent dashboard rather than an agent runtime.

Pre-archive default-branch snapshot:

`bf3b5e379129d2dcd187a6fb9631d1ff8877bde7`

## Phase 1 — MoLE / Learned Multi-LoRA design sketch

The 2025 application presented a proposed “Mixture of LoRA Experts” (MoLE) architecture. That material survives primarily in `App.backup.tsx`, `constants.ts`, `BenchmarkTable.tsx`, and historical Git commits.

The prototype contains useful **design ideas**, including:

- clause/task-aware adapter routing;
- sparse expert weighting;
- adapter-registry and inference-engine interfaces;
- semantic-cache concepts;
- multi-tenant serving considerations.

However, the repository does **not** contain a working learned multi-LoRA fusion system.

The embedded Python shown by the UI is illustrative/stub code:

- clause “perplexity” uses `_synthetic_ppl()` based on string length;
- expert selection takes the first candidates rather than a learned router;
- the inference example creates string-combined outputs rather than real fused adapter inference;
- the UI itself says real Hugging Face/PEFT, Milvus, SGMV/Punica/vLLM, and real PPL still need implementation.

The old browser `geminiService.ts` also did not perform LoRA fusion. It asked Gemini 2.5 Flash to **simulate** semantic chunks, expert weights, synergies, conflicts, and a final response.

## Historical benchmark figures are not empirical evidence

The old UI displayed fixed values such as:

- 89.7% multi-task accuracy;
- 45 ms median latency;
- 2–8% active parameters;
- 350 requests/second;
- improvements over LoRA/MoE baselines.

Those values are hard-coded in `BenchmarkTable.tsx` / `constants.ts`. No bound experiment dataset, trained adapters, benchmark harness, raw results, environment manifest, or reproducible run was found that establishes them as empirical measurements.

They must be treated as historical illustrative claims, not validated performance results.

## Phase 2 — unrelated Nexus mock dashboard

In February 2026, PR #1 changed the active `App.tsx` from the LoRA/MoLE guide to a “Nexus Agentic Automation Suite Dashboard.” The earlier app was renamed `App.backup.tsx`.

The active dashboard is also a prototype shell:

- `services/mockAgentService.ts` returns hard-coded agents, memories, channels, messages, and logs;
- dashboard counts such as “Memory Items 1,248” and “Tokens Used 45.2k” are static display values;
- messages are simulated with `setTimeout`;
- agent/terminal/gateway surfaces do not establish a real executor, memory store, gateway, or production agent system.

This phase is preserved as repository history, not adopted as canonical agent infrastructure. AXIOM-MESH / ZovsIronClaw / IronAgent boundaries should not inherit this mock UI as authority or product truth.

## Browser provider credential correction

The pre-archive Vite configuration injected `GEMINI_API_KEY` into browser code, and the historical Gemini service instantiated `GoogleGenAI` directly in the frontend.

The archived source state:

- removes Vite provider-key injection;
- binds Vite development to loopback (`127.0.0.1`);
- disables the browser Gemini simulation/analysis functions rather than preserving an unsafe client credential path.

The original executable implementation remains available in Git history at the pre-archive snapshot.

## What may be worth salvaging

Potential future value is conceptual, not the integrated shell:

- explicit adapter registry interfaces;
- routing/fusion API shapes;
- sparse-weighting mathematics after independent review;
- evaluation questions for multi-adapter interference, latency, and serving cost;
- UI patterns for visualizing **measured** adapter routing/fusion data.

Any future LoRA-fusion project should be a new reproducible implementation with real adapters, declared base models, training/evaluation data, measured routing/fusion behavior, hardware/runtime manifests, and independently reproducible benchmarks.

## Non-claims

This repository does not establish:

- learned LoRA routing;
- real adapter fusion;
- the hard-coded performance figures;
- production SGMV/vLLM/Milvus integration;
- a working Nexus agent runtime;
- real memory, gateway, terminal, or agent execution;
- secure browser access to Gemini.

See [PORTFOLIO_STATUS.md](PORTFOLIO_STATUS.md).

## AXIOM boundary

Do not integrate this repository wholesale into AXIOM. Any reusable routing/fusion concept should be specified independently and backed by capability-specific tests/benchmarks. Mock agent state and Gemini-generated “fusion weights” must never become capability, policy, trust, or execution authority.
