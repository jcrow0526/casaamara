import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Layers,
  Hammer,
  KeyRound,
  MapPin,
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { HERMOSILLO_ZONES } from '../data/services';
import { LambrinReveal } from './LambrinTransitions';

interface ProcessAndContactProps {
  preselectedService: string;
}

const STEPS = [
  {
    num: '01',
    title: 'Visita & Levantamiento',
    desc: 'Agendamos visita en Hermosillo para medir tus espacios, analizar orientación solar y definir tu estilo.',
    icon: Compass,
  },
  {
    num: '02',
    title: 'Diseño & Propuesta 3D',
    desc: 'Combinamos piedra natural, lambrín, iluminación LED cálida y presupuesto claro antes de iniciar obra.',
    icon: Layers,
  },
  {
    num: '03',
    title: 'Fabricación & Obra Limpia',
    desc: 'Instalamos puertas de seguridad, cerraduras smart, lambrín, portones o remodelación integral sin contratiempos.',
    icon: Hammer,
  },
  {
    num: '04',
    title: 'Entrega Llave en Mano',
    desc: 'Configuramos tus accesos inteligentes, revisamos cada acabado y respaldamos tu proyecto con garantía directa.',
    icon: KeyRound,
  },
];

export const ProcessAndContact: React.FC<ProcessAndContactProps> = ({ preselectedService }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zone, setZone] = useState('Colonia Pitic');
  const [service, setService] = useState(preselectedService || 'Instalación de Lambrín');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const whatsappNum = import.meta.env.VITE_WHATSAPP_NUMBER || '526624284304';
    const msg = `Hola Casa Amara (casamaraestudio.com), soy ${name} de ${zone}, Hermosillo. Me gustaría cotizar: ${service}. Tel: ${phone}. Detalles: ${details || 'Solicito asesoría y visita.'}`;
    window.open(
      `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <>
      {/* SECCIÓN DE PROCESO en piedra basalto oscura */}
      <section id="proceso" className="stone-dark-surface relative overflow-hidden py-16 text-[#F4F1EC] sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.26em] text-[#D4B26E] uppercase">
              Metodología Casa Amara
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium sm:text-5xl">
              Del concepto a tu espacio soñado
            </h2>
            <p className="mt-3 text-sm text-[#C2B8A8] sm:text-base">
              Ejecución puntual, materiales minerales y madera natural con soporte local en Hermosillo.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-2xl border border-[#3B3731] bg-[#26231F]/90 p-6 transition hover:border-[#B89047]/60"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#46413A] bg-[#1C1A17] text-[#D4B26E]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-serif text-3xl font-light text-[#787166]">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-medium text-[#F4F1EC]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#C2B8A8]">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE CONTACTO Y COTIZACIÓN HERMOSILLO */}
      <section id="contacto" className="relative bg-[#F4F1EC] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LambrinReveal>
            <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#D4CCC0] bg-[#FAF8F5] shadow-[0_20px_50px_rgba(28,26,23,0.08)] lg:grid-cols-12">
              {/* Panel Izquierdo: Piedra oscura + detalle lambrín */}
              <div className="stone-dark-surface relative flex flex-col justify-between p-8 text-[#F4F1EC] sm:p-10 lg:col-span-5">
                <div className="lambrin-wall pointer-events-none absolute top-0 bottom-0 left-0 w-2 opacity-90" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#46413A] bg-[#2C2925] px-3.5 py-1 text-[10px] font-semibold tracking-[0.2em] text-[#D4B26E] uppercase">
                    <MapPin className="h-3.5 w-3.5" />
                    Hermosillo, Sonora
                  </div>

                  <h2 className="mt-4 font-serif text-3xl leading-tight font-medium sm:text-4xl">
                    Agenda una visita o cotiza tu proyecto hoy
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#C2B8A8]">
                    Atendemos residencias, departamentos y locales comerciales en todo Hermosillo y
                    proyectos especiales en San Carlos.
                  </p>

                  <div className="mt-6">
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#D4B26E] uppercase">
                      Cobertura Frecuente
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {HERMOSILLO_ZONES.map((z) => (
                        <span
                          key={z}
                          className="rounded-md border border-[#3B3731] bg-[#26231F] px-2.5 py-1 text-[11px] text-[#EAE5DD]"
                        >
                          {z}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 space-y-2.5 border-t border-[#3B3731] pt-6 text-xs text-[#C2B8A8]">
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 text-[#D4B26E]" />
                    <span>casamaraestudio.com</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[#D4B26E]" />
                    <span>hola@casamaraestudio.com</span>
                  </div>
                  <a
                    href="https://wa.me/526624284304"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 transition hover:text-[#F4F1EC]"
                  >
                    <MessageCircle className="h-4 w-4 text-[#D4B26E]" />
                    <span>WhatsApp (662) 428-4304 · Lun–Sáb 9:00 a 19:00</span>
                  </a>
                </div>
              </div>

              {/* Panel Derecho: Formulario */}
              <div className="p-8 sm:p-10 lg:col-span-7">
                <h3 className="font-serif text-2xl font-semibold text-[#1C1A17] sm:text-3xl">
                  Solicita tu Cotización Personalizada
                </h3>
                <p className="mt-1 text-xs text-[#6B645A]">
                  Completa tus datos y te respondemos en minutos por WhatsApp con opciones y tiempos.
                </p>

                <form onSubmit={handleQuoteSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-[#46413A]">Nombre completo</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Ana Sofía Morales"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-[#F4F1EC] px-4 py-2.5 text-sm text-[#1C1A17] focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#46413A]">
                        WhatsApp / Teléfono
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="662 123 4567"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-[#F4F1EC] px-4 py-2.5 text-sm text-[#1C1A17] focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-[#46413A]">
                        Servicio o Producto de Interés
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-[#F4F1EC] px-4 py-2.5 text-sm text-[#1C1A17] focus:border-[#7C4D25] focus:outline-none"
                      >
                        <option>Instalación de Lambrín</option>
                        <option>Portones Automáticos</option>
                        <option>Puertas de Seguridad + Instalación</option>
                        <option>Cerraduras Inteligentes + Instalación</option>
                        <option>Diseño de Cocinas</option>
                        <option>Diseño de Baños</option>
                        <option>Salas y Comedores</option>
                        <option>Patios y Terrazas</option>
                        <option>Proyecto Residencial Integral</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#46413A]">
                        Colonia / Zona en Hermosillo
                      </label>
                      <input
                        type="text"
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        placeholder="Ej. Pitic, Los Lagos, La Jolla…"
                        className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-[#F4F1EC] px-4 py-2.5 text-sm text-[#1C1A17] focus:border-[#7C4D25] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#46413A]">
                      Cuéntanos brevemente sobre tu espacio o medidas aproximadas
                    </label>
                    <textarea
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Ej. Muro de sala de 4m x 2.7m para lambrín con piedra y luz LED, o remodelación de terraza…"
                      className="mt-1 w-full rounded-xl border border-[#C2B8A8] bg-[#F4F1EC] px-4 py-2.5 text-sm text-[#1C1A17] focus:border-[#7C4D25] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1A17] px-6 py-3.5 text-sm font-semibold text-[#F4F1EC] shadow-md transition hover:bg-[#2C2925] active:scale-[0.98]"
                  >
                    <Send className="h-4 w-4 text-[#D4B26E]" />
                    <span>Enviar Cotización por WhatsApp</span>
                  </button>

                  {submitted && (
                    <div className="flex items-center gap-2 rounded-xl bg-[#2F6B48]/10 px-4 py-2.5 text-xs font-medium text-[#2F6B48]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>
                        ¡Listo! Se abrió WhatsApp con tu solicitud prellenada para el equipo de Casa
                        Amara.
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </LambrinReveal>
        </div>
      </section>

      {/* FOOTER en basalto */}
      <footer className="border-t border-[#3B3731] bg-[#1C1A17] pt-12 pb-28 text-[#C2B8A8] lg:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div className="flex items-center gap-3.5">
            <img
              src="./images/logo-mark.png"
              alt="Casa Amara"
              className="h-12 w-auto object-contain"
            />
            <div>
              <p className="font-serif text-xl tracking-[0.18em] text-[#F4F1EC]">CASA AMARA</p>
              <p className="text-[10px] tracking-[0.26em] text-[#D4B26E] uppercase">
                Exterior e Interior · Hermosillo, Sonora
              </p>
            </div>
          </div>

          <div className="text-xs text-[#9E9486]">
            <p>© {new Date().getFullYear()} Casa Amara Estudio · casamaraestudio.com</p>
            <p className="mt-1">
              Pagos seguros con Tarjetas, Meses sin Intereses y transferencia SPEI.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
