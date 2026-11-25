import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  MapPin,
  Home,
  Store,
  Compass,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

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

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  activeSection,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '526624284304'}?text=${encodeURIComponent(
    'Hola Casa Amara, me interesa cotizar un proyecto o producto en Hermosillo, Sonora.'
  )}`;

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#C2B8A8]/70 bg-[#EAE5DD]/92 py-2.5 shadow-[0_8px_28px_rgba(28,26,23,0.06)] backdrop-blur-lg'
            : 'bg-gradient-to-b from-[#EAE5DD]/95 via-[#EAE5DD]/70 to-transparent py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Brand limpio */}
          <button
            type="button"
            onClick={() => onNavigate('inicio', 'Casa Amara')}
            className="group flex items-center gap-3 text-left"
          >
            <img
              src="./images/logo-mark.png"
              alt="Casa Amara Logo"
              className="h-11 w-11 rounded-lg border border-[#C2B8A8] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <div className="font-serif text-xl font-semibold tracking-[0.16em] text-[#1C1A17] sm:text-2xl">
                CASA AMARA
              </div>
              <div className="text-[9px] font-medium tracking-[0.26em] text-[#787166] uppercase">
                Exterior e Interior
              </div>
            </div>
          </button>

          {/* Desktop Navigation sobre piedra caliza */}
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
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1.5 rounded-full border border-[#C2B8A8] bg-[#F4F1EC]/90 px-3 py-1.5 text-[11px] font-medium text-[#57524A] md:flex">
              <MapPin className="h-3.5 w-3.5 text-[#B89047]" />
              <span>Hermosillo, Son.</span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('contacto', 'Cotización')}
              className="hidden items-center gap-1.5 rounded-full border border-[#A89E8E] bg-transparent px-4 py-2 text-xs font-semibold tracking-wider text-[#1C1A17] uppercase transition hover:border-[#1C1A17] hover:bg-[#1C1A17] hover:text-[#F4F1EC] sm:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#B89047]" />
              Cotizar
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Abrir carrito de compras"
              className="relative flex items-center gap-2 rounded-full bg-[#1C1A17] px-3.5 py-2 text-xs font-semibold text-[#F4F1EC] shadow-md transition hover:bg-[#2C2925] active:scale-95"
            >
              <ShoppingBag className="h-4 w-4 text-[#D4B26E]" />
              <span className="hidden sm:inline">Carrito</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B89047] px-1 text-[11px] font-bold text-[#1C1A17]">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM DOCK en piedra basalto */}
      <nav
        aria-label="Navegación móvil"
        className="fixed right-3 bottom-3 left-3 z-50 flex items-center justify-around rounded-2xl border border-[#46413A] bg-[#1C1A17]/94 px-2 py-2 text-[#F4F1EC] shadow-[0_14px_40px_rgba(28,26,23,0.4)] backdrop-blur-xl lg:hidden"
      >
        <button
          type="button"
          onClick={() => onNavigate('inicio', 'Inicio')}
          className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-medium transition ${
            activeSection === 'inicio' ? 'text-[#D4B26E]' : 'text-[#F4F1EC]/70'
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Inicio</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('tienda', 'Tienda Online')}
          className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-medium transition ${
            activeSection === 'tienda' ? 'text-[#D4B26E]' : 'text-[#F4F1EC]/70'
          }`}
        >
          <Store className="h-4 w-4" />
          <span>Tienda</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('servicios', 'Servicios')}
          className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-medium transition ${
            activeSection === 'servicios' ? 'text-[#D4B26E]' : 'text-[#F4F1EC]/70'
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>Servicios</span>
        </button>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-medium text-[#F4F1EC]/85"
        >
          <ShoppingBag className="h-4 w-4 text-[#D4B26E]" />
          <span>Carrito</span>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B89047] px-1 text-[9px] font-bold text-[#1C1A17]">
              {cartCount}
            </span>
          )}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 rounded-xl bg-[#B89047]/20 px-3 py-1 text-[10px] font-semibold text-[#D4B26E]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </a>
      </nav>
    </>
  );
};
