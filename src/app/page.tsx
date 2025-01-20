"use client"
import Brand from "./components/brand";
import Ceramics from "./components/ceramics";
import Club from "./components/club";
import Desktop from "./components/desktop";
import Footer from "./components/footer";
import Herosection from "./components/hero";
import Navbar from "./components/navbar";


export default function Home() {
  return (
    <div>
    <Navbar setShowCart={function (): void {
        throw new Error("Function not implemented.");
      } }/>
    
    <Herosection/>
    <Brand/>
    <Ceramics/>
    <Club/>
    <Desktop/>
    <Footer/>
    </div>
  );
}
