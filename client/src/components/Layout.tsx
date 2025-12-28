import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { MobileStickyCTA } from "./MobileStickyCTA";

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}


