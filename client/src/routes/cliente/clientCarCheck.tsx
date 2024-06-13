import { CarCheck } from "@/components/cliente/carCheck";
import { SideBarClients } from "@/components/cliente/sidebar-clients";
import { Redirect } from "@/data/Redirect";

export function ClientCarCheck () {
  return (
    <div className="h-screen flex flex-col">
      <Redirect/>
      <div className="flex">
          <aside>
              <SideBarClients/>
          </aside>
          <main className="bg-[#181818] w-screen text-white font-bodyfooter">
              <CarCheck/>
          </main>
      </div>
  </div>
  );
};