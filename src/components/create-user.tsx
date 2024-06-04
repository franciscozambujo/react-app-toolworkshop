import { Toaster, toast } from "sonner";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import * as bcrypt from 'bcryptjs';

export function CreateUser() {
  const API_URL = "http://localhost:3000";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = (event.target as HTMLFormElement).user.value;
    const FullName = (event.target as HTMLFormElement).FullName.value;
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    try {
      const searchResponse = await fetch(`${API_URL}/usersByemail?email=${encodeURIComponent(email)}`);

      if (!searchResponse.ok) {
        throw new Error(`Error searching for user: ${searchResponse.statusText}`);
      }
      const searchData = await searchResponse.json();
      if (searchData.length > 0) {
        toast.error('Este utilizador já existe.');
        return;
      }
    } catch (error) {
      console.error('Error searching for user:', error);
      return;
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const formData = { user, password: hashedPassword, FullName, email };

      fetch(`${API_URL}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          toast.success(`Utilizador criado com sucesso!`, {
            duration: 5000,
          });
          /*setTimeout(() => {
            window.location.href = '/login';
          }, 2000);*/
        })
        .catch((error) => console.error(`Error creating repair: ${error}`));
    } catch (error) {
      console.error('Error hashing password:', error);
      toast.error('Erro ao criar utilizador.'); // Handle error gracefully
    }
  }
  return ( 
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md flex flex-col p-4 rounded-md text-black font-bodyfooter">
            <div className="text-2xl font-bold mb-2 text-white text-center">Oficina Fernando Costa Fialho <span className="text-[#53AE6E]"><br />Área do Cliente</span></div>
            <div className="text-sm font-normal mb-4 text-center text-white">Crie agora a sua conta</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="block relative"> 
                  <label className="label-login">Nome de utilizador</label>
                  <input 
                    type="text" 
                    id="user" 
                    required 
                    placeholder="Ex: Fernando" 
                    className="input-login"
                  />
                  <label className="label-login mt-6">Primeiro e último nome</label>
                  <input 
                    type="text" 
                    id="FullName" 
                    required 
                    placeholder="Fernando Fialho" 
                    className="input-login"
                  />
                  <label className="label-login mt-6">Email</label>
                  <input 
                    type="text" 
                    id="email" 
                    required 
                    placeholder="Ex: fernando@gmail.com" 
                    className="input-login"
                  />

                  <label className="label-login mt-6">Password</label>
                  <input 
                    type="password" 
                    id="password"
                    required 
                    className="input-login"
                  />
                </div>
                <Button type="submit" className="bg-body w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
                 Criar
                </Button>            
            </form>
        <div className="text-sm text-center mt-[1.6rem] text-[#53AE6E]">Já tem uma conta? <Link to="/login"><a className="text-sm text-white">Inicie sessão aqui!</a></Link>
      </div>
    </div>
    <Toaster richColors/>
    </div>
   )
}