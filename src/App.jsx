import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check,
  Clock3, Instagram, Leaf, MapPin, Menu, MessageCircle, Wheat, X
} from 'lucide-react';
import logo from './assets/logo.png';
import productPackagesPhoto from './assets/natura-productos-envasados.webp';
import brandLabelsPhoto from './assets/natura-etiquetas.webp';

const WHATSAPP_NUMBER = '5493467419630';
const WHATSAPP_MESSAGE = encodeURIComponent('¡Hola! Quisiera hacer un pedido de Natura & Pasta.');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const INSTAGRAM_URL = 'https://www.instagram.com/natura.andpasta/';
const ADDRESS = 'Av. San Martín 993, Cruz Alta, Córdoba, Argentina';
const MAPS_QUERY = 'Av. San Martín 993, Cruz Alta, Córdoba, Argentina';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;

const navItems = [
  ['La propuesta', '#propuesta'],
  ['Productos', '#productos'],
  ['Elaboración', '#elaboracion'],
  ['Dónde estamos', '#ubicacion'],
];

const products = [
  {
    number: '01',
    eyebrow: 'HARINA DE ALMENDRAS',
    name: 'Tallarines\nde almendras',
    description: 'Tallarines frescos con harina de almendras como ingrediente principal. Una propuesta diferente para disfrutar en la mesa.',
    image: '/images/instagram-tallarines-detalle.webp',
    imageAlt: 'Tallarines frescos de Natura & Pasta vistos de cerca',
    tone: 'almond',
  },
  {
    number: '02',
    eyebrow: 'SALVADO DE TRIGO',
    name: 'Tallarines\nintegrales',
    description: 'Tallarines frescos elaborados con salvado de trigo, para quienes disfrutan el sabor y la textura de lo integral.',
    image: '/images/instagram-ingredientes-huevos.webp',
    imageAlt: 'Harina y huevos utilizados en la elaboración de las pastas',
    tone: 'wholegrain',
  },
];

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    // Elements in the same content group appear with a small stagger.
    elements.forEach((element) => {
      const siblings = Array.from(element.parentElement?.querySelectorAll(':scope > [data-reveal]') ?? []);
      const index = Math.max(0, siblings.indexOf(element));
      element.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 90}ms`);
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    if (menuOpen) window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}>
      <div className="nav-wrap container">
        <a className="brand" href="#inicio" aria-label="Natura & Pasta, ir al inicio" onClick={closeMenu}>
          <img src={logo} alt="Natura & Pasta" />
        </a>
        <nav id="primary-navigation" className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navegación principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <a className="nav-contact" href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Hablemos <ArrowUpRight size={15} strokeWidth={1.8} />
          </a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function SectionHeading({ kicker, title, description, centered = false }) {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''}`} data-reveal>
      <span className="eyebrow"><span />{kicker}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <article className={`product-card ${product.tone}`} data-reveal>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.imageAlt} loading="lazy" />
        <span className="product-index">{product.number}</span>
        <span className="product-tag">Pasta fresca</span>
      </div>
      <div className="product-copy">
        <span className="eyebrow">{product.eyebrow}</span>
        <h3>{product.name.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h3>
        <p>{product.description}</p>
        <div className="product-facts"><span>250 g por envase</span><span>Sin conservantes</span></div>
        <a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Consultar por este producto <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}

