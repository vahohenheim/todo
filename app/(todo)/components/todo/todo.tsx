"use client";

import { Suspense, useOptimistic } from "react";
import { Todo } from "@prisma/client";
import { TodoComponentProps } from "./todo.model";
import { TodoFormRef } from "../form/form.model";
import { createTodo } from "../../actions/create-todo";
import TodoDatatableComponent from "../datatable/datatable";
import { TodoDatatableColumns } from "../datatable/columns";
import TodoFormComponent from "../form/form";

export const TodoComponent = ({ data }: TodoComponentProps) => {
	const [optimisticTodos, addOptimisticTodo] = useOptimistic(
		data,
		(state, newTodo: Todo) => {
			return [...state, { ...newTodo }];
		}
	);

	const handleTodoAdd = async (formData: FormData, form: TodoFormRef) => {
		const label = formData.get("label") as string;
		addOptimisticTodo({
			id: Math.random(),
			label: label
		});
		form.reset();
		await createTodo({ label });
	};

	return (
		<>
			<div className="py-4">
				<Suspense>
					<TodoFormComponent onAdd={handleTodoAdd} />
				</Suspense>
			</div>
			<div className="py-4">
				<Suspense>
					<TodoDatatableComponent
						columns={TodoDatatableColumns}
						data={optimisticTodos}
					/>
				</Suspense>
			</div>
		</>
	);
};
