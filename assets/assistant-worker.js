import { MODEL_ID, MODEL_RUNTIME, systemPrompt } from './assistant-core.mjs';
let engine;
self.onmessage = async ({ data }) => {
  try {
    if (data.type === 'load') {
      const { CreateMLCEngine } = await import(MODEL_RUNTIME);
      self.postMessage({ type: 'progress', value: 1 });
      engine = await CreateMLCEngine(MODEL_ID, {
        initProgressCallback: report => self.postMessage({ type: 'progress', value: Math.round(report.progress * 100) })
      });
      self.postMessage({ type: 'ready' });
    } else if (data.type === 'chat' && engine) {
      const messages = [{ role: 'system', content: systemPrompt(data.language) }, ...data.messages];
      const stream = await engine.chat.completions.create({ messages, max_tokens: 420, temperature: 0.4, stream: true });
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (text) self.postMessage({ type: 'token', text });
      }
      self.postMessage({ type: 'done' });
    }
  } catch (error) {
    console.warn('Browser AI could not complete the request:', error);
    self.postMessage({ type: 'error' });
  }
};
