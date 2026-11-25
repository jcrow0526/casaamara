import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessAndContact } from './components/ProcessAndContact';
import { CartDrawer } from './components/CartDrawer';
import { EcartCheckoutModal } from './components/EcartCheckoutModal';
import { LambrinProgressSweep, StoneLambrinDivider } from './components/LambrinTransitions';
import type { Product } from './data/catalog';
import type { CartItem } from './services/ecart';

const CART_STORAGE_KEY = 'casa_amara_cart_v1';

export default function App() {
  const [navSweep, setNavSweep] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    const ids = ['inicio', 'tienda', 'servicios', 'proceso', 'contacto'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateSmooth = (sectionId: string) => {
    setNavSweep(true);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
    setTimeout(() => setNavSweep(false), 580);
  };

  const handleAddToCart = (
    product: Product,
    selectedVariant?: string,
    includeInstallation = false
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === selectedVariant &&
          item.includeInstallation === includeInstallation
      );
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = { ...next[existingIdx], quantity: next[existingIdx].quantity + 1 };
        return next;
      }
      return [...prev, { product, quantity: 1, selectedVariant, includeInstallation }];
    });
  };

  const handleUpdateQty = (index: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item, idx) =>
          idx === index ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleToggleInstall = (index: number) => {
    setCart((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, includeInstallation: !item.includeInstallation } : item
      )
    );
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSelectServiceQuote = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    navigateSmooth('contacto');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasDoorInCart = cart.some((item) => item.product.category === 'puertas');

  return (
    <div className="min-h-screen bg-[#EAE5DD] text-[#1C1A17]">
      <LambrinProgressSweep active={navSweep} />

      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onNavigate={navigateSmooth}
        activeSection={activeSection}
      />

      <main>
        <Hero onNavigate={navigateSmooth} />

        <StoneLambrinDivider title="Seguridad Residencial · Garantía Casa Amara" />

        <CatalogSection hasDoorInCart={hasDoorInCart} onAddToCart={handleAddToCart} />

        <StoneLambrinDivider title="Diseño Residencial · Piedra, Lambrín y Arquitectura" />

        <ServicesSection onSelectServiceQuote={handleSelectServiceQuote} />

        <ProcessAndContact preselectedService={preselectedService} />
      </main>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onToggleInstall={handleToggleInstall}
        onRemoveItem={handleRemoveItem}
        onQuickAddLock={(lock) => handleAddToCart(lock, lock.variants?.options[0], false)}
        onProceedCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <EcartCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onOrderCompleted={() => setCart([])}
      />
    </div>
  );
}
