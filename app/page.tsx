import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatusPanel from "@/components/StatusPanel";
import About from "@/components/About";
import Archive from "@/components/Archive";
import Transmission from "@/components/Transmission";
import Participation from "@/components/Participation";
import Footer from "@/components/Footer";
export default function Home() {
  return (<>
    <Nav />
    <main id="main"><Hero /><StatusPanel /><About /><Archive /><Transmission /><Participation /></main>
    <Footer />
  </>);
}
