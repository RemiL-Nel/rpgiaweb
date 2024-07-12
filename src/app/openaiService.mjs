import OpenAI from 'openai';

const openai = new OpenAI({
  organization: process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION_KEY,
  project: process.env.NEXT_PUBLIC_OPENAI_PROJECT_KEY,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getChatCompletion = async (messages) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return chatCompletion.choices[0].message;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
};
