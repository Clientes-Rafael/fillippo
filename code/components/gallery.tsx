"use client"

  const images = [
    {
      id: 1,
      src: "/images/1.jpg",
      title: "Tortas y postres",
    },
    {
      id: 2,
      src: "/images/2.jpg",
      title: "Cremosidad en cada cucharada",
    },
    {
      id: 3,
      src: "/images/3.jpg",
      title: "Café y meriendas",
    },
    {
      id: 4,
      src: "/images/4.jpg",
      title: "Variedad de gustos y cucuruchos",
    },
    {
      id: 5,
      src: "/images/5.jpg",
      title: "Atención diferencial",
    },
    {
      id: 6,
      src: "/images/7.jpg",
      title: "Conocé la magia de nuestro espacio",
    },
  ]

export default function Gallery() {
  return (
    <section id="gallery" className="py-4  bg-gradient-to-b from-background to-accent/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-xs font-serif text-primary tracking-widest uppercase bg-primary/10 px-4 py-2 rounded-full">
              Galería
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Experiencia <span className="text-primary">Fillippo</span>
          </h2>
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
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6">
                <h3 className="font-serif text-2xl font-bold text-white text-center">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
