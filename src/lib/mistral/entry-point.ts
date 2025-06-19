import { MISTRAL_API_KEY } from '$env/static/private';
import { Mistral } from '@mistralai/mistralai';

const apiKey = MISTRAL_API_KEY;
if (!apiKey) {
	ReferenceError('Missing key');
}

const mistral = new Mistral({ apiKey: apiKey });

export async function chatClient(request: string) {
	const response = await mistral.chat.complete({
		model: 'mistral-small-latest',
		messages: [
			{
				content: request,
				role: 'user'
			}
		]
	});
	console.info(response);
	return response;
}
