import { z } from 'zod';

export const inputSchema = z.object({
	content: z.string().min(1)
});

export type InputSchema = typeof inputSchema;
