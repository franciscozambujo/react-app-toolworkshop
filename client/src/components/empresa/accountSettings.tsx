import { SideBarEnterprise } from "./sidebar-enterprise";

export function SettingsAccountMain(){
    return (
        <div className="h-screen flex flex-col">
            <div className="flex">
                <aside>
                    <SideBarEnterprise/>
                </aside>
                <main className="bg-[#181818] w-screen text-white font-bodyfooter">
                    <h1>Definições de conta</h1>
                </main>
            </div>
        </div>
    )
}