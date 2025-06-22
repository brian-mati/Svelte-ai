<script lang="ts">
        import type { PageProps } from './$types';
        import Input from '$lib/components/ui/input/input.svelte';

let { data, form }: PageProps = $props();
</script>

<form method="post" class="max-w-lg mx-auto mt-4 flex flex-col items-center justify-center gap-4">
    {#if form?.success}
	Submitted successfully
    {/if}

    {#if form?.success == false }
        wupps...smth went bad ....really really bad
    {/if }
    <!-- <textarea name="question" class="w-full bg-gray-300"></textarea> -->
    <Input name="question" />
    <button class="bg-black text-white w-full py-2" >Submit</button>
</form>