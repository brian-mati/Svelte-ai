<script lang="ts">
    // import { chatClient } from "$lib/mistral/entry-point";
    import { Mistral } from '@mistralai/mistralai';
if (!apiKey) {
	ReferenceError('Missing key');
}

const mistral = new Mistral({ apiKey: apiKey });

 async function chatClient(request: string) {
	const response = await mistral.chat.complete({
		model: 'mistral-small-latest',
		messages: [
			{
				content: request,
				role: 'user'
			}
		]
	});
	console.info(response.choices[0].message.content);
	return response;
}


    let question = $state('')
    function onclick(){
        console.info(question)
        if (question == ''){
            return
        }
        chatClient(question)
    }

</script>


<section class="w-sm mx-auto mt-8">
    <input type="text" class="bg-gray-400 w-full mb-4 h-8" bind:value={question}>
    <button class="bg-black text-white w-full text-center h-8" {onclick}>Submit</button>
</section>

