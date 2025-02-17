import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "."
import { type FormValueType } from "@/interface/menu"

export function MenuForm({ form, onSubmit }: {
    form: UseFormReturn<FormValueType>,
    onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>
}) {
    const action = form.getValues('actionType')

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-4">
                <FormField
                    control={form.control}
                    name="parentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-600 font-normal">Menu ID</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value ?? ""}
                                    className="bg-gray-50 border-0 rounded-lg h-12 text-gray-900"
                                    readOnly
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="depth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-600 font-normal">Depth</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="bg-gray-50 border-0 w-80 rounded-lg h-12 text-gray-900"
                                    readOnly
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-600 font-normal">Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="bg-gray-50 border-0 w-80 rounded-lg h-12 text-gray-900"
                                    placeholder="Menu name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-80 h-12 bg-[#253BFF] hover:bg-[#4338CA] text-white text-lg rounded-full mt-6"
                >
                    {action === 'edit' ? 'Update' : 'Save'}
                </Button>
            </form>
        </Form>
    )
}