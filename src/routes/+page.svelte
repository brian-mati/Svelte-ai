<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade, fly } from 'svelte/transition';
    import type { PageProps } from './$types';

let { data, form }: PageProps = $props();
</script>

<form method="post" class="max-w-lg mx-auto mt-4 flex flex-col items-center justify-center gap-4" use:enhance>
    {#if form?.success}
    <p in:fly={{ x:200,duration:200 }} out:fade>
         Submitted successfully
    </p>
	
    {/if}

    {#if form?.success == false }
        wupps...smth went bad ....really really bad
    {/if }
    <textarea name="question" class="w-full bg-gray-300"></textarea>
    <button class="bg-black text-white w-full py-2" >Submit</button>
</form>