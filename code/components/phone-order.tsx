"use client"

export default function PhoneOrder() {
  return (
    <section id="phone-order" className="pt-10 md:pt-16 bg-gradient-to-b from-accent/10 to-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-card rounded-2xl border-2 border-primary/30 p-6 md:p-8 shadow-xl">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <span className="text-6xl animate-phone-ring inline-block">
                📞
              </span>
            </div>
          </div>
          
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Pedí por Teléfono
          </h2>
          
          <p className="text-muted-foreground text-base mb-4 leading-relaxed">
            Llamanos directamente y hacé tu pedido
          </p>
          
          <a
            href="tel:+541148439521"
            className="inline-block text-3xl md:text-4xl font-bold text-primary hover:text-primary/80 transition-colors duration-300 font-mono tracking-wider"
          >
            4843-9521
          </a>
          
        
          
    
        </div>
      </div>
    </section>
  )
}
