import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function ComboBoxCar(){
    return(
        <Popover>
            <PopoverTrigger>Abrir</PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandList>
                        <CommandGroup heading="Carros do cliente">
                        {Array.from({length: 3}).map((_, i ) =>{
                            return(
                                <div key= {i}>
                                    <CommandItem>Matricula {i}</CommandItem>
                                </div>
                            )
                        })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}