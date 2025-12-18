"use client"

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  order: number;
  isAvailable: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
  items: MenuItem[];
}

interface MenuProps {
  categories: Category[];
}

// Función para formatear precios argentinos
function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-AR')}`;
}

export default function Menu({ categories }: MenuProps) {
  return (
    <section id="menu" className="py-12 md:py-20 bg-gradient-to-b from-accent/10 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-6xl md:text-7xl font-bold text-primary drop-shadow-lg tracking-tight">Cafetería  </h2>
          <div className="w-32 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-lg"></div>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 font-medium">Menú de la cafetería</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-card rounded-lg p-8 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              
              <h3 className="font-serif text-3xl font-bold text-primary mb-6 pb-4 border-b-2 border-primary/30 tracking-wide">
                {category.name}
              </h3>
              
              {/* SVGs solo para categoría CAFÉ CALIENTE */}
              {category.name === "CAFÉ CALIENTE" && (
                <div className="grid grid-cols-2 gap-6 mb-14">
                  {/* SVG 1: Espresso */}
                  <div className="flex flex-col items-center">
                    <img
                      src="/animaciones/Cafe solo.png"
                      alt="Espresso"
                      className="w-20 h-20 md:w-24 md:h-24 animate-bounce-slow"
                    />
                    <p className="text-base md:text-lg text-muted-foreground mt-1 font-medium text-center">Espresso</p>
                  </div>
                  
                  {/* SVG 2: Cortado */}
                  <div className="flex flex-col items-center">
                    <img
                      src="/animaciones/Cortado.png"
                      alt="Cortado"
                      className="w-20 h-20 md:w-24 md:h-24 animate-bounce-slow"
                    />
                    <p className="text-base md:text-lg text-muted-foreground mt-1 font-medium text-center">Cortado</p>
                  </div>
                  
                  {/* SVG 3: Lágrima */}
                  <div className="flex flex-col items-center">
                    <img
                      src="/animaciones/Lagrima.png"
                      alt="Lágrima"
                      className="w-20 h-20 md:w-24 md:h-24 animate-bounce-slow"
                    />
                    <p className="text-base md:text-lg text-muted-foreground mt-1 font-medium text-center">Lágrima</p>
                  </div>
                  
                  {/* SVG 4: Café con leche */}
                  <div className="flex flex-col items-center">
                    <img
                      src="/animaciones/Cafe con leche.png"
                      alt="Café con leche"
                      className="w-20 h-20 md:w-24 md:h-24 animate-bounce-slow"
                    />
                    <p className="text-base md:text-lg text-muted-foreground mt-1 font-medium text-center">Café con leche</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-5">
                {category.items.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex items-start gap-3">
                      <span className="text-primary text-2xl group-hover:scale-125 transition-transform duration-300 mt-1">•</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-3">
                          <h4 className="font-serif text-xl text-foreground font-semibold group-hover:text-primary transition-colors duration-300 tracking-wide leading-relaxed">
                            {item.name}
                          </h4>
                          <span className="text-primary font-bold text-xl whitespace-nowrap tracking-wide">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-base text-muted-foreground mt-2 tracking-wide leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

  
      </div>
    </section>
  )
}