function App() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <section className="hero" id="inicio">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker" data-reveal><span className="kicker-line" /> UNA NUEVA FORMA DE DISFRUTAR</div>
              <h1 data-reveal>Comer sano<br />nunca fue <em>tan rico.</em></h1>
              <p className="hero-description" data-reveal>
                Pastas frescas de harina de almendras e integrales. Una propuesta diferente, hecha para disfrutar cada bocado.
              </p>
              <div className="hero-actions" data-reveal>
                <a href="#productos" className="button button-dark">Descubrí nuestros productos <ArrowDownRight size={17} /></a>
                <a href={INSTAGRAM_URL} className="subtle-link" target="_blank" rel="noreferrer"><Instagram size={17} /> Seguinos en Instagram</a>
              </div>
              <div className="hero-note" data-reveal><span className="note-mark"><Leaf size={18} /></span><span>Ingredientes que inspiran.<br /><strong>Sabores para disfrutar.</strong></span></div>
            </div>
            <div className="hero-visual" data-reveal>
              <div className="hero-photo-main">
                <img src="/images/hero-principal.webp" alt="Tallarines frescos de Natura & Pasta en sus envases" />
              </div>
              <div className="hero-photo-small">
                <img src="/images/harina-integral-huevos-hero.webp" alt="Harina integral, huevos y trigo sobre una mesa de trabajo" loading="eager" />
              </div>
              <div className="hero-stamp"><span>PASTAS</span><strong>frescas</strong><span>CON IDENTIDAD</span></div>
              <div className="hero-side-note">HECHAS PARA DISFRUTAR · CRUZ ALTA, CÓRDOBA</div>
            </div>
          </div>
          <a href="#propuesta" className="scroll-cue" aria-label="Desplazarse a la siguiente sección"><span>SCROLL PARA DESCUBRIR</span><ArrowDown size={15} /></a>
        </section>

        <section className="intro section-pad" id="propuesta">
          <div className="container intro-grid">
            <div className="intro-art" data-reveal>
              <div className="intro-photo"><img src="/images/propuesta-marca.webp" alt="Etiquetas e identidad visual de Natura & Pasta" loading="lazy" /></div>
              <div className="intro-art-caption"><span>01 / NUESTRA ESENCIA</span><span>Simple, rica y auténtica.</span></div>
              <div className="almond-doodle" aria-hidden="true">✳</div>
            </div>
            <div className="intro-copy">
              <SectionHeading kicker="NUESTRA PROPUESTA" title={<>El placer de comer<br /><em>bien y rico.</em></>} />
              <p className="large-copy" data-reveal>
                En Natura & Pasta creemos que disfrutar de una buena pasta y elegir ingredientes diferentes pueden ir de la mano.
              </p>
              <p data-reveal>
                Por eso creamos una línea de pastas frescas que reúne dos opciones: tallarines con harina de almendras como ingrediente principal y tallarines integrales elaborados con salvado de trigo.
              </p>
              <p data-reveal>Una propuesta para sumar variedad a la mesa, sin dejar de lado lo que más importa: el sabor y el placer de compartir.</p>
              <a className="text-link intro-link" href="#productos">Conocé nuestros tallarines <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="products-section section-pad" id="productos">
          <div className="container">
            <div className="products-topline"><span className="eyebrow"><span /> NUESTRA SELECCIÓN</span><span className="topline-note">DOS VARIEDADES · UNA MISMA PASIÓN</span></div>
            <SectionHeading kicker="PASTAS FRESCAS" title={<>Dos maneras de disfrutar.<br /><em>Un mismo amor por la pasta.</em></>} description="Elegí tu variedad favorita y descubrí una nueva experiencia en cada plato." />
            <div className="products-grid">{products.map((product) => <ProductCard key={product.number} product={product} />)}</div>
            <div className="products-footnote" data-reveal><span className="footnote-icon"><Wheat size={19} /></span><p>¿Querés conocer más sobre nuestros productos? <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Escribinos por WhatsApp.</a></p></div>
          </div>
        </section>

        <section className="craft-section section-pad" id="elaboracion">
          <div className="container craft-grid">
            <div className="craft-copy">
              <SectionHeading kicker="ELABORACIÓN" title={<>El valor de hacer<br /><em>las cosas con dedicación.</em></>} />
              <p className="large-copy" data-reveal>Somos parte de una tradición de pastas frescas, donde cada etapa tiene su importancia.</p>
              <p data-reveal>En nuestra elaboración combinamos el trabajo de máquinas con el cuidado de las manos. Así damos forma a pastas frescas, siguiendo la manera de producir que caracteriza a nuestra fábrica.</p>
              <div className="craft-points" data-reveal>
                <div><span className="point-number">01</span><span><strong>Ingredientes protagonistas</strong><small>Almendras y salvado de trigo, según cada variedad.</small></span></div>
                <div><span className="point-number">02</span><span><strong>Trabajo combinado</strong><small>Maquinaria y elaboración manual en distintas etapas.</small></span></div>
                <div><span className="point-number">03</span><span><strong>Pastas frescas</strong><small>Una propuesta pensada para disfrutar en la mesa.</small></span></div>
              </div>
            </div>
            <div className="craft-visual" data-reveal>
              <img src={productPackagesPhoto} alt="Envases de 250 gramos con tallarines frescos de Natura & Pasta" loading="lazy" />
              <div className="craft-image-label"><span>ELABORACIÓN</span><strong>Frescos, sin<br />conservantes.</strong></div>
              <span className="craft-vertical">NATURA & PASTA · PASTAS FRESCAS</span>
            </div>
          </div>
        </section>

        <section className="manifesto-section">
          <div className="manifesto-image"><img src="/images/manifesto-tallarines-frescos.webp" alt="Tallarines frescos de Natura & Pasta en sus envases de 250 gramos" loading="lazy" /></div>
          <div className="manifesto-overlay" />
          <div className="manifesto-content" data-reveal>
            <span className="eyebrow light-eyebrow"><span /> NATURA & PASTA</span>
            <p>Elegir distinto.<br /><em>Disfrutar siempre.</em></p>
            <span className="manifesto-sub">Porque comer rico también es parte de cuidarte.</span>
            <a className="button button-light" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Hacé tu consulta <ArrowUpRight size={17} /></a>
          </div>
          <span className="manifesto-side">COMER SANO NUNCA FUE TAN RICO</span>
        </section>

        <section className="location-section section-pad" id="ubicacion">
          <div className="container location-grid">
            <div className="location-copy">
              <SectionHeading kicker="DÓNDE ENCONTRARNOS" title={<>Estamos cerca.<br /><em>Vení a conocernos.</em></>} />
              <p className="large-copy" data-reveal>Desde Cruz Alta, Córdoba, llevamos nuestra propuesta a tu mesa.</p>
              <div className="location-detail" data-reveal>
                <span className="detail-icon"><MapPin size={20} /></span>
                <div><small>UBICACIÓN</small><strong>{ADDRESS}</strong><a href={MAPS_URL} target="_blank" rel="noreferrer">Cómo llegar <ArrowUpRight size={15} /></a></div>
              </div>
              <div className="location-detail" data-reveal>
                <span className="detail-icon"><Clock3 size={20} /></span>
                <div><small>ATENCIÓN</small><strong>Martes a domingo</strong><span className="detail-muted">Consultanos por horarios y disponibilidad.</span></div>
              </div>
              <a className="button button-dark location-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Consultanos por WhatsApp <ArrowUpRight size={17} /></a>
            </div>
            <div className="map-card" data-reveal>
              <iframe title="Mapa de ubicación de Natura & Pasta en Cruz Alta, Córdoba" src={MAPS_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className="map-caption"><span className="map-pin"><MapPin size={17} /></span><span><strong>Natura & Pasta</strong><small>Cruz Alta · Córdoba, Argentina</small></span><a href={MAPS_URL} target="_blank" rel="noreferrer" aria-label="Abrir ubicación en Google Maps"><ArrowUpRight size={18} /></a></div>
            </div>
          </div>
        </section>

        <section className="instagram-section section-pad" id="instagram">
          <div className="container instagram-wrap">
            <div className="instagram-top" data-reveal>
              <div><span className="eyebrow"><span /> SEGUINOS DE CERCA</span><h2>La pasta también<br /><em>se disfruta con los ojos.</em></h2></div>
              <a className="instagram-handle" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={19} /><span>@natura.andpasta</span><ArrowUpRight size={16} /></a>
            </div>
            <div className="instagram-gallery" data-reveal>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="insta-tile insta-tile-large" aria-label="Ver Natura & Pasta en Instagram">
                <img src={productPackagesPhoto} alt="Tallarines frescos de Natura & Pasta en sus envases de 250 gramos" loading="lazy" />
                <span><Instagram size={20} /></span>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="insta-tile" aria-label="Ver publicaciones de Natura & Pasta en Instagram">
                <img src={brandLabelsPhoto} alt="Etiquetas de la marca Natura & Pasta" loading="lazy" />
                <span><Instagram size={20} /></span>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="insta-tile" aria-label="Ver publicaciones de Natura & Pasta en Instagram">
                <img src="/images/instagram-ingredientes-huevos.webp" alt="Harina y huevos, ingredientes que aparecen en el proceso de elaboración" loading="lazy" />
                <span><Instagram size={20} /></span>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="insta-tile" aria-label="Ver publicaciones de Natura & Pasta en Instagram">
                <img src="/images/instagram-tallarines-detalle.webp" alt="Tallarines frescos espolvoreados con harina" loading="lazy" />
                <span><Instagram size={20} /></span>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="insta-tile" aria-label="Ver publicaciones de Natura & Pasta en Instagram">
                <img src="/images/instagram-masa-integral.webp" alt="Masa y harina durante la preparación de pastas integrales" loading="lazy" />
                <span><Instagram size={20} /></span>
              </a>
            </div>
            <div className="instagram-bottom" data-reveal><p>Ideas, novedades y todo lo que estamos preparando.</p><a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Seguinos en Instagram <ArrowUpRight size={17} /></a></div>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-inner container" data-reveal>
            <span className="eyebrow light-eyebrow"><span /> UNA INVITACIÓN A DISFRUTAR</span>
            <h2>Tu próxima pasta<br /><em>favorita te espera.</em></h2>
            <p>Escribinos y conocé más sobre Natura & Pasta.</p>
            <a href={WHATSAPP_URL} className="button button-light" target="_blank" rel="noreferrer">Hablemos por WhatsApp <ArrowUpRight size={17} /></a>
            <div className="closing-decoration" aria-hidden="true">N&amp;P</div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand"><img src={logo} alt="Natura & Pasta" /><p>Comer sano nunca fue tan rico.</p></div>
          <div className="footer-column"><span className="footer-label">EXPLORÁ</span><a href="#propuesta">La propuesta</a><a href="#productos">Productos</a><a href="#elaboracion">Elaboración</a><a href="#ubicacion">Ubicación</a></div>
          <div className="footer-column"><span className="footer-label">CONTACTO</span><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href={MAPS_URL} target="_blank" rel="noreferrer">Cómo llegar</a></div>
          <div className="footer-address"><span className="footer-label">VISITANOS</span><p>{ADDRESS}</p><span>Martes a domingo</span></div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Natura & Pasta. Todos los derechos reservados.</span>
          <span>Una línea de <strong>Gerardino Pastas</strong></span>
          <a className="developer-credit" href="https://franco-venesia-portafolio.vercel.app/" target="_blank" rel="noreferrer">Desarrollado por <strong>Franco Venesia</strong></a>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
        <div className="footer-note container">Presentación de 250 g · Sin conservantes. Información sobre gluten: estos productos no son libres de gluten ni aptos para personas celíacas. En el establecimiento también se manipula harina de trigo.</div>
      </footer>

      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Haz tu pedido por WhatsApp"><MessageCircle size={23} /><span>Haz tu pedido</span></a>
    </>
  );
}

export default App;
