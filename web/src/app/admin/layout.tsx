'use client'

import { Car, Wrench, Users, House, ClipboardList, Landmark, UserRoundCog, LogOut, Tags } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserCard from "../_components/dashboard/userCard"
import { usePathname } from "next/navigation"
import useAuthStore from "@/shared/stores/authStore"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Move all Hooks to the top
    const { user, logout } = useAuthStore()
    const pathname = usePathname()

    const navItems = [
        { id: 1, name: "Dashboard", icon: House, href: "/admin/dashboard" },
        { id: 2, name: "Pracownicy", icon: Users, href: "/admin/employees" },
        { id: 3, name: "Wizyty", icon: ClipboardList, href: "/admin/appointments" },
        { id: 4, name: "Auta", icon: Car, href: "/admin/cars" },
        { id: 5, name: "Modele i marki", icon: Tags, href: "/admin/brands" },
        { id: 6, name: "Finanse", icon: Landmark, href: "/admin/finances" },
        { id: 7, name: "Ustawienia", icon: UserRoundCog, href: "/admin/settings" },
    ]

    if (!user) {
        return null
    }

    return (
        <div className={`flex min-h-screen bg-background`}>
            <aside className={`w-72 bg-foreground p-6 border-r border-[#191919]`}>
                <div className={`flex items-center mb-8`}>
                    <Wrench className={`w-8 h-8 text-primary mr-2`} />
                    <h1 className={`text-2xl font-semibold text-white`}>GarageFlow</h1>
                </div>
                <UserCard />
                <nav>
                    {navItems.map((item) => (
                        <Link key={item.id} href={item.href}>
                            <Button
                                key={item.id}
                                variant={`ghost`}
                                className={`w-full justify-start mb-2 text-white hover:text-white hover:bg-zinc-900 text-md ${item.href === pathname ? 'text-primary bg-zinc-900' : ''}`}
                            >
                                <item.icon className={`mr-2 h-4 w-4`} />
                                {item.name}
                            </Button>
                        </Link>
                    ))}
                    <Button
                        variant={`ghost`}
                        className={`w-full justify-start mb-2 text-white hover:text-white hover:bg-zinc-900 text-md`}
                        onClick={logout}
                    >
                        <LogOut className={`mr-2 h-4 w-4`} />
                        Wyloguj
                    </Button>
                </nav>
            </aside>
            <main className={`flex-1 p-6`}>
                {children}
            </main>
        </div>
    )
}