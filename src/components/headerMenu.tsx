import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Mail, MapPin, Phone } from "lucide-react"
import {Link } from "react-router-dom"

export function HeaderMenuNav() {
  const imgHeader = new URL("@/public/images/header_branco.png", import.meta.url).href;
  return (
    <div className="bg-transparent h-16 grid content-center font-bodyfooter text-white py-2 z-0">
      <Link className="absolute max-w-60 max-h-60 -mt-5" to ="/"><img src={imgHeader} alt="Logotipo"/></Link>
      <div className="text-lg hover:font-bold absolute left-auto right-6 m-2">
        <Link to = "/login">
            Login
        </Link>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-base font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
