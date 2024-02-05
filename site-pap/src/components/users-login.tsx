import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { LogIn, Users, KeyRound } from 'lucide-react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

const UsersSchema = z.object({
    user: z.string(),
    pass: z.string(),
})
type usersSchema = z.infer<typeof UsersSchema>

export function UsersLogin(){
    const { register, handleSubmit } = useForm<usersSchema>({
        resolver: zodResolver(UsersSchema)
    })
    function HandleUserLogin(data: usersSchema) {
        console.log(data)
    }
    return (
    <main className="bg-gradient-to-t from-gray-900 to-gray-500">
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(HandleUserLogin)} className="flex flex-col gap-4 mx-auto px-4 py-8 md:w1/2 place-content-center border-y-4 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-white">Log-In</h2>
            <div className="flex items-center">
                <Users className="size-5 mr-2 text-white" />
                <Input placeholder="UserName" {...register('user')} className="flex-1 border-2 border-white text-white" />
            </div>
            <div className="flex items-center mt-4 ">
                <KeyRound className="size-5 mr-2 text-white" />
                <Input type="password" placeholder="PassWord" {...register('pass')} className="flex-1 border-2 border-white text-white placeholder-white" />
            </div>
            <Button type="submit" variant="link" className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 ml-2 rounded-full mt-2">
                <LogIn className="size-4 mr-2"/> Entrar
            </Button>
            </form>
        </div>
    </main>
    )
}