import Navbar from "./components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "Pokedex App",
  description: "Pokedex Application that performs CRUD functions for Pokemons.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
