import { AllReviews } from "@/components/empresa/allReviews";
import {AllUsers} from "@/components/empresa/allUsers";
import { SideBarEnterprise } from "@/components/empresa/sidebar-enterprise";
import { Redirect } from "@/data/Redirect";

export function AllUsersPage() {
  return (
    <div className="h-screen flex flex-col">
      <Redirect/>
      <div className="flex">
          <aside>
              <SideBarEnterprise/>
          </aside>
          <main className="bg-[#181818] w-screen text-white font-bodyfooter">
              <AllUsers/>
              <AllReviews/>
          </main>
      </div>
  </div>
  )
}
