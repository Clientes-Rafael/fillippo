"use client"

const images = [
  {
    id: 1,
    src: "/images/1.jpg",
    title: "Helados Artesanales",
    caption: "Variedad de sabores únicos",
  },
  {
    id: 2,
    src: "/images/2.jpg",
    title: "Cremosidad Perfecta",
    caption: "Textura suave y deliciosa",
  },
  {
    id: 3,
    src: "/images/3.jpg",
    title: "Sabores Creativos",
    caption: "Innovación en cada bocado",
  },
  {
    id: 4,
    src: "/images/4.jpg",
    title: "Presentación Especial",
    caption: "Postres elaborados con dedicación",
  },
  {
    id: 5,
    src: "/images/5.jpg",
    title: "Dulce Tentación",
    caption: "Momentos dulces para compartir",
  },
  {
    id: 6,
    src: "/images/6.jpg",
    title: "Experiencia Fillippo",
    caption: "Calidad que se nota",
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-serif text-primary tracking-widest uppercase">Galería</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">Nuestras Creaciones</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative bg-card rounded-lg overflow-hidden aspect-square shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <h3 className="font-serif text-xl font-bold text-white mb-2">{image.title}</h3>
                <p className="text-sm text-white/95">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
