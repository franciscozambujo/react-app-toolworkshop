import { CarChecksEnterprise } from "@/components/empresa/carChecks";
import { DataTableR } from "@/components/empresa/dataTable-repairs";
import { SideBarEnterprise } from "@/components/empresa/sidebar-enterprise";

export function RepairsPage(){
    return(
        <div className="h-screen flex flex-col">
        <div className="flex">
            <aside>
                <SideBarEnterprise/>
            </aside>
            <main className="bg-[#181818] w-screen text-white font-bodyfooter">
                <DataTableR/>
                <CarChecksEnterprise/>
            </main>
        </div>
    </div>
    )
}