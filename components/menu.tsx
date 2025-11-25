"use client"

const menuItems = [
  {
    category: "Clásicos",
    items: [
      { name: "Dulce de Leche", price: "" },
      { name: "Chocolate", price: "" },
      { name: "Frutilla", price: "" },
      { name: "Vainilla", price: "" },
      { name: "Limón", price: "" },
      { name: "Menta Granizada", price: "" },
    ],
  },
  {
    category: "Creativos",
    items: [
      { name: "Tramontana", price: "" },
      { name: "Mousse de Limón", price: "" },
      { name: "Cheesecake de Frutos Rojos", price: "" },
      { name: "Tiramisú", price: "" },
      { name: "Brownie con Nueces", price: "" },
      { name: "Maraña Suiza", price: "" },
    ],
  },
  {
    category: "Especiales",
    items: [
      { name: "Sambayon con Almendras", price: "" },
      { name: "Crema Rusa", price: "" },
      { name: "Mousse de Chocolate Amargo", price: "" },
      { name: "Frutos del Bosque", price: "" },
      { name: "Banana Split", price: "" },
      { name: "Crema Americana", price: "" },
    ],
  },
]

export default function Menu() {
  return (
    <section id="menu" className="py-20 md:py-32 bg-gradient-to-b from-accent/10 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-serif text-primary tracking-widest uppercase">Sabores</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">Nuestro Menú</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((section) => (
            <div key={section.category} className="bg-card rounded-lg p-8 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <h3 className="font-serif text-3xl font-bold text-primary mb-6 pb-4 border-b-2 border-primary/30">
                {section.category}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 group">
                    <span className="text-primary text-xl group-hover:scale-125 transition-transform duration-300">•</span>
                    <div className="flex-1">
                      <h4 className="font-serif text-lg text-foreground font-semibold group-hover:text-primary transition-colors duration-300">{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-10 bg-gradient-to-r from-primary/10 to-accent/20 border-2 border-primary/30 rounded-lg text-center shadow-lg">
          <p className="text-lg text-muted-foreground mb-8 font-medium">
            ¿Tenés alguna pregunta sobre nuestros sabores? Consultá con nuestro personal sobre disponibilidad y opciones especiales.
          </p>
          <button className="px-10 py-4 bg-primary text-primary-foreground rounded-sm font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl">
            Visitanos
          </button>
        </div>
      </div>
    </section>
  )
}
