import { ResumeTemplate } from '@/components/resume/templates';
import { GeneratedResumeData } from '@/context/ResumeContext';
import Constants from 'expo-constants';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

async function callGeminiAPI(prompt: string): Promise<string> {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function generateResume(userData: any, template: ResumeTemplate): Promise<GeneratedResumeData> {
  const sections = template.sections.join(', ');
  const prompt = `You are a professional resume writer. Generate a complete, well-structured resume as a JSON object for the following person using the "${template.name}" template.

Template sections to include (in order): ${sections}

User Information:
${JSON.stringify(userData, null, 2)}

Instructions:
- Return ONLY a valid JSON object, no explanation or extra text.
- The JSON must have this exact structure: { "sections": [ { "title": "Section Name", "content": "Section content as plain text" } ] }
- Each section title must match one of the template sections.
- Content should be professional, concise, and suitable for an undergraduate or college graduate.
- Use bullet points (starting with "• ") for lists within content.
- Keep all text in the content field (do not use nested JSON).
- Do not wrap bullets in arrays, just use newlines with • prefix.`;

  const raw = await callGeminiAPI(prompt);
  // Strip markdown code fences if present
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);
  return parsed as GeneratedResumeData;
}

export async function getTemplateRecommendations(userData: any, jobField: string, templates: ResumeTemplate[]) {
	// prompt for Gemini
	const templateList = templates.map(t => `ID: ${t.id}, Name: ${t.name}, Description: ${t.description}`).join('\n');
	const prompt = `Given the following user information: ${JSON.stringify(userData)}\nTarget job/field: ${jobField}\nHere are available resume templates:\n${templateList}\nRecommend the 3 most suitable template IDs for this user and explain your choices.`;

	// Example response format
	return [
		{ id: 'classic', reason: 'Best for general entry-level jobs.' },
		{ id: 'modern', reason: 'Highlights skills for recent graduates.' },
		{ id: 'it', reason: 'Tailored for IT/CS graduates.' },
	];
}
