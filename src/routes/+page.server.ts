import type { Actions } from './$types';
import { chatClient } from '$lib/mistral/entry-point';
import { db } from '$lib/server/db';
import { conversation, type Conversation } from '$lib/server/db/schema';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const question = String(data.get('question'));
		console.info(question);

		const model = await chatClient(question);
		if (!model || !model.choices || !model.choices[0] || !model.usage) {
			return { success: false, error: 'Failed to get AI response' };
		}
		console.info({ 'resp-obj': model });
		// console.info({ 'resp-obj': model }, { 'chat-resp': answer.choices[0].message });
		const answer = String(model?.choices[0].message.content);
		const returned_prompt_tokens = Number(model?.usage.promptTokens);
		const returned_completion_tokens = Number(model?.usage.completionTokens);
		if (isNaN(returned_completion_tokens) || isNaN(returned_prompt_tokens)) {
			console.warn('There was a type error');
			return { success: false };
		}
		const chat: Conversation = {
			question,
			response: answer,
			prompt_tokens: returned_prompt_tokens,
			completion_tokens: returned_completion_tokens
		};
		console.info({ message: answer });
		if (!answer) {
			return { success: false };
		} else {
			const insertNewConversation = async (newConversation: Conversation) => {
				try {
					return db
						.insert(conversation)
						.values(newConversation)
						.returning({ insertedId: conversation.id });
				} catch (error) {
					console.error('database insertion failed', error);
					throw error;
				}
			};
			console.info(await insertNewConversation(chat));

			return { success: true };
		}
	}
} satisfies Actions;
