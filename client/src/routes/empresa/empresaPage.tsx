import { OwnerGeralMain } from "@/components/empresa/ownerGeral";
import { SideBarEnterprise } from "@/components/empresa/sidebar-enterprise";
import {Redirect} from "@/data/Redirect";

export function EmpresaPage() {
  return (
    <div className="h-screen flex flex-col">
      <Redirect />
      <div className="flex h-screen">
          <aside>
              <SideBarEnterprise/>
          </aside>
          <main className="bg-[#181818] w-screen text-white font-bodyfooter">
              <OwnerGeralMain/>
          </main>
      </div>
  </div>
  );
}
