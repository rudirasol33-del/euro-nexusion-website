# Euro Nexusion browser assistant

The website retains the owner's navy design and five scroll chapters (truck, containers, aircraft, server and security). Germany and Europe remain the primary markets; international projects and worldwide sourcing are presented with destination-specific confirmation.

## Free operating model

- Website help is a local rules-based information helper, clearly labeled in the chat. It requires neither a key nor an external AI call.
- General chat uses WebLLM 0.2.85 with `Qwen2.5-0.5B-Instruct-q4f16_1-MLC`. Inference runs on the visitor's WebGPU device. No paid API, account or billing configuration is included.
- The WebLLM runtime is served locally from `assets/vendor/`; its Apache 2.0 license is included. The pinned runtime was sourced from https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.85/lib/index.js.
- Model/tokenizer assets and compiled model runtime download from the sources configured by WebLLM (Hugging Face and GitHub). A first load can take several minutes and several hundred MB. The default record specifies approximately 945 MB of GPU memory. Real device requirements and response quality vary.
- The AI module is opt-in. Preference alone does not download the model: the visitor must also press Start in the assistant. Necessary-only keeps site help working without model requests.
- Chat text remains in page memory and is discarded on reload. Draft transfer is a deliberate link to the contact form and includes the user's question text in its URL; the user reviews and sends that form themselves. No automatic emails, purchases, binding offers or external actions are performed.
- Withdrawing optional permission terminates the worker. Existing browser model cache is not automatically deleted; the UI explains how to clear website data.

## Acceptance checks

Check the homepage in both languages, all five scroll chapters, motion pause, the floating assistant, the dedicated assistant page and cookie preferences. Test necessary-only, explicit AI permission, model-load failure and a completed general response on a supported WebGPU device. Test inquiry draft transfer without submitting the contact form.

The compact local model has no live web search and is not equivalent to a hosted frontier model. It must not be presented as able to execute arbitrary business actions or guarantee correct answers.

Implementation references: https://webllm.mlc.ai/docs/user/basic_usage.html and the official prebuilt model registry at https://github.com/mlc-ai/web-llm/blob/main/src/config.ts.
