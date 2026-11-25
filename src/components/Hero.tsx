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
      className="stone-surface relative flex min-h-[100svh] items-center overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-22 lg:pb-10"
    >
      {/* Textura sutil mineral */}
      <div className="lambrin-slat-stone pointer-events-none absolute inset-0 opacity-45" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Columna Izquierda: Propuesta de Valor */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <h1 className="font-serif text-[2rem] leading-[1.06] font-medium text-[#1C1A17] sm:text-5xl lg:text-[3.4rem]">
            Arquitectura viva,{' '}
            <span className="italic text-[#7C4D25]">seguridad inteligente</span> y textura natural
            en cada detalle.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#57524A] sm:mt-4 sm:text-base">
            Diseñamos interiores y exteriores en <strong>Hermosillo</strong> con piedra natural,
            lambrín y portones automáticos, además de nuestra tienda directa de{' '}
            <strong>puertas de seguridad y cerraduras inteligentes</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => onNavigate('tienda', 'Tienda Online')}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1C1A17] px-6 py-3 text-xs font-semibold tracking-wide text-[#F4F1EC] shadow-md transition hover:bg-[#2C2925] active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-sm"
            >
              <span>Explorar Tienda Online</span>
              <ArrowRight className="h-4 w-4 text-[#D4B26E] transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('servicios', 'Servicios de Diseño')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#A89E8E] bg-[#F4F1EC]/90 px-6 py-3 text-xs font-semibold text-[#1C1A17] transition hover:border-[#1C1A17] hover:bg-white sm:px-7 sm:py-3.5 sm:text-sm"
            >
              <Sparkles className="h-4 w-4 text-[#B89047]" />
              <span>Diseño Interior y Exterior</span>
            </button>
          </div>

          {/* Ubicación y dominio debajo de Explorar Tienda */}
          <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-[#C2B8A8] bg-[#F4F1EC]/90 px-3.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#57524A] uppercase sm:mt-4 sm:text-[11px]">
            <MapPin className="h-3.5 w-3.5 text-[#B89047]" />
            <span>Hermosillo, Sonora · casamaraestudio.com</span>
          </div>

          {/* Badges de confianza compactos */}
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#C2B8A8]/70 pt-4 sm:mt-6 sm:gap-3 sm:pt-5">
            <div className="flex items-start gap-2">
              <div className="hidden rounded-lg border border-[#D4CCC0] bg-[#F4F1EC] p-1.5 text-[#7C4D25] sm:block">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1C1A17] sm:text-xs">Instalación Local</p>
                <p className="text-[10px] text-[#6B645A] sm:text-[11px]">50% OFF · $2,400</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="hidden rounded-lg border border-[#D4CCC0] bg-[#F4F1EC] p-1.5 text-[#7C4D25] sm:block">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1C1A17] sm:text-xs">Pago Seguro</p>
                <p className="text-[10px] text-[#6B645A] sm:text-[11px]">12 MSI y SPEI</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="hidden rounded-lg border border-[#D4CCC0] bg-[#F4F1EC] p-1.5 text-[#7C4D25] sm:block">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1C1A17] sm:text-xs">Llave en Mano</p>
                <p className="text-[10px] text-[#6B645A] sm:text-[11px]">Interior y Exterior</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Columna Derecha: Fotografía arquitectónica ajustada para caber completa en móvil y escritorio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative overflow-hidden rounded-2xl bg-[#2C2925] shadow-[0_20px_50px_-18px_rgba(28,26,23,0.3)]">
            <div className="relative h-[220px] w-full overflow-hidden sm:h-[320px] lg:h-[min(68vh,540px)]">
              <motion.img
                src="./images/hero-interior.jpg"
                alt="Diseño arquitectónico interior en piedra y lambrín Casa Amara"
                initial={{ scale: 1.04 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1A17]/80 via-[#1C1A17]/10 to-transparent" />

              <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-3 p-4 text-[#F4F1EC] sm:p-5">
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] text-[#D4B26E] uppercase sm:text-[10px]">
                    Piedra · Lambrín · Arquitectura
                  </p>
                  <p className="mt-0.5 font-serif text-lg leading-tight sm:text-2xl">
                    Espacios cálidos y seguros en Hermosillo
                  </p>
                </div>
                <div className="hidden shrink-0 rounded-xl border border-[#F4F1EC]/20 bg-[#1C1A17]/65 px-3 py-1.5 text-right backdrop-blur-md sm:block">
                  <p className="text-[9px] tracking-[0.18em] text-[#D4B26E] uppercase">
                    Promoción Vigente
                  </p>
                  <p className="text-xs font-semibold text-[#F4F1EC]">
                    Instalación 50% OFF · $2,400
                  </p>
                </div>
              </div>
            </div>

            <div className="lambrin-wall pointer-events-none absolute top-0 right-0 bottom-0 w-2 opacity-90" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
