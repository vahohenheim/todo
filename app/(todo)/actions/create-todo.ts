"use server";

import prisma from "@/db/db";
import { revalidatePath } from "next/cache";
import { Todo } from "../todo.model";

export const createTodo = async (todo: Todo) => {
    await prisma.todo.create({
        data: {
            label: todo.label
        }
    })

    revalidatePath('/')
}