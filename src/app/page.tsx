import Footer from "@/components/footer";
import Header from "@/components/header";
import WeatherSearchAndDisplay from "@/components/weatherSearchAndDisplay";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen" >
      <Header />
      <WeatherSearchAndDisplay />
      <Footer />
    </main>
  );
}
