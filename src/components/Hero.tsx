import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, MapPin, CreditCard } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string, label: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section
      id="inicio"
      className="stone-surface relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      {/* Textura sutil mineral + luz arquitectónica */}
      <div className="lambrin-slat-stone pointer-events-none absolute inset-0 opacity-45" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Columna Izquierda: Propuesta de Valor */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C2B8A8] bg-[#F4F1EC]/90 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#57524A] uppercase">
            <MapPin className="h-3.5 w-3.5 text-[#B89047]" />
            <span>Hermosillo, Sonora · casamaraestudio.com</span>
          </div>

          <h1 className="font-serif text-4xl leading-[1.06] font-medium text-[#1C1A17] sm:text-5xl lg:text-6xl">
            Arquitectura viva,{' '}
            <span className="italic text-[#7C4D25]">seguridad inteligente</span> y textura natural
            en cada detalle.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#57524A] sm:text-lg">
            Diseñamos interiores y exteriores en <strong>Hermosillo</strong> combinando piedra
            natural, madera lambrín y tecnología residencial: instalación de lambrín, portones
            automáticos, remodelaciones y nuestra tienda directa de{' '}
            <strong>puertas de seguridad y cerraduras inteligentes</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => onNavigate('tienda', 'Tienda Online')}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1C1A17] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#F4F1EC] shadow-md transition hover:bg-[#2C2925] active:scale-[0.98]"
            >
              <span>Explorar Tienda Online</span>
              <ArrowRight className="h-4 w-4 text-[#D4B26E] transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('servicios', 'Servicios de Diseño')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#A89E8E] bg-[#F4F1EC]/90 px-7 py-3.5 text-sm font-semibold text-[#1C1A17] transition hover:border-[#1C1A17] hover:bg-white"
            >
              <Sparkles className="h-4 w-4 text-[#B89047]" />
              <span>Diseño Interior y Exterior</span>
            </button>
          </div>

          {/* Badges de confianza sobre bloque piedra */}
          <div className="mt-9 grid grid-cols-1 gap-3 border-t border-[#C2B8A8]/70 pt-6 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <div className="rounded-xl border border-[#D4CCC0] bg-[#F4F1EC] p-2 text-[#7C4D25]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C1A17]">Instalación Local</p>
                <p className="text-[11px] text-[#6B645A]">Equipo propio en Hermosillo</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="rounded-xl border border-[#D4CCC0] bg-[#F4F1EC] p-2 text-[#7C4D25]">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C1A17]">Pago Seguro en Línea</p>
                <p className="text-[11px] text-[#6B645A]">Hasta 12 MSI, SPEI y Tarjetas</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="rounded-xl border border-[#D4CCC0] bg-[#F4F1EC] p-2 text-[#7C4D25]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C1A17]">Llave en Mano</p>
                <p className="text-[11px] text-[#6B645A]">Cocinas, baños y terrazas</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Columna Derecha: Composición editorial limpia sin marcos en arco */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative overflow-hidden rounded-2xl bg-[#2C2925] shadow-[0_24px_60px_-20px_rgba(28,26,23,0.32)]">
            <div className="relative aspect-[4/4.4] w-full overflow-hidden">
              <motion.img
                src="./images/hero-interior.jpg"
                alt="Diseño arquitectónico interior en piedra y lambrín Casa Amara"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover"
              />
              {/* Degradado inferior sutil para lectura limpia */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1A17]/80 via-[#1C1A17]/10 to-transparent" />

              {/* Pie editorial minimalista */}
              <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-4 p-6 text-[#F4F1EC]">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.24em] text-[#D4B26E] uppercase">
                    Piedra · Lambrín · Arquitectura
                  </p>
                  <p className="mt-1 font-serif text-2xl leading-tight">
                    Espacios cálidos y seguros en Hermosillo
                  </p>
                </div>
                <div className="hidden shrink-0 rounded-xl border border-[#F4F1EC]/20 bg-[#1C1A17]/65 px-3.5 py-2 text-right backdrop-blur-md sm:block">
                  <p className="text-[10px] tracking-[0.18em] text-[#D4B26E] uppercase">
                    Catálogo Top MX
                  </p>
                  <p className="text-xs font-semibold text-[#F4F1EC]">
                    5 Puertas · 5 Cerraduras
                  </p>
                </div>
              </div>
            </div>

            {/* Franja vertical arquitectónica de lambrín en el borde derecho */}
            <div className="lambrin-wall pointer-events-none absolute top-0 right-0 bottom-0 w-2.5 opacity-90" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
