import { UseFormReturn } from "react-hook-form";

export type TodoFormComponentProps = {
	onAdd: (
		formData: FormData,
		form: TodoFormRef
	) => Promise<void>;
}

export type TodoFormRef = UseFormReturn<{ label: string }, unknown, undefined>