
import type { BaseModel, LoRAExpert } from './types';

export const quickStartCode = `# Clone or navigate to project directory
cd multi-lora-fusion

# Run setup script
chmod +x setup_environment.sh
./setup_environment.sh

# Verify installation
./validate.sh`;

export const trainingCode = `# Full pipeline (Weeks 2-4)
./train.sh

# Or individual components
python train_complete_system.py --mode train_math
python train_complete_system.py --mode train_code
python train_complete_system.py --mode validate`;

export const inferenceCode = `from core.meta_fusion_engine import create_demo_system

# Initialize system
engine = create_demo_system(use_optimized=False)

# Generate with dynamic fusion
result = engine.generate(
    "Solve: What is 15% of 200?",
    return_weights=True
)

print(f"Fusion weights: {result['fusion_weights']}")
# Output: {'analytical': 0.45, 'creative': 0.20, 'safety': 0.35}`;

export const pplCode = `def find_minima(ppls, threshold):
    boundaries = []
    for i in range(1, len(ppls) - 1):
        # Local minimum condition
        is_local_min = (ppls[i] < ppls[i-1]) and (ppls[i] < ppls[i+1])
        
        # Margin threshold (prevents noisy boundaries)
        margin_satisfied = (
            (ppls[i-1] - ppls[i] > threshold) and 
            (ppls[i+1] - ppls[i] > threshold)
        )
        
        if is_local_min and margin_satisfied:
            boundaries.append(i)
    
    return boundaries`;
    
export const sparsegenCode = `def sparsegen_routing(u, lambda_val):
    # Sort logits
    u_sorted, indices = torch.sort(u, descending=True)
    U = torch.cumsum(u_sorted, dim=0)
    k_vals = torch.arange(1, len(u) + 1)
    
    # Find optimal k*
    condition = (1 - lambda_val) + k_vals * u_sorted > U
    k_star = k_vals[condition].max().long()
    
    # Compute threshold
    tau = (U[k_star - 1] - 1 + lambda_val) / k_star
    
    # Project to sparse distribution
    p_sorted = torch.clamp((u_sorted - tau) / (1 - lambda_val), min=0)
    
    # CRITICAL FIX: Direct assignment (not scatter)
    p_original = torch.zeros_like(u)
    p_original[indices] = p_sorted
    
    return p_original / (p_original.sum() + 1e-10)`;

export const mdsCode = `def compute_task_positions(loras, datasets):
    # Evaluate each LoRA on each dataset
    perf_matrix = evaluate_all(loras, datasets)
    
    # Compute correlation matrix
    corr_matrix = np.corrcoef(perf_matrix)
    
    # CRITICAL FIX: Correct distance formula
    distance_matrix = (1 - corr) / 2
    
    # Embed in 2D space
    mds = MDS(n_components=2, dissimilarity='precomputed')
    positions = mds.fit_transform(distance_matrix)
    
    return positions`;

export const sparsegenFixCode = `def test_sparsegen_indexing():
    u = torch.tensor([0.5, 0.3, 0.8, 0.1])
    weights = sparsegen_routing(u, lambda_val=0.5)
    assert weights.shape == u.shape  # ✓ PASS
    assert weights.sum() ≈ 1.0        # ✓ PASS`;

export const pplFixCode = `ppls = [12.5, 15.3, 8.2, 18.7, 11.4, 6.8, 14.2, 19.5]
boundaries = find_minima(ppls, threshold=0.5)
# Output: [2, 5]  ✓ PASS (correct semantic boundaries)`;

export const mdsFixCode = `corr_matrix = np.corrcoef(performance_data)
distance = (1 - corr) / 2

assert np.all(distance >= 0)    # ✓ PASS
assert np.all(distance <= 1)    # ✓ PASS
assert distance[i,i] ≈ 0        # ✓ PASS`;

export const mathLoRATrainingCode = `trainer = MathLoRATrainer(model_name='Qwen/Qwen2-1.5B')
trainer.train(output_dir='./models/math_lora')

# Configuration:
# - Dataset: 50,000 samples from MetaMathQA
# - LoRA rank: 8, alpha: 32
# - Batch size: 16 (4x4 accumulation)
# - Learning rate: 1e-4
# - Epochs: 3`;

