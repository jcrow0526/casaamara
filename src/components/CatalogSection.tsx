import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Shield,
  Fingerprint,
  Check,
  Star,
  SlidersHorizontal,
  X,
  Wrench,
  CreditCard,
} from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  LOCK_BUNDLE_DISCOUNT_PERCENT,
  formatMXN,
  type Product,
  type ProductCategory,
} from '../data/catalog';

interface CatalogSectionProps {
  hasDoorInCart: boolean;
  onAddToCart: (product: Product, variant?: string, includeInstallation?: boolean) => void;
}

type FilterTab = 'all' | ProductCategory;
type SortOption = 'featured' | 'price-asc' | 'price-desc';

export const CatalogSection: React.FC<CatalogSectionProps> = ({ hasDoorInCart, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVariant, setModalVariant] = useState<string>('');
  const [modalInstall, setModalInstall] = useState<boolean>(true);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let items = [...CATALOG_PRODUCTS];
    if (activeTab !== 'all') {
      items = items.filter((p) => p.category === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-asc') items.sort((a, b) => a.priceMXN - b.priceMXN);
    if (sortBy === 'price-desc') items.sort((a, b) => b.priceMXN - a.priceMXN);
    return items;
  }, [activeTab, searchQuery, sortBy]);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setModalVariant(product.variants?.options[0] || '');
    setModalInstall(true);
  };

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, product.variants?.options[0], false);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1300);
  };

  const doorsCount = CATALOG_PRODUCTS.filter((p) => p.category === 'puertas').length;
  const locksCount = CATALOG_PRODUCTS.filter((p) => p.category === 'cerraduras').length;

  const tabs: Array<{ id: FilterTab; label: string; count: number; icon: React.ReactNode }> = [
    {
      id: 'all',
      label: 'Todo el Catálogo',
      count: CATALOG_PRODUCTS.length,
      icon: <SlidersHorizontal className="h-3.5 w-3.5" />,
    },
    {
      id: 'puertas',
      label: 'Puertas de Seguridad',
      count: doorsCount,
      icon: <Shield className="h-3.5 w-3.5" />,
    },
    {
      id: 'cerraduras',
      label: 'Cerraduras Inteligentes',
      count: locksCount,
      icon: <Fingerprint className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <section id="tienda" className="relative bg-[#F4F1EC] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.26em] text-[#787166] uppercase">
              Tienda Online · Envío e Instalación
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-[#1C1A17] sm:text-5xl">
              Seguridad Arquitectónica
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#57524A] sm:text-base">
              Puertas de seguridad de acero y cerraduras inteligentes con garantía directa. Al
              comprar tu puerta obtienes <strong>10% OFF en cerraduras</strong> y puedes agregar
              instalación profesional con descuento (<strong>$6,400 MXN en puertas</strong> ·{' '}
              <strong>$1,300 MXN en chapas</strong>; servicio válido solo en Hermosillo).
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-xl border border-[#D4CCC0] bg-[#EAE5DD] px-4 py-2.5 text-xs text-[#46413A] md:self-auto">
            <CreditCard className="h-4 w-4 text-[#7C4D25]" />
            <span>
              Hasta <strong>12 MSI</strong> · Tarjetas, SPEI y Efectivo
            </span>
          </div>
        </div>

        {/* Barra de Filtros sobre piedra caliza */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#D4CCC0] bg-[#EAE5DD]/85 p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
                    active ? 'text-[#F4F1EC]' : 'text-[#46413A] hover:bg-[#DBD4C8]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="catalog-stone-tab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#1C1A17]"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                        active ? 'bg-[#B89047] text-[#1C1A17]' : 'bg-[#DBD4C8] text-[#46413A]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-56">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#787166]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar marca o modelo…"
                className="w-full rounded-full border border-[#C2B8A8] bg-[#F4F1EC] py-2 pr-4 pl-10 text-xs text-[#1C1A17] placeholder:text-[#787166] focus:border-[#7C4D25] focus:outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Ordenar productos"
              className="rounded-full border border-[#C2B8A8] bg-[#F4F1EC] px-4 py-2 text-xs font-medium text-[#1C1A17] focus:border-[#7C4D25] focus:outline-none"
            >
              <option value="featured">Ordenar: Top Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Grid de Productos: Fotografía limpia full-bleed sin marcos */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const lockComboActive = hasDoorInCart && product.category === 'cerraduras';
              const effectivePrice = lockComboActive
                ? Math.round(product.priceMXN * (1 - LOCK_BUNDLE_DISCOUNT_PERCENT / 100))
                : product.priceMXN;
              const monthlyMSI = Math.round(effectivePrice / 12);
              const isAdded = justAddedId === product.id;

              return (
                <motion.article
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#D4CCC0] bg-[#FAF8F5] shadow-[0_6px_20px_rgba(28,26,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A89E8E] hover:shadow-[0_18px_36px_rgba(28,26,23,0.1)]"
                >
                  {/* Imagen full-bleed limpia */}
                  <button
                    type="button"
                    onClick={() => openQuickView(product)}
                    className="relative block aspect-[4/5] w-full overflow-hidden bg-[#DBD4C8] text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <span className="absolute top-3 left-3 rounded-md bg-[#1C1A17]/85 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#F4F1EC] backdrop-blur-sm">
                      {product.badge}
                    </span>

                    <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-[#F4F1EC]/92 px-2 py-0.5 text-[10px] font-bold text-[#1C1A17]">
                      <Star className="h-3 w-3 fill-[#B89047] text-[#B89047]" />
                      {product.rating.toFixed(1)}
                    </span>
                  </button>

                  {/* Detalles */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.16em] text-[#787166] uppercase">
                      <span>{product.brand}</span>
                      <span>{product.category === 'puertas' ? 'Puerta' : 'Smart Lock'}</span>
                    </div>

                    <h3 className="mt-1.5 line-clamp-2 font-serif text-lg leading-snug font-semibold text-[#1C1A17]">
                      <button
                        type="button"
                        onClick={() => openQuickView(product)}
                        className="text-left transition hover:text-[#7C4D25]"
                      >
                        {product.name}
                      </button>
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#57524A]">
                      {product.shortDesc}
                    </p>

                    <div className="mt-auto pt-4">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl font-bold text-[#1C1A17]">
                            {formatMXN(effectivePrice)}
                          </span>
                          {lockComboActive && (
                            <span className="text-xs text-[#787166] line-through">
                              {formatMXN(product.priceMXN)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-medium text-[#787166]">MXN</span>
                      </div>
                      {lockComboActive ? (
                        <p className="text-[11px] font-semibold text-[#2F6B48]">
                          10% OFF aplicado por combo con puerta
                        </p>
                      ) : product.category === 'puertas' ? (
                        <p className="text-[11px] font-medium text-[#7C4D25]">
                          +10% OFF en cerraduras al agregar
                        </p>
                      ) : (
                        <p className="text-[11px] text-[#6B645A]">
                          o 12 MSI de <strong>{formatMXN(monthlyMSI)}</strong>
                        </p>
                      )}

                      <div className="mt-3.5 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            product.category === 'puertas'
                              ? openQuickView(product)
                              : handleQuickAdd(product)
                          }
                          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold transition active:scale-95 ${
                            isAdded
                              ? 'bg-[#2F6B48] text-white'
                              : 'bg-[#1C1A17] text-[#F4F1EC] hover:bg-[#2C2925]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Agregado</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-3.5 w-3.5 text-[#D4B26E]" />
                              <span>{product.category === 'puertas' ? 'Comprar' : 'Agregar'}</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => openQuickView(product)}
                          className="rounded-full border border-[#C2B8A8] px-3 py-2.5 text-xs font-semibold text-[#46413A] transition hover:border-[#1C1A17] hover:bg-[#EAE5DD]"
                        >
                          Ver
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#D4CCC0] bg-[#EAE5DD] p-10 text-center">
            <p className="font-serif text-2xl text-[#1C1A17]">
              No encontramos productos para &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="mt-4 rounded-full bg-[#1C1A17] px-5 py-2 text-xs font-semibold text-[#F4F1EC]"
            >
              Ver todo el catálogo
            </button>
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL LIMPIO */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1C1A17]/65 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-[#C2B8A8] bg-[#F4F1EC] shadow-2xl sm:rounded-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Cerrar ficha técnica"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#1C1A17]/80 text-[#F4F1EC] transition hover:bg-[#1C1A17]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Imagen full-bleed sin marco */}
                <div className="relative bg-[#DBD4C8] md:col-span-5">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full max-h-[380px] w-full object-cover md:max-h-none"
                  />
                </div>

                {/* Info */}
                <div className="p-6 sm:p-7 md:col-span-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#1C1A17] px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#D4B26E] uppercase">
                      {selectedProduct.mlRank}
                    </span>
                    <span className="text-xs font-medium text-[#787166]">
                      SKU: {selectedProduct.sku}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl font-semibold text-[#1C1A17] sm:text-3xl">
                    {selectedProduct.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#57524A]">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-bold text-[#1C1A17]">
                      {formatMXN(selectedProduct.priceMXN)}
                    </span>
                    <span className="text-xs text-[#6B645A]">
                      MXN · Hasta 12 Meses sin Intereses
                    </span>
                  </div>

                  {selectedProduct.variants && (
                    <div className="mt-5">
                      <label className="text-xs font-semibold tracking-wider text-[#46413A] uppercase">
                        {selectedProduct.variants.label}
                      </label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedProduct.variants.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setModalVariant(opt)}
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                              modalVariant === opt
                                ? 'border-[#1C1A17] bg-[#1C1A17] text-[#F4F1EC]'
                                : 'border-[#C2B8A8] bg-[#EAE5DD] text-[#1C1A17] hover:border-[#787166]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct.category === 'puertas' && (
                    <div className="mt-4 rounded-xl border border-[#B89047]/40 bg-[#EAE5DD] px-3.5 py-2.5 text-xs text-[#46413A]">
                      <strong>Beneficio Combo:</strong> Al agregar esta puerta al carrito obtienes{' '}
                      <strong className="text-[#7C4D25]">10% de descuento automático</strong> en
                      cualquier cerradura inteligente.
                    </div>
                  )}

                  <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-[#C2B8A8] bg-[#EAE5DD]/75 p-3.5">
                    <input
                      type="checkbox"
                      checked={modalInstall}
                      onChange={(e) => setModalInstall(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[#7C4D25]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1 font-semibold text-[#1C1A17]">
                        <span className="flex items-center gap-1.5">
                          <Wrench className="h-3.5 w-3.5 text-[#7C4D25]" />
                          {selectedProduct.category === 'puertas'
                            ? 'Agregar Instalación de Puerta'
                            : 'Agregar Instalación de Chapa'}
                          <span className="rounded-full bg-[#2F6B48] px-2 py-0.5 text-[10px] font-bold text-white">
                            50% OFF
                          </span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-[11px] font-normal text-[#787166] line-through">
                            {formatMXN(selectedProduct.installationRegularMXN)}
                          </span>
                          <span className="font-bold text-[#7C4D25]">
                            +{formatMXN(selectedProduct.installationMXN)}
                          </span>
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-[#57524A]">
                        {selectedProduct.category === 'puertas'
                          ? 'Precio final con descuento aplicado: $6,400 MXN. Incluye nivelación, fijación y garantía.'
                          : 'Instalación profesional de chapa/cerradura de seguridad: $1,300 MXN con configuración.'}
                      </p>
                      <p className="mt-1.5 inline-flex items-center rounded-md bg-[#7C4D25]/10 px-2 py-0.5 text-[10px] font-semibold text-[#7C4D25]">
                        Aviso: Instalación solo válida en Hermosillo, Sonora.
                      </p>
                    </div>
                  </label>

                  <ul className="mt-5 space-y-1.5 border-t border-[#D4CCC0] pt-4 text-xs text-[#57524A]">
                    {selectedProduct.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B89047]" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        onAddToCart(selectedProduct, modalVariant, modalInstall);
                        setSelectedProduct(null);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1A17] px-6 py-3.5 text-sm font-semibold text-[#F4F1EC] shadow-lg transition hover:bg-[#2C2925] active:scale-[0.98]"
                    >
                      <ShoppingBag className="h-4 w-4 text-[#D4B26E]" />
                      <span>
                        Agregar ·{' '}
                        {formatMXN(
                          selectedProduct.priceMXN +
                            (modalInstall ? selectedProduct.installationMXN : 0)
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
