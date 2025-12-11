import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Gallery from "@/components/gallery"
import MenuWrapper from "@/components/MenuWrapper"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Gallery />
      <MenuWrapper />
      <Footer />
    </main>
  )
}
