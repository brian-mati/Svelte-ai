<script lang="ts">
    // import { chatClient } from "$lib/mistral/entry-point";
    import { Mistral } from '@mistralai/mistralai';
    const apiKey = "1s8dsxrHe6q1RKx690Il3oAiTEy129IR";
if (!apiKey) {
	ReferenceError('Missing key');
}
let responses = $state([''])
let question = $state('')
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
	return response.choices[0].message.content;
}

    function addItems(el:any){
          responses.push(el)
    }
  
    async function onclick(){
        console.info(question)
        if (question == ''){
            return
        }
       let result = await chatClient(question)
      addItems(result)
       

    }

</script>


<section class="w-sm mx-auto mt-8">
    {#each responses as response }
        <p> {response} </p>
    {/each }
    <input type="text" class="bg-gray-400 w-full mb-4 h-8" bind:value={question}>
    <button class="bg-black text-white w-full text-center h-8" {onclick}>Submit</button>
</section>

