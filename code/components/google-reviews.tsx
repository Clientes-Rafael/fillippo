"use client"

import { Star, MessageCircle } from "lucide-react"

export default function GoogleReviews() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Google branding */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <svg className="w-12 h-12" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.1 16.3 18.7 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 7.1 29.6 5 24 5 16.3 5 9.6 9.2 6.3 14.7z"/>
                <path fill="#FBBC04" d="M24 44c5.2 0 9.9-1.7 13.5-4.6l-6.2-5.3C29.5 35.4 26.9 36 24 36c-6.1 0-11.3-3.9-13.1-9.3l-6.5 5C7.7 38.1 15.2 44 24 44z"/>
                <path fill="#EA4335" d="M46.2 20H24v9h12.7c-.9 2.8-3 5.1-5.7 6.6l6.2 5.3c3.8-3.5 6.3-8.8 6.3-15.9 0-1.5-.1-2.9-.3-4z"/>
              </svg>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Google Reviews
                </h2>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-foreground">
              ¿Disfrutaste tu experiencia?
            </h3>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Tu opinión nos ayuda a seguir mejorando cada día. Compartí tu experiencia en Google Maps y ayudá a otros clientes a conocernos.
            </p>
            
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJh4tgZ665vJUR8dPBYcoK41k"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <Star className="w-5 h-5 fill-current" />
              <span>Dejá tu reseña en Google</span>
            </a>
          </div>

          {/* Right side - Suggestions card */}
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <MessageCircle className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-foreground text-center">
                ¿Tenés una sugerencia?
              </h3>
              
              <p className="text-muted-foreground text-base mb-6 leading-relaxed text-center">
                Tu opinión es fundamental para nosotros. Ayudanos a mejorar compartiendo tus ideas y comentarios.
              </p>
              
              <a
                href={`https://wa.me/5491136413045?text=${encodeURIComponent("Hola, visité el local de fillippo y quería dejar una sugeriencia para que puedan seguir mejorando su servicio: ")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-sm font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
            
                <span>Dejanos tu mensaje</span>
              </a>
              
              
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
