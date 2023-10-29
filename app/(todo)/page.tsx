import prisma from "@/db/db";
import { TodoComponent } from "./components/todo/todo";
import { Suspense } from "react";

export default async function Home() {
	const data = await prisma.todo.findMany();

	return (
		<div className="container mx-auto pt-12 pb-10 max-w-[720px]">
			<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
				Todo app
			</h1>
			<Suspense>
				<TodoComponent data={data} />
			</Suspense>
		</div>
	);
}
