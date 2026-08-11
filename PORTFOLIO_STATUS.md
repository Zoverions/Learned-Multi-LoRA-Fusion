# Learned Multi-LoRA Fusion portfolio status

Status date: 2026-08-10

## Disposition

Historical generated concept repository. Preserve the two prototype phases and their negative findings; do not maintain this repository as a canonical LoRA-fusion implementation or agent runtime.

Pre-archive default-branch snapshot:

`bf3b5e379129d2dcd187a6fb9631d1ff8877bde7`

## Phase 1 — MoLE design sketch

The original 2025 app proposed a “Mixture of LoRA Experts” architecture and displayed Python-like implementation snippets plus benchmark tables.

The surviving source itself establishes that this was not a complete measured system:

- `App.backup.tsx` describes the code explorer as “working stubs” still needing real models and serving kernels;
- `ROUTING_ENGINE_CODE` uses `_synthetic_ppl()` based on sentence length rather than model perplexity;
- routing selects the first available candidates with equal starting weights rather than a learned router;
- `INFERENCE_ENGINE_CODE` constructs weighted string fragments rather than demonstrating real fused adapter kernels;
- the UI says real Hugging Face/PEFT, Milvus, SGMV/Punica/vLLM, and real PPL still require implementation;
- `services/geminiService.ts` historically asked Gemini to simulate routing/fusion weights and generate an answer rather than loading or fusing LoRA adapters.

## Unbound benchmark claims

The historical UI hard-codes figures including:

- `89.7%` multi-task accuracy;
- `45ms` median latency;
- `2-8%` active parameters;
- `350 req/s` throughput;
- fixed LoRA/MoE baseline values and percentage improvements.

No bound benchmark dataset, trained adapter artifacts, hardware/runtime manifest, raw result file, or reproducible experiment harness was found that would establish those values as empirical results.

They are historical illustrative claims, not verified performance evidence.

## Phase 2 — Nexus mock agent dashboard

February 2026 PR #1 replaced the active LoRA/MoLE application with a “Nexus Agentic Automation Suite Dashboard” and renamed the prior entry point to `App.backup.tsx`.

The active dashboard is mock data/UI:

- `services/mockAgentService.ts` hard-codes agents, memories, channels, messages, and terminal logs;
- response generation is a timer plus `I received: ... This is a mock response`;
- dashboard values such as memory count and token use are static;
- no real executor, memory database, browser agent, WhatsApp/Discord gateway, or production agent runtime is established by this UI.

This phase should not be integrated into AXIOM, ZovsIronClaw, IronAgent, or other maintained agent infrastructure as if it were a working control plane.

## Browser credential boundary

The pre-archive Vite config loaded `GEMINI_API_KEY` and injected it into browser code as `process.env.API_KEY` / `process.env.GEMINI_API_KEY`. The historical Gemini service instantiated `GoogleGenAI` directly in frontend code.

The archival state:

- removes Vite provider-key injection;
- binds Vite development to `127.0.0.1`;
- removes direct browser `GoogleGenAI` execution from `services/geminiService.ts`;
- makes the historical Gemini simulation/analysis functions fail closed with an archival explanation.

The original implementation remains available in Git history at the pre-archive SHA.

## Dependency-security remediation

The first exact archive workflow proved the source/credential boundary and production build, but the old lock reported:

- 11 vulnerabilities total;
- 1 critical;
- 8 high;
- 1 moderate;
- 1 low.

The production audit alone contained 1 critical plus 3 high findings, including the unused Gemini SDK's `protobufjs` / transport dependency chain.

A read-only disposable candidate workflow removed **only** the now-unused direct dependency `@google/genai` from `package.json`, then ran compatible `npm audit fix --package-lock-only` without `--force`.

Candidate workflow evidence:

- workflow `LoRA Nexus Read-Only Dependency Candidate`;
- run `31455982351`;
- job `93669730379`;
- manifest guard: passed — no direct dependency changed except removal of `@google/genai`;
- exact `npm ci`: passed;
- production build: passed on Vite `6.4.3`;
- production audit: 0 vulnerabilities;
- full locked-graph audit: 0 vulnerabilities.

Verified candidate identities:

- `package.json` SHA-256: `0e43830b92784a13f750ea8634a0573b2585b0f424efec7197ec1f5f66344c66`;
- `package-lock.json` SHA-256: `0601c131ed5af2360e927032c02a29e3a56fc9e499fda399bcb2e39185d23cc1`;
- `package.json` Git blob: `4ec6a99397675f204db110c15998be4d9817a050`;
- `package-lock.json` Git blob: `3ae1c7218620fe506f2cdd28a247f9f0b0235e7c`;
- artifact ID: `9088036790`;
- artifact ZIP SHA-256: `729439a9df828b39f04399e1b2fb7e98598712de7e78ed8ffbe57a8b066c36fc`.

A one-shot feature-branch transfer workflow then revalidated the artifact, manifest scope, build, and both audits before committing the exact two package files. The transfer also deleted both the read-only candidate workflow and its own write-capable workflow from the branch. Durable dependency commit:

`394a2ecc37a7a65224bdb94542f79ee108713be3`

Direct inspection confirmed both temporary dependency workflows are absent from that commit and the committed package blobs match the verified candidate exactly.

Promotion still requires the permanent read-only archive workflow to pass on an ordinary owner-authored final head after this evidence update.

## Reproducibility / dependency boundary

The repository has a committed `package-lock.json`. The permanent archive workflow therefore uses exact `npm ci`, production build, and both production/full high-severity audit scopes.

A green build proves only that the archived frontend compiles. It does not validate LoRA fusion, benchmark accuracy, agent runtime behavior, or the historical Gemini-generated analysis.

## Salvage candidates

Potential future value is limited to concepts that can be independently specified and implemented elsewhere:

- adapter registry and routing/fusion API shapes;
- sparse weighting mathematics after independent review;
- benchmark questions for multi-adapter interference, throughput, latency, and memory;
- UI patterns for visualizing **measured** routing/fusion behavior.

Any future LoRA-fusion work should use real adapter artifacts, declared base models, explicit training/evaluation data, measured router/fusion behavior, hardware/runtime manifests, and reproducible benchmark outputs.

## AXIOM boundary

Do not integrate this repository wholesale. Gemini-generated simulated weights, hard-coded benchmark figures, and mock agent state are advisory/example data only and cannot become AXIOM capability, policy, trust, memory, or execution authority.
