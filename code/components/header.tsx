"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Inicio", href: "#home" },
  { name: "Nosotros", href: "#about" },
  { name: "Galería", href: "#gallery" },
  { name: "Menú", href: "#menu" },
  { name: "Contacto", href: "#footer" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (href: string) => {
    const id = href.substring(1)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Fillippo Heladería Logo"
            width={50}
            height={50}
            className="h-12 w-auto"
          />
          <span className="font-serif text-xl font-bold text-primary">Fillippo</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.name}
            </button>
          ))}
        </div>

        <button className="hidden md:inline-flex px-6 py-2 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:opacity-90 transition-opacity"
         onClick={() => scrollToSection("#footer")}
        >
          Visitanos
          
        </button>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="flex flex-col gap-4 p-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-left text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:opacity-90 transition-opacity mt-4"
            onClick={() => scrollToSection('#footer')}
  >
              Visitanos
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
