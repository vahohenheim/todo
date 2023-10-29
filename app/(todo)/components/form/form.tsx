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
import { TodoFormComponentProps } from "./form.model";
import { todoFormSchema } from "../../schemas/todo-form";
import { TODO_FORM_DEFAULT_VALUES } from "./form.constants";
import { useToast } from "@/components/ui/use-toast";
import { useFormStatus } from "react-dom";

const TodoFormComponent = ({ onAdd }: TodoFormComponentProps) => {
	const { pending } = useFormStatus();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof todoFormSchema>>({
		resolver: zodResolver(todoFormSchema),
		defaultValues: TODO_FORM_DEFAULT_VALUES,
		mode: "onBlur"
	});

	const handleAction = async (formData: FormData) => {
		await onAdd(formData, form);
		toast({
			title: "Todo added:",
			description: formData.get("label") as string,
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
				<Button
					disabled={
						pending ||
						!form.control.getFieldState("label").isDirty ||
						form.control.getFieldState("label").invalid
					}
					type="submit"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default TodoFormComponent;
