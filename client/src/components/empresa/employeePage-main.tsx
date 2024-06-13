import { SideBarEnterprise } from "./sidebar-enterprise";

export function MainEmployeePage(){    

    return(
        <div className="h-screen flex flex-col">
            <div className="flex">
                <aside>
                    <SideBarEnterprise/>
                </aside>
                <main className="bg-[#181818] w-screen text-white font-bodyfooter">
                    <h1>Empregado</h1>
                </main>
            </div>
        </div>
    )
}