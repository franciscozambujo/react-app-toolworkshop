import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { LogIn, Users, KeyRound, ArrowLeftToLine } from "lucide-react"
import credentialsData from "@/users.json"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from "react"

const UsersSchema = z.object({
  user: z.string(),
  pass: z.string(),
});

type usersSchema = z.infer<typeof UsersSchema>;

export function UsersLogin() {
  const { register, handleSubmit } = useForm<usersSchema>({
    resolver: zodResolver(UsersSchema),
  });
  const [open, setOpen] = React.useState(false);

  function HandleUserLogin(data: usersSchema) {
    const matchingUser = credentialsData.find(
      (user) => user.user === data.user && user.pass === data.pass
    );

    if (matchingUser) {
      localStorage.setItem('isLoggedIn', 'true');
      console.log("Login efetuado com sucesso!");
      setOpen(false);

      if (matchingUser.permission === "dono") {
        window.location.href = "owner.html";
      } else {
        window.location.href = "employee.html";
      }
    } else {
      localStorage.setItem('isLoggedIn', 'false');
      console.log("Nome de usuário ou senha inválidos");
      setOpen(true);
    }
  }
  function handleCloseDialog() {
    setOpen(false);
  }
  return (
    <main className="bg-gradient-to-t from-gray-900 to-gray-500">
      <button
        className="absolute ml-4 top-3 text-white"
        onClick={() => (window.location.href = "../index.html")}
      >
        <ArrowLeftToLine className="size-8 hover:bg-gray-600 rounded" />
      </button>
      <div className="h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(HandleUserLogin)}
          className="flex flex-col gap-4 mx-auto px-4 py-8 md:w1/2 bg-orange-100 rounded-lg justify-center"
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-black">
            Log-In
          </h2>
          <div className="flex items-center">
            <Users className="size-5 mr-2 text-black" />
            <Input
              placeholder="UserName"
              id="userType"
              {...register("user")}
              className="flex-1 border-2 border-black text-black"
            />
          </div>
          <div className="flex items-center mt-4 ">
            <KeyRound className="size-5 mr-2 text-black" />
            <Input
              type="password"
              placeholder="Password"
              {...register("pass")}
              className="flex-1 border-2 border-black text-black"
            />
          </div>
          <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
              <Button
                type="submit"
                variant="link"
                className="bg-lime-600 hover:bg-lime-700 text-white font-bold ml-5 w-48 rounded-full mt-2"
              >
                <LogIn className="size-4 mr-2" /> Entrar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Credenciais Erradas!</AlertDialogTitle>
                <AlertDialogDescription>
                  Apenas funcionários desta empresa podem aceder à sua conta.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCloseDialog}>
                  Tentar Novamente
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </div>
    </main>
  );
}
