import { AllReviews } from "@/components/empresa/allReviews";
import { SideBarEnterprise } from "@/components/empresa/sidebar-enterprise";
import { Redirect } from "@/data/Redirect";

export function AllReviewsPage() {
  return (
    <div className="h-screen flex flex-col">
      <Redirect/>
      <div className="flex">
          <aside>
              <SideBarEnterprise/>
          </aside>
          <main className="bg-[#181818] w-screen text-white font-bodyfooter">
              <AllReviews/>
          </main>
      </div>
  </div>
  )
}
