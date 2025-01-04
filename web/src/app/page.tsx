import { Navbar } from "./_components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      <Navbar />
      <main className="flex flex-col justify-center flex-grow container mx-auto px-4 py-8 ">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-100">Witamy w Warsztacie GarageFlow</h2>
          <p className="text-xl text-gray-400">Twoje kompleksowe miejsce napraw i konserwacji samochodów</p>
        </section>

        <section id="services" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-gray-200">Nasze Usługi</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center hover:bg-gray-700 transition-colors">
              <span className="text-4xl mb-2 block">🚗</span>
              <p className="text-gray-300">Naprawy Ogólne</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center hover:bg-gray-700 transition-colors">
              <span className="text-4xl mb-2 block">🛢️</span>
              <p className="text-gray-300">Wymiana Oleju</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center hover:bg-gray-700 transition-colors">
              <span className="text-4xl mb-2 block">🔋</span>
              <p className="text-gray-300">Serwis Akumulatorów</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center hover:bg-gray-700 transition-colors">
              <span className="text-4xl mb-2 block">🚙</span>
              <p className="text-gray-300">Serwis Opon</p>
            </div>
          </div>
        </section>

        <section id="contact" className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-200">Skontaktuj się z Nami</h3>
          <p className="mb-4 text-gray-400">📞 Zadzwoń do nas: (123) 456-7890</p>
          <p className="mb-4 text-gray-400">📍 Odwiedź nas: ul. Samochodowa 123, Miasto Aut</p>
          <Button variant="outline" className="bg-gray-800 text-gray-100 hover:bg-gray-700">
            Umów Wizytę
          </Button>
        </section>
      </main>

      <footer className="bg-zinc-950 text-gray-400 py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 GarageFlow. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
}
