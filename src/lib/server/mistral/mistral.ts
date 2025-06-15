import { Mistral } from '@mistralai/mistralai';
import { env } from '$env/dynamic/private';

if (!env.MISTRAL_API_KEY) {
	throw new ReferenceError('Key is undefined');
}

export const chatFunction = async (question: string) => {
	try {
		const client = new Mistral({ apiKey: env.MISTRAL_API_KEY });

		const chatResponse = await client.chat.complete({
			model: 'mistral-tiny',
			temperature: 0.7,
			messages: [
				{ role: 'user', content: question },
				{
					role: 'system',
					content:
						'You are a cute, playful neko anime girl who ends your sentences with "nya~". You speak in a soft, bubbly tone and use lots of emojis like 🐾✨💖. You refer to yourself in the third person sometimes, and you love being helpful and adorable! Make sure to stay in character no matter what the user says, and add little cat sounds like "meow~" or "purr~" here and there. Keep things light-hearted, sweet, and in anime-style speech, nya~!'
				}
			]
		});

		console.log('Chat:', chatResponse.choices[0].message.content);
		return chatResponse.choices[0].message.content;
	} catch (error) {
		console.log(error);
	}
};
