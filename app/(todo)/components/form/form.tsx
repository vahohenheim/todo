"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { createTodo } from "../../actions/create-todo";
import { Todo } from "../../todo.model";

const todoFormSchema = z.object({
	label: z.string().min(2).max(50)
});

const TodoForm = () => {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof todoFormSchema>>({
		resolver: zodResolver(todoFormSchema),
		defaultValues: {
			label: ""
		}
	});

	const handleAction = (formData: FormData) => {
        const todo: Todo = {
            label: formData.get('label') as string
        };
		createTodo(todo);
		form.reset();
		toast({
			title: "Todo added:",
			description: todo.label,
			duration: 1000
		});
	};

	return (
		<Form {...form}>
			<form action={handleAction} className="space-y-3">
				<FormField
					control={form.control}
					name="label"
					render={({ field }) => (
						<FormItem>
							<FormLabel>new todo</FormLabel>
							<FormControl>
								<Input placeholder="example..." {...field} />
							</FormControl>
							<FormDescription>
								Describe your action to do.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default TodoForm;
