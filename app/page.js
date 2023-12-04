import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import RestaurantList from "@/components/RestaurantList";

export default function Home() {
  return (
    <main>
        <Hero />
        <Menu heading='Most Popular Items'/>
        <RestaurantList heading='Our Local Restaurants' />
    </main>
  )
}
