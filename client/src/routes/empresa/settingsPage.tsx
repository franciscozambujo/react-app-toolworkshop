import { SettingsAccountMain } from "@/components/empresa/accountSettings";
import { Redirect } from "@/data/Redirect";

export function SettingsPage() {
  return (
    <div>
      <Redirect/>
      <SettingsAccountMain/>
    </div>
  )
}
