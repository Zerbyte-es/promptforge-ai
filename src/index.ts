import { Hono } from 'hono';

const app = new Hono();

// API route to generate/refine prompts dynamically
app.post('/api/generate', async (c) => {
  try {
    const { category, idea, style, detailLevel } = await c.req.json();

    if (!idea) {
      return c.json({ error: 'Please provide a core idea or topic.' }, 400);
    }

    // Simulated expert prompt engineering intelligence
    // In production, you can swap this block out with a real LLM call (e.g., Workers AI / OpenAI API)
    let optimizedPrompt = '';
    let negativePrompt = '';
    let tips: string[] = [];

    switch (category) {
      case 'image':
        optimizedPrompt = `Cinematic macro photography of ${idea}, ${style || 'hyper-realistic, dramatic studio lighting'}, 8k resolution, photorealistic details, volumetric lighting, unreal engine 5 render, award-winning photography --ar 16:9 --v 6.0`;
        negativePrompt = 'blurry, low quality, deformed, extra limbs, bad anatomy, watermark, text';
        tips = [
          'Use aspect ratio flags like `--ar 16:9` for cinematic widths in Midjourney.',
          'Adjust lighting descriptors depending on the time of day you want to evoke.'
        ];
        break;

      case 'video':
        optimizedPrompt = `Smooth tracking camera movement shot of ${idea}. Cinematic pacing, high production value, professional color grading, seamless motion, ${style || 'photorealistic 4K cinematic style'}.`;
        negativePrompt = 'jerky motion, flickering, morphing, unstable frame rate, low resolution';
        tips = [
          'Keep movement descriptions clear (e.g., "slow drone pan", "push in") for tools like Sora or Runway.',
          'Specify the lighting mood early in the prompt.'
        ];
        break;

      case 'book':
        optimizedPrompt = `Act as an expert bestselling author and book outliner. Create a detailed, comprehensive chapter outline, narrative arc, and character development profile for a book about: "${idea}". Tone: ${style || 'Engaging, authoritative, and immersive'}. Detail level: ${detailLevel || 'Deep dive'}.`;
        negativePrompt = 'clichés, superficial summaries, generic filler text';
        tips = [
          'Feed this prompt into your LLM to generate chapter-by-chapter drafts.',
          'Specify your target audience in the idea box for even sharper results.'
        ];
        break;

      default:
        optimizedPrompt = `Expert-level prompt for: ${idea}. Style: ${style || 'Professional and structured'}.`;
        negativePrompt = 'incomplete data, low quality';
        tips = ['Be as specific as possible about your desired end format.'];
    }

    return c.json({
      success: true,
      category,
      optimizedPrompt,
      negativePrompt,
      tips
    });

  } catch (error) {
    return c.json({ error: 'Failed to process request.' }, 500);
  }
});

export default app;
