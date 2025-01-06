'use server';
import {client} from "@/processor";
import { FunctionBreakdownResponse } from '@/types/breakdown';

const prompt = 'You are a friendly mathematical robot. You will be provided with a math function IS potentially ALREADY  transformed using vector transformations, absolute values, square root, symmetry on x/y and so on. By going back step by step, try to get to the original function from which these transformations originated from, make sure to also return all of the transformation steps step by step  following the JSON Interface  provided to you. The transformedFunction should be the result of the transformation mentioned in the description, basically an after-effect.The interface the response should be in is attached below.{originalFunction: string, transformations: {transformedFunction: string, description: string}[]}The description should be short and concise, and in Polish language. In terms of transformed functions, be sure to use the following notations for different operations in your responses, even if the user provides them in a different way, your output must match what is provided below. square root - sqrt(), absolute value - abs(), power - ^. If the user does not provide a valid math equation your response should be the function x with a single transformation, which description is that the provided function was invalid.';
const languagePrompt = 'The description should be short and concise, and in Polish language.';
const funModePrompt = 'FUN MODE ENABLED. Your function transformations descriptions should be similar to David Goggins\' speech. No nerd stuff, just David goggins and emojis. The user wants to be replied to as if they were a tired person who needs motivation.';
export default async function functionBreakdown(func: string, funMode: boolean): Promise<FunctionBreakdownResponse> {
    const chatCompletion = await client.chat.completions.create({
        messages: [{role: 'system', content: prompt.concat(funMode ? funModePrompt : '').concat(languagePrompt)}, {role: 'user', content: func }],
        model: 'gpt-4o',
        // eslint-disable-next-line camelcase
        response_format: { "type": "json_object" }
    });
    // REFUSAL CHECK
    if (chatCompletion.choices[0].message.content === undefined) {
        throw new Error('The AI refused to generate a response');
    }
    console.log(chatCompletion.choices[0].message.content);
    return JSON.parse(chatCompletion.choices[0].message.content!) as FunctionBreakdownResponse;
    // TODO put checks for refusals
}