import OpenAI from 'openai';

export const client = new OpenAI({
  apiKey: process.env[process.env.OPENAI_API_KEY as string], // This is the default and can be omitted
});

