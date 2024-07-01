import { ClientsAreaMain } from "@/components/cliente/ClientsAreaMain";
import { SideBarClients } from "@/components/cliente/sidebar-clients";
import { Redirect } from "@/data/Redirect";

export function ClientsArea () {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex h-full">
        <Redirect/>
          <aside>
              <SideBarClients/>
          </aside>
          <main className="bg-[#181818] w-screen text-white font-bodyfooter">
            <div>
              <ClientsAreaMain/>
            </div>
          </main>
      </div>
  </div>
  );
};