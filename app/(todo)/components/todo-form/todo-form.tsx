"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input" 
import { useToast } from "@/components/ui/use-toast"

const todoFormSchema = z.object({
  label: z.string().min(2).max(50),
})

const TodoForm = () => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof todoFormSchema>>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            label: "",
        },
    })
    
    function onSubmit(values: z.infer<typeof todoFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        form.reset();
        toast({
            title: "Todo added:",
            description: values.label,
        })
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
      )
}

export default TodoForm;