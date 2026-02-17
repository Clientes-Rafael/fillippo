"use client"

import { IceCreamCategory } from './IceCreamWrapper';

interface IceCreamMenuProps {
  categories: IceCreamCategory[];
}

export default function IceCreamMenu({ categories }: IceCreamMenuProps) {
  if (categories.length === 0) {
    return (
      <section id="heladeria" className="py-12 md:py-20 bg-gradient-to-b from-accent/10 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-6xl md:text-7xl font-bold text-primary drop-shadow-lg tracking-tight">Heladería</h2>
            <div className="w-32 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-lg"></div>
            <p className="text-lg md:text-xl text-muted-foreground mt-6 font-medium">menú de la heladería</p>
          </div>
          <div className="text-center text-muted-foreground font-serif text-xl">Cargando gustos...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="heladeria" className="py-12 md:py-20 bg-gradient-to-b from-accent/10 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-6xl md:text-7xl font-bold text-primary drop-shadow-lg tracking-tight">Heladería</h2>
          <div className="w-32 h-1.5 bg-primary mx-auto mt-6 rounded-full shadow-lg"></div>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 font-medium">menú de la heladería</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-card rounded-lg p-8 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <h3 className="font-serif text-3xl font-bold text-primary mb-6 pb-4 border-b-2 border-primary/30 tracking-wide">
                {category.name}
              </h3>

              <div className="space-y-3">
                {category.flavors.map((flavor) => (
                  <div key={flavor.id} className="group flex items-center gap-3">
                    <span className="text-primary text-2xl group-hover:scale-125 transition-transform duration-300">•</span>
                    <h4 className="font-serif text-xl text-foreground font-semibold group-hover:text-primary transition-colors duration-300 tracking-wide leading-relaxed">
                      {flavor.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
