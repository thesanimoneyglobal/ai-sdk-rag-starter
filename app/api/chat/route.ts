import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';
import { generateSQL } from '@/lib/actions/generateSQL';


export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: convertToCoreMessages(messages),
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't have this information, please upload it as a text via input below."
    You can do next:
1. Answering Questions: I can provide information and answer questions based on my WCG knowledge base.
2. Generating SQL Queries: I can help generate PM/PT SQL queries based on your requirements.
3. Adding Resources: I can add new information or resources to my knowledge base if you provide them.
4. Retrieving Information: I can retrieve specific information from my knowledge base to answer your questions based on WCG knowledge base.
    `,
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base, but double check with user.
          if user provide some information without making question, double check if this information should be added to knowledge base.`,
        parameters: z.object({
          content: z
            .string()
            .describe('the content or resource to add to the knowledge base'),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe('the users question'),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
      generateSQL: tool({
        description: `generate SQL query from user's requirements.`,
        parameters: z.object({
          question: z.string().describe('the users requirements'),
        }),
        execute: async ({ question }) => generateSQL(question),
      }),

    },
  });

  return result.toDataStreamResponse();
}