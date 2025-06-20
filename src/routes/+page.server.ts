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
		console.info({ 'resp-obj': model });
		// console.info({ 'resp-obj': model }, { 'chat-resp': answer.choices[0].message });
		const message = String(model?.choices[0].message.content);
		const answer = String(model?.choices[0].message.content);
		const returned_prompt_tokens = Number(model?.usage.promptTokens);
		const returned_completion_tokens = Number(model?.usage.completionTokens);
		const chat: Conversation = {
			question,
			response: answer,
			prompt_tokens: returned_prompt_tokens,
			completion_tokens: returned_completion_tokens
		};
		console.info({ message: message });
		if (message == undefined) {
			return { success: false };
		} else {
			const insertNewConversation = async (newConversation: Conversation) => {
				return db
					.insert(conversation)
					.values(newConversation)
					.returning({ insertedId: conversation.id });
			};
			console.info(await insertNewConversation(chat));

			return { success: true };
		}
	}
} satisfies Actions;
