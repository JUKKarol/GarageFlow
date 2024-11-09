import { Bell, Car, ChevronDown, Wrench, Users, House, ClipboardList, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const navItems = [
        {id: 1, name: "Dashboard", icon: House, href: "/admin/dashboard"},
        {id: 2, name: "Pracownicy", icon: Users, href: "/admin/employees"},
        {id: 3, name: "Wizyty", icon: ClipboardList, href: "/admin/visits"},
        {id: 4, name: "Auta", icon: Car, href: "/admin/cars"},
        {id: 5, name: "Finanse", icon: Landmark, href: "/admin/finances"},
    ]
    
    return (
        <div className={`flex min-h-screen bg-zinc-950`}>
            <aside className={`w-64 bg-zinc-900 p-6 shadow-md`}>
                <div className={`flex items-center mb-8`}>
                    <Wrench className={`w-8 h-8 text-blue-500 mr-2`} />
                    <h1 className={`text-2xl font-semibold text-white`}>GarageFlow</h1>
                </div>
                <nav>
                    {navItems.map((item) => ( 
                        <Button key={item.id} variant={`ghost`} className={`w-full justify-start mb-2 text-white hover:text-white hover:bg-zinc-800`}>
                            <item.icon className={`mr-2 h-4 w-4`} />
                            {item.name}
                        </Button>
                    ))}
                </nav>
            </aside>
            <main className={`flex-1 p-6`}>
                {children}
            </main>
        </div>
    );
}