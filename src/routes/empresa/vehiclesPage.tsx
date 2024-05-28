import { SideBarEnterprise } from "@/components/empresa/sidebar-enterprise";

export function VehiclesPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex">
          <aside>
              <SideBarEnterprise/>
          </aside>
          <main className="bg-[#181818] w-screen text-white font-bodyfooter">
              <h1>Veículos</h1>
          </main>
      </div>
  </div>
  );
}
