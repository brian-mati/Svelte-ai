<script lang="ts">
	
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { SendIcon } from '@lucide/svelte';
	
</script>


	<form
	class="flex gap-4 items-center"
	>
		<Input  class="rounded-full" placeholder="Type a message..." />
		<Button
			type="submit"
			variant="default"
			size="icon"
			class="shrink-0 rounded-full"
		
		>
			<SendIcon />
		</Button>
	</form>
