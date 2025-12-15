"use client"

const features = [
  {
    emoji: "🍦",
    title: "Calidad",
    description: "Sabores auténticos, helados, batidos, café, meriendas y mas...",
    gradient: "from-primary/20 to-accent/10",
    accentColor: "text-primary"
  },
  {
    emoji: "☕",
    title: "Atención",
    description: "No vendemos helados, creamos momentos. Te tratamos como nos gusta ser tratados.",
    gradient: "from-accent/20 to-primary/10",
    accentColor: "text-accent"
  },
  {
    emoji: "💚",
    title: "Paz y Naturaleza",
    description: "Estamos rodeados de árboles y verde, para que te desconectes por un rato y sientas la naturaleza en medio de la ciudad",
    gradient: "from-primary/15 to-accent/15",
    accentColor: "text-primary"
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 bg-gradient-to-b from-background via-accent/5 to-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-serif text-primary tracking-widest uppercase bg-primary/10 px-4 py-2 rounded-full">
              Sobre Nosotros
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Pasión por el <span className="text-primary">Helado</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 text-center leading-relaxed">
        <span className="text-foreground font-semibold">Fillippo</span> es mas que una heladería. Es un espacio ameno para los sentidos donde podés venir a relajarte y estar en paz, mientras disfrutás un café, un helado o una torta artesanal. Se trata de una pausa necesaria y un mimo para el alma, en una merienda o en un desayuno, con sabores que no te vas a olvidar.
        </p>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Decorative background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 blur-xl -z-10`} />
              
              <div className="relative p-8 md:p-10 bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-3 h-full flex flex-col">
                {/* Emoji container with decorative ring */}
                <div className="relative mb-6 flex justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl scale-75 group-hover:scale-100 transition-transform duration-500" />
                  <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-full p-6 group-hover:rotate-[360deg] transition-transform duration-700">
                    <span className={`text-7xl block leading-none filter drop-shadow-lg ${
                      index === 0 ? 'animate-bounce-slow' : 
                      index === 1 ? 'animate-swing' : 
                      'animate-pulse-scale'
                    }`} style={{ animationDelay: `${index * 300}ms` }}>
                      {feature.emoji}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className={`font-serif text-2xl md:text-3xl font-bold mb-4 text-center ${feature.accentColor} group-hover:scale-105 transition-transform duration-300`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg text-center flex-1">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative bottom accent */}
                <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary via-accent to-primary mx-auto transition-all duration-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative accent */}
        <div className="mt-20 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </section>
  )
}
