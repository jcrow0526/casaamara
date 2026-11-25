import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, MapPin, MessageCircle, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string, label: string) => void;
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'tienda', label: 'Tienda' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'contacto', label: 'Contacto' },
];

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '526624284304';

export const getWhatsAppUrl = (
  text = 'Hola Casa Amara, me interesa cotizar un proyecto o producto en Hermosillo, Sonora.'
) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  activeSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappUrl = getWhatsAppUrl();

  const handleMobileNav = (id: string, label: string) => {
    setMobileMenuOpen(false);
    onNavigate(id, label);
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'border-b border-[#C2B8A8]/70 bg-[#EAE5DD]/95 py-2 shadow-[0_8px_28px_rgba(28,26,23,0.06)] backdrop-blur-lg'
            : 'bg-gradient-to-b from-[#EAE5DD]/95 via-[#EAE5DD]/75 to-transparent py-3'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Brand limpio */}
          <button
            type="button"
            onClick={() => handleMobileNav('inicio', 'Casa Amara')}
            className="group flex items-center gap-2.5 text-left"
          >
            <img
              src="./images/logo-mark.png"
              alt="Casa Amara Logo"
              className="h-10 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-11"
            />
            <div>
              <div className="font-serif text-lg font-semibold tracking-[0.16em] text-[#1C1A17] sm:text-2xl">
                CASA AMARA
              </div>
              <div className="text-[8px] font-medium tracking-[0.26em] text-[#787166] uppercase sm:text-[9px]">
                Exterior e Interior
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 rounded-full border border-[#C2B8A8]/80 bg-[#F4F1EC]/90 p-1.5 backdrop-blur-md lg:flex">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id, item.label)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                    isActive ? 'text-[#F4F1EC]' : 'text-[#46413A] hover:text-[#1C1A17]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-stone-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#1C1A17]"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="hidden items-center gap-1.5 rounded-full border border-[#C2B8A8] bg-[#F4F1EC]/90 px-3 py-1.5 text-[11px] font-medium text-[#57524A] xl:flex">
              <MapPin className="h-3.5 w-3.5 text-[#B89047]" />
              <span>Hermosillo, Son.</span>
            </div>

            {/* Botón Cotizar superior -> WhatsApp en automático */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#A89E8E] bg-[#F4F1EC]/90 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-[#1C1A17] uppercase transition hover:border-[#1C1A17] hover:bg-[#1C1A17] hover:text-[#F4F1EC] sm:px-4 sm:py-2 sm:text-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#B89047]" />
              <span>Cotizar</span>
            </a>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Abrir carrito de compras"
              className="relative flex items-center gap-1.5 rounded-full bg-[#1C1A17] px-3 py-1.5 text-xs font-semibold text-[#F4F1EC] shadow-md transition hover:bg-[#2C2925] active:scale-95 sm:gap-2 sm:px-3.5 sm:py-2"
            >
              <ShoppingBag className="h-4 w-4 text-[#D4B26E]" />
              <span className="hidden sm:inline">Carrito</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B89047] px-1 text-[11px] font-bold text-[#1C1A17]">
                {cartCount}
              </span>
            </button>

            {/* Menú móvil discreto en header (sin barra inferior) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Abrir menú de navegación"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C2B8A8] bg-[#F4F1EC] text-[#1C1A17] lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Menú desplegable móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[#C2B8A8]/60 bg-[#F4F1EC] lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {NAV_LINKS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMobileNav(item.id, item.label)}
                    className={`rounded-xl px-4 py-2.5 text-left text-xs font-semibold tracking-[0.14em] uppercase transition ${
                      activeSection === item.id
                        ? 'bg-[#1C1A17] text-[#F4F1EC]'
                        : 'text-[#46413A] hover:bg-[#EAE5DD]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* BOTÓN FLOTANTE DE WHATSAPP (Escritorio y Celular) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con Casa Amara"
        className="group fixed right-4 bottom-4 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_12px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FB859] active:scale-95 sm:right-6 sm:bottom-6"
      >
        <MessageCircle className="h-5 w-5 fill-white/15" />
        <span className="hidden text-xs font-bold tracking-wide sm:inline">WhatsApp</span>
      </a>
    </>
  );
};
