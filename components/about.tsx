"use client"

import { Award, Sparkles, Heart } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Calidad",
    description: "Utilizamos ingredientes de primera calidad para ofrecerte helados con el mejor sabor y textura.",
  },
  {
    icon: Award,
    title: "Creatividad",
    description: "Innovamos constantemente con sabores únicos que combinan tradición y creatividad en cada creación.",
  },
  {
    icon: Heart,
    title: "Servicio al Cliente",
    description: "Tu satisfacción es nuestra pasión. Te atendemos con dedicación para que cada visita sea especial.",
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-serif text-primary tracking-widest uppercase">Sobre Nosotros</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">Pasión por el Helado</h2>
        </div>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16 text-center text-pretty leading-relaxed">
          Fillippo Heladería, ubicada en Ramos Mejía, es el destino ideal para los amantes del helado. Reconocida por su amplia variedad de sabores tanto tradicionales como creativos, nos destacamos por la calidad de nuestros ingredientes y la esmerada presentación de nuestros postres.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="p-10 bg-card rounded-lg border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2"
              >
                <Icon className="w-16 h-16 text-primary mb-6" />
                <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
