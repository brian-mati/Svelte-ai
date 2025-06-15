<script lang="ts">
	import * as Chat from '$lib/components/ui/chat';
    import { Button, buttonVariants } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { InfoIcon, PhoneIcon, SendIcon, SmilePlusIcon, VideoIcon } from '@lucide/svelte';
	
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
