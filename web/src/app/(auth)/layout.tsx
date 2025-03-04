import { Navbar } from "../_components/navbar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen w-full bg-black">
            <Navbar />
            {children}
            <footer className="bg-zinc-950 text-gray-400 py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 GarageFlow. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
        </div>
    );
}