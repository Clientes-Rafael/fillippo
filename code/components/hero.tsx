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
        backgroundImage: 'url(/images/10.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay oscuro uniforme */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Blur en los extremos (efecto viñeta) */}
      <div 
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 70%)'
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="mb-12  animate-fade-in">
          <img
            src="/images/nombre.png"
            alt="Fillippo Heladería Artesanal"
            className="mx-auto w-full max-w-sm md:max-w-sm h-auto drop-shadow-2xl"
          />
        </div>

        <p className="text-2xl md:text-3xl text-white mb-6 font-serif italic tracking-wide animate-fade-in">
          Una Experiencia llena de sabor y tranquilidad
          </p>


        <div className="flex flex-col sm:flex-row mt-16 justify-center items-center animate-fade-in">
          <button
            onClick={() => scrollToSection("menu")}
            className="px-10 py-4 bg-primary font-serif text-white rounded-sm text-xl tracking-widest hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(115,181,80,0.5)] hover:shadow-[0_0_30px_rgba(115,181,80,0.7)]"
          >
            Ver Menú
          </button>
          {/* <button
            onClick={() => scrollToSection("phone-order")}
            className="px-10 py-4 bg-white/1 backdrop-blur-sm border border-white/30 text-white rounded-sm font-semibold text-base hover:bg-white/20 hover:border-white/50 transition-all duration-300"
          >
            Hacé tu pedido
          </button> */}
        </div>
        
        
      </div>
    </section>
  )
}
