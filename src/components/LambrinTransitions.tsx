import React from 'react';
import { motion } from 'framer-motion';

/**
 * Revelado arquitectónico limpio inspirado en celosías de lambrín y bloques de piedra:
 * Sin bloqueos de pantalla ni marcos pesados; entrada fluida y editorial al hacer scroll.
 */
export const LambrinReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Transición sutil de barra superior tipo lambrín que acompaña el cambio de sección
 * sin tapar el contenido ni interrumpir la navegación.
 */
export const LambrinProgressSweep: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1, opacity: [1, 1, 0] }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'left center' }}
      className="pointer-events-none fixed top-0 right-0 left-0 z-[95] h-[3px] bg-gradient-to-r from-[#7C4D25] via-[#D4B26E] to-[#46413A]"
    />
  );
};

/**
 * Separador minimalista de piedra y lambrín entre secciones.
 */
export const StoneLambrinDivider: React.FC<{ title?: string }> = ({ title }) => (
  <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div className="flex items-center gap-4">
      <div className="h-[1px] flex-1 bg-[#C2B8A8]/70" />
      {title && (
        <div className="flex items-center gap-3 rounded-full border border-[#C2B8A8] bg-[#F4F1EC] px-4 py-1.5">
          <span className="h-3 w-1 rounded-full bg-[#7C4D25]" />
          <span className="h-3 w-1 rounded-full bg-[#B89047]" />
          <span className="text-[10px] font-semibold tracking-[0.24em] text-[#46413A] uppercase">
            {title}
          </span>
          <span className="h-3 w-1 rounded-full bg-[#B89047]" />
          <span className="h-3 w-1 rounded-full bg-[#7C4D25]" />
        </div>
      )}
      <div className="h-[1px] flex-1 bg-[#C2B8A8]/70" />
    </div>
  </div>
);
