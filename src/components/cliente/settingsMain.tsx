import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function SettingsClientAccountMain(){

    const handleSubmit = async (event:any) => {
        event.preventDefault();
    
        const formData = {
          user: (event.target as HTMLFormElement).user.value,
          password: (event.target as HTMLFormElement).password.value,
        };
      };
    return (
        <div>
            <div className="flex items-center justify-center">
                <div>
                    <form action="">

                    </form>
                    <form className="flex flex-col gap-3">
          <div className="block relative" onSubmit={handleSubmit}>
            <label className="label-login mt-6">Nome</label>
            <input
              type="text"
              id="name"
              className="input-login"
              required
            />
            <label className="label-login mt-6">Nrº telemóvel</label>
            <input
              type="number"
              id="phone"
              className="input-login"
              required
            /> 
          </div>
          <Button type="submit" className="bg-body w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
            Atualizar dados
          </Button>
        </form>
                </div>
                <div>
                </div>
            </div>

        </div>
    )
}