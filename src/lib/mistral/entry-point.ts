import { MISTRAL_API_KEY } from '$env/static/private';
import { Mistral } from '@mistralai/mistralai';
import { HTTPValidationError, SDKValidationError } from '@mistralai/mistralai/models/errors';

const apiKey = MISTRAL_API_KEY;
if (!apiKey) {
	ReferenceError('Missing key');
}

const mistral = new Mistral({ apiKey: apiKey });

export async function chatClient(request: string) {
	try {
		const response = await mistral.chat.complete({
			model: 'mistral-small-latest',
			temperature: 0.7,
			// randomSeed: 0.7,
			messages: [
				{
					content: request,
					role: 'user'
				}
			]
		});
		return response;
	} catch (error) {
		switch (true) {
			case error instanceof SDKValidationError: {
				console.error(
					{ 'pretty-error': error.pretty() },
					{
						'raw-error': {
							name: error.name,
							message: error.message,
							value: error.rawValue
						}
					}
				);

				return;
			}

			case error instanceof HTTPValidationError: {
				console.error(
					{ 'error-data': error.data$ },
					{ errors: { cause: error.cause, message: error.message } }
				);
				return;
			}
			case error instanceof TypeError: {
				console.error(error);
				return;
			}
			default: {
				throw error;
			}
		}
	}

	// console.info({ 'resp-obj': response }, { 'chat-resp': response.choices[0].message });
}