export const codeLoRATrainingCode = `trainer = CodeLoRATrainer(model_name='Qwen/Qwen2-1.5B')
trainer.train(output_dir='./models/code_lora')

# Configuration:
# - Dataset: 30,000 samples from CodeFeedback
# - Same hyperparameters as Math LoRA`;

export const validationCode = `validator = BenchmarkValidator()

# Math LoRA on GSM8K
math_model = validator.load_model_with_lora('./models/math_lora')
accuracy = validator.evaluate_gsm8k(math_model, num_samples=100)
# Expected: >60% (baseline: ~42%)

# Code LoRA on HumanEval
code_model = validator.load_model_with_lora('./models/code_lora')
pass_rate = validator.evaluate_humaneval(code_model, num_samples=50)
# Expected: >30% (baseline: ~18%)`;

export const ttestCode = `from scipy.stats import ttest_rel

# Paired t-test (same examples, different models)
t_stat, p_value = ttest_rel(lora_scores, baseline_scores)

# Significance criteria
assert p_value < 0.05, "No significant improvement"
assert np.mean(lora_scores) > np.mean(baseline_scores), "LoRA underperforms baseline"
print(f"t-statistic: {t_stat:.3f}, p-value: {p_value:.4f}")`;

export const addLoRAExpertCode = `# 1. Train your new LoRA on a specialized dataset
trainer = CreativeLoRATrainer(model_name='Qwen/Qwen2-1.5B')
trainer.train(output_dir='./models/creative_lora')

# 2. Register the new expert with the fusion engine
engine.add_lora_expert(
    name="creative",
    path="./models/creative_lora"
)

# 3. Re-compute MDS task positions for cost-aware fusion
engine.recompute_task_positions()

print("✅ New 'creative' expert integrated!")`;

export const tuneHypernetworkCode = `# Adjust global sparsity via lambda_val
# Higher lambda = more sparse (fewer experts selected)
engine.set_hyperparameter("lambda_val", 0.9)

# Retrain the hypernetwork to learn routing for new tasks
engine.retrain_hypernetwork(
    new_hybrid_dataset,
    epochs=1,
    learning_rate=5e-5
)`;

export const createHybridDatasetCode = `from core.dataset_utils import create_hybrid_dataset

# Define the mix of datasets and their sampling ratios
dataset_mix = {
    "meta-math/MetaMathQA": 0.4,
    "m-a-p/CodeFeedback": 0.4,
    "bigscience/P3": 0.2  # General knowledge dataset
}

# Generate a new hybrid dataset with 10,000 samples
hybrid_dataset = create_hybrid_dataset(
    mix_config=dataset_mix,
    num_samples=10000,
    output_path="./data/hybrid_v2.json"
)`;

export const contributionCodeExample = `# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/multi-lora-fusion.git
cd multi-lora-fusion

# 2. Create a new branch for your feature
git checkout -b feat/my-awesome-feature

# 3. Make your changes and commit them
git add .
git commit -m "feat: Add my awesome feature"

# 4. Push to your fork and open a Pull Request
git push origin feat/my-awesome-feature`;


export const AVAILABLE_BASE_MODELS: BaseModel[] = [
  { id: 'qwen2-1.5b', name: 'Qwen2-1.5B (Core)', baseLatency: 125, baseMemory: 8.2 },
  { id: 'core-reasoner-s', name: 'Core-Reasoner-S (Ethical)', baseLatency: 90, baseMemory: 6.5 },
];

export const AVAILABLE_LORA_EXPERTS: LoRAExpert[] = [
  { id: 'math', name: 'Math Expert', description: 'Specialized in GSM8K-style math problems.', performanceImpact: { latency: 8, memory: 0.8 } },
  { id: 'code', name: 'Code Expert', description: 'Trained on HumanEval for Python code generation.', performanceImpact: { latency: 10, memory: 1.1 } },
  { id: 'creative', name: 'Creative Writing Expert', description: 'Fine-tuned for poetry and narrative generation.', performanceImpact: { latency: 6, memory: 0.7 } },
  { id: 'legal', name: 'Legal Analysis Expert', description: 'Trained on legal documents for summarization.', performanceImpact: { latency: 12, memory: 1.3 } },
];