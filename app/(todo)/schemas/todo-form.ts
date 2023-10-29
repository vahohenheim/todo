import { z } from 'zod';

export const todoFormSchema = z.object({
	label: z.string().min(2).max(50)
});