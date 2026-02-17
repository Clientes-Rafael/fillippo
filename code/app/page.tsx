import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Gallery from "@/components/gallery"
import MenuWrapper from "@/components/MenuWrapper"
import IceCreamWrapper from "@/components/IceCreamWrapper"
import PhoneOrder from "@/components/phone-order"
import GoogleReviews from "@/components/google-reviews"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <MenuWrapper />
      <IceCreamWrapper />
      <Gallery />
      <About />
      <PhoneOrder />
      <GoogleReviews />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
