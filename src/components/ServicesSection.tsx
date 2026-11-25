import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { STUDIO_SERVICES, type ServiceItem } from '../data/services';
import { LambrinReveal } from './LambrinTransitions';

interface ServicesSectionProps {
  onSelectServiceQuote: (serviceTitle: string) => void;
}

type ServiceFilter = 'Todos' | 'Interior' | 'Exterior' | 'Automatización';

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceQuote }) => {
  const [filter, setFilter] = useState<ServiceFilter>('Todos');

  const visibleServices =
    filter === 'Todos'
      ? STUDIO_SERVICES
      : STUDIO_SERVICES.filter((s) => s.tag === filter);

  const filters: ServiceFilter[] = ['Todos', 'Interior', 'Exterior', 'Automatización'];

  return (
    <section id="servicios" className="stone-surface relative overflow-hidden py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.26em] text-[#787166] uppercase">
              Estudio de Arquitectura e Interiorismo
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-[#1C1A17] sm:text-5xl">
              Diseño de Interiores y Exteriores
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#57524A] sm:text-base">
              Materiales nobles pensados para <strong>Hermosillo, Sonora</strong>: piedra natural,
              lambrín interior y WPC exterior, portones automáticos, cocinas, baños, salas,
              comedores, patios y terrazas.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-full border border-[#C2B8A8] bg-[#F4F1EC] p-1.5">
            {filters.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    active ? 'text-[#F4F1EC]' : 'text-[#46413A] hover:text-[#1C1A17]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="service-stone-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#1C1A17]"
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Servicios: Fotografía editorial limpia sin marcos */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service: ServiceItem, idx: number) => (
              <LambrinReveal key={service.id} delay={idx * 0.05}>
                <motion.article
                  layout
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D4CCC0] bg-[#FAF8F5] shadow-[0_10px_28px_rgba(28,26,23,0.05)] transition-all duration-400 hover:-translate-y-1 hover:border-[#A89E8E] hover:shadow-[0_20px_44px_rgba(28,26,23,0.12)]"
                >
                  {/* Fotografía full-bleed con detalle sutil de lambrín lateral */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#DBD4C8]">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="lambrin-wall pointer-events-none absolute top-0 bottom-0 left-0 w-1.5 opacity-90" />
                    <span className="absolute top-3.5 left-4 rounded-md bg-[#1C1A17]/85 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#D4B26E] uppercase backdrop-blur-sm">
                      {service.tag}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-[#787166] uppercase">
                      {service.subtitle}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1C1A17]">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#57524A]">
                      {service.description}
                    </p>

                    <ul className="mt-4 space-y-1.5 border-t border-[#E2DCD2] pt-4 text-xs text-[#57524A]">
                      {service.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B89047]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center justify-between pt-6">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#787166]">
                        <Sparkles className="h-3.5 w-3.5 text-[#B89047]" />
                        {service.startingHint}
                      </span>

                      <button
                        type="button"
                        onClick={() => onSelectServiceQuote(service.title)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1A17] px-4 py-2 text-xs font-semibold text-[#F4F1EC] transition hover:bg-[#2C2925] active:scale-95"
                      >
                        <span>Cotizar</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#D4B26E]" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              </LambrinReveal>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
