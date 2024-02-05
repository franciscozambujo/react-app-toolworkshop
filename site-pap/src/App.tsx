import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import * as React from "react";
import { cn } from "@/lib/utils";

const images = [
  { src: "../img/slides/1.jpg", alt: "Carro" },
  { src: "../img/slides/2.jpg", alt: "Motor" },
  { src: "../img/slides/3.jpg", alt: "Mecânico" },
];

export function App() {
  return (
    <header>
        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Quem Somos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/">
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Conheça a nossa história
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Oficina de Reparação Automóvel com mais de 35 anos.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="#" title="Porquê escolher a nossa oficina">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odio!</p>
                  </ListItem>
                  <ListItem href="#" title="Contacte-nos">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odio!</p>
                  </ListItem>
                  <ListItem href="#" title="Visite-Nos">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odio!</p>
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/">
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Serviços
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, porro nam ullam debitis ratione, eaque reiciendis sequi quas quos recusandae corrupti! Quam debitis quasi accusamus harum autem odio praesentium sed.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="#" title="Revisão Total">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odio!</p>
                    </ListItem>
                    <ListItem href="#" title="Revisão Ante-Inspeção">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odio!</p>
                    </ListItem>
                    <ListItem href="#" title="Serviço 3">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, odio!</p>
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <button 
        className="absolute top-1 right-5 h-10 w-15 mb-2 mt-2 font-medium" onClick={() => window.location.href = "../login.html"}>
          Login
        </button>
    </header>
  )
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
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"