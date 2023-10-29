"use server";

import prisma from "@/db/db";
import { revalidatePath } from "next/cache";
import { Todo } from "@prisma/client";

export const createTodo = async (todo: Partial<Todo>) => {
    if(!todo.label) return;

    await prisma.todo.create({
        data: {
            label: todo.label
        }
    })

    revalidatePath('/')
}