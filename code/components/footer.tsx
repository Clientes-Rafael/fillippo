"use client"

import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer id="footer" className="bg-gradient-to-b from-foreground to-black text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="Fillippo Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-serif text-lg font-bold">Fillippo</span>
            </div>
            
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Horarios</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">De martes a Domingos</p>
                  <p>10:00 - 00:00 hs</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Viernes y Sábados</p>
                  <p>Hasta 1am</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Contacto</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <p>
                  Matienzo 2210 esq Wernicke
                  <br />
                  Ciudad Jardín, Buenos Aires
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <p>48439521</p>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                <p>1123907229</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Nuestros Valores</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p>• Calidad</p>
              <p>• Creatividad</p>
              <p>• Servicio al Cliente</p>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mb-12 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d821.1257902285533!2d-58.5917193!3d-34.5914361!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb9ae67608b87%3A0x59e30aca61c1d3f1!2sFillippo%20Helados%20%2B%20Cafe!5e0!3m2!1sen!2sar!4v1765825744899!5m2!1sen!2sar"
            className="w-full h-64 md:h-80 rounded-lg border border-primary-foreground/20"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>&copy; 2025 Fillippo Heladería. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
