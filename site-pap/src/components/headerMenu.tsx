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

export function HeaderMenuNav() {
  const imgHeader = new URL("@/public/images/header_branco.png", import.meta.url).href;
  return (
    <div className="bg-transparent h-16 grid content-center font-bodyfooter text-white py-2 z-0">
      <button className="absolute max-w-xs max-h-xs -mt-6">
        <img src={imgHeader} className="" alt="Logotipo" onClick={() => (window.location.href = "../index.html")} />
      </button>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <button className="rounded-md hover:bg-background hover:text-black m-4 px-4 py-2 text-base font-normal">Início</button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-base font-normal">
              Quem Somos
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="bg-green-100 flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Conheça a nossa história
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Oficina de Reparação Automóvel com mais de 35 anos.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="#"
                  title="Porquê escolher a nossa oficina"
                  className="h-48"
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Doloribus, odio!
                  </p>
                </ListItem>
                <ListItem onClick={() => (window.location.href = "../contactPage.html")} title="Contacte-Nos">
                  <div className="grid grid-flow-col auto-cols-max mt-1">
                    <Phone className="size-5 mr-1" />
                    <p>266 707 212</p>
                  </div>
                  <div className="grid grid-flow-col auto-cols-max mt-2">
                    <Mail className="size-5 mr-1" />
                    <p>fernandofialho@gmail.com</p>
                  </div>
                </ListItem>
                <ListItem onClick={() => (window.location.href = "../contactPage.html")} title="Visite-Nos">
                  <div className="grid grid-flow-col auto-cols-max">
                    <MapPin className="size-5 -ml-0.5" />
                    <p>Évora</p>
                  </div>
                  <p>R. Armando Antunes da Silva 18, 7005-145 Horta do Bispo</p>
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="grid grid-flow-col auto-cols-max">
            <NavigationMenuTrigger className="bg-transparent text-base font-normal">
              Serviços
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-4">
                  <NavigationMenuLink asChild>
                    <a
                      className="bg-green-100 flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Serviços
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Accusantium, porro nam ullam debitis ratione,
                        eaque reiciendis sequi quas quos recusandae corrupti!
                        Quam debitis quasi accusamus harum autem odio
                        praesentium sed.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="#" title="Revisão Total">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Doloribus, odio!
                  </p>
                </ListItem>
                <ListItem href="#" title="Baterias">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Doloribus, odio!
                  </p>
                </ListItem>
                <ListItem href="#" title="Travagem e Suspensão">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Doloribus, odio!
                  </p>
                </ListItem>
                <ListItem href="#" title="Diagnóstico Auto">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Doloribus, odio!
                  </p>
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="text-lg hover:font-bold absolute left-auto right-6 m-2 ">
        <button
          className=""
          onClick={() => (window.location.href = "../login.html")}
        >
          Login
        </button>
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
