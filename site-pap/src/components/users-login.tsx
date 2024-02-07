import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { LogIn, Users, KeyRound, ArrowLeftToLine } from "lucide-react";

// Adicione a importação da função login
import usersJson from "@/components/users.json";

const UsersSchema = z.object({
  user: z.string(),
  pass: z.string(),
  tipoUsuario: z.enum(["empregado", "dono"]),
});

type usersSchema = z.infer<typeof UsersSchema>;

export function UsersLogin() {
  const { register, handleSubmit } = useForm<usersSchema>({
    resolver: zodResolver(UsersSchema),
});

function HandleUserLogin(data: usersSchema) {
    const isLoggedIn = login(data.user, data.pass, data.tipoUsuario); // Passe o tipoUsuario para a função login

    if (isLoggedIn) {
    console.log("acertou")
    } else {
    console.log("errado")
    }
}

  return (
    <main className="bg-gradient-to-t from-gray-900 to-gray-500">
        <button 
            className="absolute ml-4 top-3 text-white"onClick={() => window.location.href = "../index.html"}>
            <ArrowLeftToLine className="size-8"/>
        </button>
      <div className="h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit(HandleUserLogin)} className="flex flex-col gap-4 mx-auto px-4 py-8 md:w1/2 bg-orange-100 rounded-lg justify-center">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Log-In</h2>
            <div className="flex items-center">
                <Users className="size-5 mr-2 text-black" />
                <Input placeholder="UserName" {...register('user')} className="flex-1 border-2 border-black text-black" />
            </div>
            <div className="flex items-center mt-4 ">
                <KeyRound className="size-5 mr-2 text-black" />
                <Input type="password" placeholder="PassWord" {...register('pass')} className="flex-1 border-2 border-black text-black" />
            </div>
          <div className="flex items-center mt-4">
            <label htmlFor="tipoUsuario">Tipo de usuário:</label>
            <select id="tipoUsuario" {...register("tipoUsuario")}>
              <option value="empregado">Empregado</option>
              <option value="dono">Dono</option>
            </select>
          </div>
        <Button type="submit" variant="link" className="bg-lime-600 hover:bg-lime-700 text-white font-bold ml-5 w-48 rounded-full mt-2">
            <LogIn className="size-4 mr-2" /> Entrar
       </Button>
        </form>
      </div>
    </main>
  );
}