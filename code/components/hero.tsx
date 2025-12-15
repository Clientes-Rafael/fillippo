"use client"

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/images/5.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8 inline-block animate-fade-in">
          <span className="text-sm text-white/90 tracking-[0.3em] uppercase font-semibold">Heladería Artesanal</span>
        </div>

        <h1 className="font-serif text-6xl md:text-8xl font-bold mb-8 text-white text-balance drop-shadow-2xl animate-fade-in">
          Fillippo
        </h1>

        <p className="text-2xl md:text-3xl text-white mb-6 font-serif italic tracking-wide animate-fade-in">
            Una experiencia llena de sabor y naturaleza
        </p>

        <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
        Visitanos y descubrí la magia de nuestro espacio y nuestros helados
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <button
            onClick={() => scrollToSection("menu")}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-sm font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Ver Menú
          </button>
          <button
            onClick={() => scrollToSection("phone-order")}
            className="px-10 py-4 bg-white/1 backdrop-blur-sm border border-white/30 text-white rounded-sm font-semibold text-base hover:bg-white/20 hover:border-white/50 transition-all duration-300"
          >
            Hacé tu pedido
          </button>
        </div>
        
        
      </div>
    </section>
  )
}
