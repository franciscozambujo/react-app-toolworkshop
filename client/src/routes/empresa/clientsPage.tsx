import { DataTableC } from "@/components/empresa/dataTable-clients";
import { SideBarEnterprise } from "@/components/empresa/sidebar-enterprise";

export function ClientsPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex">
          <aside>
              <SideBarEnterprise/>
          </aside>
          <main className="bg-[#181818] w-screen text-white font-bodyfooter">
              <h1>Clientes</h1>
              <DataTableC/>
          </main>
      </div>
  </div>
  )
}
