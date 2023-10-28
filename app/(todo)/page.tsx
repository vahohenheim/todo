import TodoDatatable from "./components/todo-datatable/todo-datatable"
import { TODO } from "./todo.constants";
import { Todo } from "./todo.model"
import styles from './page.module.css';
import { cn } from "@/utils";
import TodoForm from "./components/todo-form/todo-form";
import { TodoDatatableColumns } from "./components/todo-datatable/todo-datatable-columns";

async function getData(): Promise<Array<Todo>> {
  return TODO;
}

export default async function Home() {
  const data = await getData()

  return (
    <div className={cn("container mx-auto pt-12 pb-10", styles.container)}>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Todo app</h1>
      <div className="py-4">
        <TodoForm />
      </div>
      <div className="py-4">
        <TodoDatatable columns={TodoDatatableColumns} data={data} />
      </div>
    </div>
  )
}
