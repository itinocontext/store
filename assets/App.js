import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronRight, Instagram, Menu, Minus, Plus, ShoppingBag, X, } from 'lucide-react';
import { motion, useScroll, useTransform, } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
const PRODUCTS = [
    {
        id: 'green',
        src: './assets/verde.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
        name: 'ITI Lower Than My Standards',
        price: '64,90 €',
        color: 'Racing Green',
        capsule: 'DROP 01 / GREEN',
        note: 'Una misma pieza. Cuatro formas de llevarla.',
    },
    {
        id: 'pink',
        src: './assets/rosa.png',
        bg: '#E882B4',
        panel: '#ED9DC4',
        name: 'ITI Lower Than My Standards',
        price: '64,90 €',
        color: 'Pit Pink',
        capsule: 'DROP 01 / PINK',
        note: 'Color alto. Actitud todavía más alta.',
    },
    {
        id: 'blue',
        src: './assets/azul.png',
        bg: '#6EB5FF',
        panel: '#8DC4FF',
        name: 'ITI Lower Than My Standards',
        price: '64,90 €',
        color: 'Grid Blue',
        capsule: 'DROP 01 / BLUE',
        note: 'Inspirada en paddock, garaje y calle.',
    },
    {
        id: 'black',
        src: './assets/negro.png',
        bg: '#171719',
        panel: '#29292C',
        name: 'ITI Lower Than My Standards',
        price: '64,90 €',
        color: 'After Hours Black',
        capsule: 'DROP 01 / BLACK',
        note: 'La variante más oscura del primer drop.',
    },
];
const SIZES = ['S', 'M', 'L', 'XL'];
const SYSTEM_ITEMS = [
    {
        number: '01',
        name: 'ONE PIECE',
        description: 'Una única silueta como protagonista del lanzamiento. El color cambia; la identidad permanece.',
    },
    {
        number: '02',
        name: 'FOUR COLOURWAYS',
        description: 'Racing Green, Pit Pink, Grid Blue y After Hours Black, presentados como variantes del mismo producto.',
    },
    {
        number: '03',
        name: 'OVERSIZED ATTITUDE',
        description: 'Volumen, capas y una estética urbana inspirada en la cultura europea del motor y el teamwear.',
    },
    {
        number: '04',
        name: 'DROP-BASED',
        description: 'La tienda gira alrededor de lanzamientos concretos, no de una cuadrícula interminable de productos.',
    },
];
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function FadeIn({ as = 'div', children, delay = 0, duration = 0.7, x = 0, y = 30, className, }) {
    const MotionTag = motion.create(as);
    return (_jsx(MotionTag, { className: className, initial: { opacity: 0, x, y }, whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, margin: '50px', amount: 0 }, transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] }, children: children }));
}
function Magnet({ children, padding = 150, strength = 3, className, }) {
    const ref = useRef(null);
    const [transform, setTransform] = useState('translate3d(0,0,0)');
    const [active, setActive] = useState(false);
    const onMove = (event) => {
        const node = ref.current;
        if (!node)
            return;
        const rect = node.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const inside = event.clientX >= rect.left - padding &&
            event.clientX <= rect.right + padding &&
            event.clientY >= rect.top - padding &&
            event.clientY <= rect.bottom + padding;
        if (inside) {
            setActive(true);
            setTransform(`translate3d(${dx / strength}px, ${dy / strength}px, 0)`);
        }
    };
    return (_jsx("div", { ref: ref, className: className, onMouseMove: onMove, onMouseLeave: () => {
            setActive(false);
            setTransform('translate3d(0,0,0)');
        }, style: {
            transform,
            transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
            willChange: 'transform',
        }, children: children }));
}
function AnimatedCharacter({ char, index, total, progress, }) {
    const start = index / total;
    const end = Math.min(1, start + 0.16);
    const opacity = useTransform(progress, [start, end], [0.16, 1]);
    return (_jsxs("span", { className: "relative inline-block", children: [_jsx("span", { className: "invisible", children: char === ' ' ? '\u00A0' : char }), _jsx(motion.span, { className: "absolute inset-0", style: { opacity }, children: char === ' ' ? '\u00A0' : char })] }));
}
function AnimatedText({ text }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.8', 'end 0.2'],
    });
    const chars = Array.from(text);
    return (_jsx("p", { ref: ref, className: "mx-auto max-w-[680px] text-center text-[clamp(1.05rem,2.1vw,1.55rem)] font-medium leading-relaxed text-[#D7E2EA]", children: chars.map((char, index) => (_jsx(AnimatedCharacter, { char: char, index: index, total: chars.length, progress: scrollYProgress }, `${char}-${index}`))) }));
}
function PillButton({ children, onClick, href, className, }) {
    const classes = cn('group inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#D7E2EA] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#D7E2EA] transition hover:bg-[#D7E2EA] hover:text-[#0C0C0C] sm:px-10 sm:py-3.5 sm:text-sm', className);
    if (href) {
        return (_jsx("a", { href: href, className: classes, children: children }));
    }
    return (_jsx("button", { type: "button", onClick: onClick, className: classes, children: children }));
}
function ColorCarousel({ activeIndex, navigate, selectIndex, }) {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
    const touchStart = useRef(null);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    const roleFor = (index) => {
        const left = (activeIndex + PRODUCTS.length - 1) % PRODUCTS.length;
        const right = (activeIndex + 1) % PRODUCTS.length;
        const back = (activeIndex + 2) % PRODUCTS.length;
        if (index === activeIndex)
            return 'center';
        if (index === left)
            return 'left';
        if (index === right)
            return 'right';
        if (index === back)
            return 'back';
        return 'back';
    };
    const stylesFor = (role) => {
        const mobile = isMobile;
        const common = {
            position: 'absolute',
            aspectRatio: '0.6 / 1',
            transform: 'translateX(-50%) scale(1)',
            transition: 'transform 650ms var(--ease), filter 650ms var(--ease), opacity 650ms var(--ease), left 650ms var(--ease), height 650ms var(--ease), bottom 650ms var(--ease)',
            willChange: 'transform, filter, opacity, left',
        };
        if (role === 'center') {
            return {
                ...common,
                left: '50%',
                bottom: mobile ? '15%' : '-3%',
                zIndex: 20,
                height: mobile ? '63%' : '88%',
                opacity: 1,
                filter: 'blur(0)',
                transform: `translateX(-50%) scale(${mobile ? 1.2 : 1.23})`,
            };
        }
        if (role === 'left') {
            return {
                ...common,
                left: mobile ? '12%' : '22%',
                bottom: mobile ? '30%' : '10%',
                zIndex: 10,
                height: mobile ? '20%' : '33%',
                opacity: 0.72,
                filter: 'blur(2px)',
            };
        }
        if (role === 'right') {
            return {
                ...common,
                left: mobile ? '88%' : '78%',
                bottom: mobile ? '30%' : '10%',
                zIndex: 10,
                height: mobile ? '20%' : '33%',
                opacity: 0.72,
                filter: 'blur(2px)',
            };
        }
        return {
            ...common,
            left: '50%',
            bottom: mobile ? '31%' : '12%',
            zIndex: 5,
            height: mobile ? '15%' : '24%',
            opacity: 0.35,
            filter: 'blur(5px)',
        };
    };
    const onTouchStart = (event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
    };
    const onTouchEnd = (event) => {
        if (touchStart.current === null)
            return;
        const end = event.changedTouches[0]?.clientX ?? touchStart.current;
        const delta = end - touchStart.current;
        if (Math.abs(delta) > 45)
            navigate(delta < 0 ? 'next' : 'prev');
        touchStart.current = null;
    };
    return (_jsx("div", { className: "absolute inset-0 z-20", onTouchStart: onTouchStart, onTouchEnd: onTouchEnd, "aria-label": "Selector visual de colores del Drop 01", children: PRODUCTS.map((product, index) => {
            const role = roleFor(index);
            return (_jsx("div", { style: stylesFor(role), "aria-hidden": role !== 'center', onClick: () => role !== 'center' && selectIndex(index), className: cn(role !== 'center' && 'cursor-pointer'), children: _jsx("img", { src: product.src, alt: role === 'center' ? `${product.name}, color ${product.color}` : '', draggable: false, className: "h-full w-full select-none object-contain object-bottom drop-shadow-[0_35px_40px_rgba(0,0,0,.34)]" }) }, product.id));
        }) }));
}
function Hero({ activeIndex, navigate, selectIndex, onOpenCart, cartCount, }) {
    const product = PRODUCTS[activeIndex];
    const [menuOpen, setMenuOpen] = useState(false);
    return (_jsxs("section", { id: "top", className: "grain relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-[#0C0C0C]", style: { '--accent': product.bg, '--accent-soft': product.panel }, children: [_jsx(motion.div, { className: "pointer-events-none absolute bottom-[-32%] left-1/2 z-0 h-[86vw] max-h-[980px] w-[86vw] max-w-[980px] -translate-x-1/2 rounded-full blur-[0px]", animate: { backgroundColor: product.bg }, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } }), _jsx(motion.div, { className: "pointer-events-none absolute bottom-[-28%] left-1/2 z-[1] h-[78vw] max-h-[870px] w-[78vw] max-w-[870px] -translate-x-1/2 rounded-full border border-white/20", animate: { borderColor: `${product.panel}99` }, transition: { duration: 0.65 } }), _jsxs(FadeIn, { as: "header", y: -20, className: "relative z-[90] flex items-center justify-between px-5 pt-5 sm:px-8 md:px-10 md:pt-8", children: [_jsxs("a", { href: "#top", "aria-label": "ITI inicio", className: "flex items-center gap-3", children: [_jsx("img", { src: "./assets/iti-logo.png", alt: "ITI", className: "h-12 w-12 object-contain sm:h-14 sm:w-14" }), _jsx("span", { className: "hidden text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA] sm:block", children: "European streetwear" })] }), _jsxs("nav", { className: "hidden items-center gap-8 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:flex lg:gap-12 lg:text-[1.05rem]", children: [_jsx("a", { className: "transition-opacity hover:opacity-70", href: "#story", children: "About" }), _jsx("a", { className: "transition-opacity hover:opacity-70", href: "#system", children: "Drop" }), _jsx("a", { className: "transition-opacity hover:opacity-70", href: "#shop", children: "Shop" }), _jsx("a", { className: "transition-opacity hover:opacity-70", href: "#contact", children: "Contact" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { type: "button", onClick: onOpenCart, className: "relative inline-flex h-12 items-center gap-2 rounded-full border border-white/35 px-4 text-xs font-medium uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black", "aria-label": `Abrir carrito, ${cartCount} productos`, children: [_jsx(ShoppingBag, { size: 18, strokeWidth: 1.8 }), _jsx("span", { className: "hidden sm:inline", children: "Bag" }), _jsx("span", { children: cartCount })] }), _jsx("button", { type: "button", onClick: () => setMenuOpen((value) => !value), className: "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/35 text-white md:hidden", "aria-label": "Abrir men\u00FA", children: menuOpen ? _jsx(X, { size: 20 }) : _jsx(Menu, { size: 20 }) })] })] }), menuOpen && (_jsx(motion.nav, { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, className: "absolute left-5 right-5 top-20 z-[95] grid gap-1 rounded-3xl border border-white/20 bg-[#111]/95 p-3 text-lg font-medium uppercase text-white backdrop-blur-xl md:hidden", children: [
                    ['About', '#story'],
                    ['Drop', '#system'],
                    ['Shop', '#shop'],
                    ['Contact', '#contact'],
                ].map(([label, href]) => (_jsx("a", { href: href, onClick: () => setMenuOpen(false), className: "rounded-2xl px-4 py-3 hover:bg-white/10", children: label }, href))) })), _jsx(FadeIn, { delay: 0.15, y: 40, className: "relative z-10 mt-4 overflow-hidden px-2 sm:mt-1 md:-mt-3", children: _jsx("h1", { className: "hero-heading whitespace-nowrap text-center font-anton text-[19vw] font-black uppercase leading-none tracking-[-0.045em] sm:text-[18vw] md:text-[17vw] lg:text-[16.5vw]", children: "ITI DROP 01" }) }), _jsx(Magnet, { className: "absolute inset-x-0 bottom-0 top-[12%] z-20", children: _jsx(ColorCarousel, { activeIndex: activeIndex, navigate: navigate, selectIndex: selectIndex }) }), _jsxs("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 z-[70] flex items-end justify-between gap-5 px-5 pb-5 sm:px-8 sm:pb-8 md:px-10 md:pb-10", children: [_jsxs(FadeIn, { delay: 0.35, y: 20, className: "pointer-events-auto max-w-[235px] sm:max-w-[315px]", children: [_jsx("p", { className: "mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/65 sm:text-xs", children: product.capsule }), _jsx("h2", { className: "text-balance text-lg font-semibold uppercase leading-[1.05] text-white sm:text-2xl", children: product.name }), _jsxs("div", { className: "mt-2 flex items-center gap-3 text-sm uppercase tracking-wider text-white/85", children: [_jsx("span", { children: product.color }), _jsx("span", { className: "h-1 w-1 rounded-full bg-white/50" }), _jsx("span", { children: product.price })] }), _jsxs("div", { className: "mt-4 flex items-center gap-2", children: [_jsx("button", { type: "button", onClick: () => navigate('prev'), className: "inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white transition hover:scale-105 hover:bg-white hover:text-black sm:h-14 sm:w-14", "aria-label": "Color anterior", children: _jsx(ArrowLeft, { size: 23, strokeWidth: 2.1 }) }), _jsx("button", { type: "button", onClick: () => navigate('next'), className: "inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white transition hover:scale-105 hover:bg-white hover:text-black sm:h-14 sm:w-14", "aria-label": "Color siguiente", children: _jsx(ArrowRight, { size: 23, strokeWidth: 2.1 }) }), _jsx("div", { className: "ml-1 hidden items-center gap-1.5 sm:flex", children: PRODUCTS.map((item, index) => (_jsx("button", { type: "button", "aria-label": `Seleccionar ${item.color}`, onClick: () => selectIndex(index), className: cn('h-4 rounded-full border border-white/60 transition-all', index === activeIndex ? 'w-10' : 'w-4 opacity-65 hover:opacity-100'), style: { backgroundColor: item.bg } }, item.id))) })] })] }), _jsxs(FadeIn, { delay: 0.5, y: 20, className: "pointer-events-auto flex flex-col items-end gap-4", children: [_jsxs("a", { href: "#shop", className: "group inline-flex items-center gap-2 font-anton text-[clamp(1.45rem,4vw,3.6rem)] uppercase leading-none text-white transition hover:translate-x-1", children: ["Discover drop", _jsx(ArrowRight, { className: "h-6 w-6 transition group-hover:translate-x-1 sm:h-9 sm:w-9", strokeWidth: 2.1 })] }), _jsxs("a", { href: "#lookbook", className: "hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 sm:flex", children: ["Scroll to explore ", _jsx(ArrowDown, { size: 16 })] })] })] })] }));
}
function MarqueeSection() {
    const sectionRef = useRef(null);
    const [offset, setOffset] = useState(0);
    const rowOne = PRODUCTS.map((item) => ({ ...item, label: item.color }));
    const rowTwo = [...PRODUCTS].reverse().map((item) => ({ ...item, label: `${item.capsule}` }));
    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const section = sectionRef.current;
                if (!section)
                    return;
                const sectionTop = section.offsetTop;
                setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
            });
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);
    const Row = ({ items, direction }) => {
        const repeated = [...items, ...items, ...items, ...items];
        const value = direction === 'right' ? offset - 420 : -(offset - 420);
        return (_jsx("div", { className: "flex w-max gap-3", style: { transform: `translate3d(${value}px,0,0)`, willChange: 'transform' }, children: repeated.map((item, index) => (_jsxs("div", { className: "relative h-[240px] w-[310px] shrink-0 overflow-hidden rounded-[28px] border border-white/10 sm:h-[270px] sm:w-[420px]", style: { backgroundColor: item.bg }, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10" }), _jsx("img", { src: item.src, alt: "", loading: "lazy", className: "absolute bottom-[-24%] left-1/2 h-[132%] w-auto max-w-none -translate-x-1/2 object-contain" }), _jsx("p", { className: "absolute bottom-4 left-5 z-10 text-xs font-medium uppercase tracking-[0.18em] text-white", children: item.label })] }, `${direction}-${item.id}-${index}`))) }));
    };
    return (_jsx("section", { id: "lookbook", ref: sectionRef, className: "overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40", children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(Row, { items: rowOne, direction: "right" }), _jsx(Row, { items: rowTwo, direction: "left" })] }) }));
}
function StorySection() {
    const story = 'ITI convierte la cultura del motor europeo en una identidad de streetwear. Drop 01 comienza con una sola pieza, cuatro colores y una forma distinta de descubrir cada variante. No context. Just movement.';
    return (_jsxs("section", { id: "story", className: "relative flex min-h-screen items-center overflow-hidden bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-10", children: [_jsx(FadeIn, { delay: 0.1, x: -80, y: 0, duration: 0.9, className: "absolute left-[2%] top-[4%] w-[95px] sm:w-[135px] md:left-[4%] md:w-[180px]", children: _jsx("img", { src: PRODUCTS[0].src, alt: "", className: "w-full opacity-85" }) }), _jsx(FadeIn, { delay: 0.25, x: -80, y: 0, duration: 0.9, className: "absolute bottom-[4%] left-[4%] w-[85px] sm:left-[9%] sm:w-[120px] md:w-[160px]", children: _jsx("img", { src: PRODUCTS[3].src, alt: "", className: "w-full opacity-75" }) }), _jsx(FadeIn, { delay: 0.15, x: 80, y: 0, duration: 0.9, className: "absolute right-[1%] top-[5%] w-[100px] sm:right-[3%] sm:w-[145px] md:w-[190px]", children: _jsx("img", { src: PRODUCTS[2].src, alt: "", className: "w-full opacity-85" }) }), _jsx(FadeIn, { delay: 0.3, x: 80, y: 0, duration: 0.9, className: "absolute bottom-[4%] right-[3%] w-[90px] sm:right-[8%] sm:w-[125px] md:w-[170px]", children: _jsx("img", { src: PRODUCTS[1].src, alt: "", className: "w-full opacity-75" }) }), _jsxs("div", { className: "relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 sm:gap-14 md:gap-16", children: [_jsxs(FadeIn, { y: 40, className: "text-center", children: [_jsx("p", { className: "mb-4 text-xs uppercase tracking-[0.28em] text-[#D7E2EA]/60", children: "No context / Just movement" }), _jsx("h2", { className: "hero-heading font-anton text-[clamp(4rem,13vw,11rem)] uppercase leading-[0.82] tracking-[-0.04em]", children: "About ITI" })] }), _jsx("div", { className: "max-w-3xl rounded-[36px] border border-white/10 bg-black/25 px-5 py-8 backdrop-blur-sm sm:px-10 sm:py-10", children: _jsx(AnimatedText, { text: story }) }), _jsx(FadeIn, { delay: 0.2, y: 20, children: _jsxs(PillButton, { href: "#shop", children: ["See Drop 01 ", _jsx(ArrowRight, { size: 18 })] }) })] })] }));
}
function SystemSection() {
    return (_jsxs("section", { id: "system", className: "relative rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32", children: [_jsxs(FadeIn, { y: 40, children: [_jsx("p", { className: "mb-5 text-center text-xs font-medium uppercase tracking-[0.28em] opacity-45", children: "The Drop System" }), _jsx("h2", { className: "text-center font-anton text-[clamp(4rem,13vw,11rem)] uppercase leading-none tracking-[-0.04em]", children: "DROP 01" })] }), _jsxs("div", { className: "mx-auto mt-16 max-w-6xl sm:mt-20 md:mt-28", children: [SYSTEM_ITEMS.map((item, index) => (_jsx(FadeIn, { delay: index * 0.07, y: 30, children: _jsxs("article", { className: "grid grid-cols-[88px_1fr] items-start gap-5 border-t border-black/15 py-8 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-10 md:grid-cols-[260px_1fr] md:py-12", children: [_jsx("span", { className: "font-anton text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.8] tracking-[-0.03em]", children: item.number }), _jsxs("div", { className: "pt-1 sm:pt-3", children: [_jsx("h3", { className: "text-[clamp(1.1rem,2.4vw,2.2rem)] font-medium uppercase tracking-[-0.01em]", children: item.name }), _jsx("p", { className: "mt-3 max-w-2xl text-[clamp(.9rem,1.5vw,1.2rem)] font-light leading-relaxed opacity-60", children: item.description })] })] }) }, item.number))), _jsx("div", { className: "border-t border-black/15" })] })] }));
}
function ProductCard({ product, index, total, onAdd, }) {
    const containerRef = useRef(null);
    const [size, setSize] = useState('M');
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    const targetScale = 1 - (total - 1 - index) * 0.028;
    const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
    return (_jsx("div", { ref: containerRef, className: "relative h-[92vh] min-h-[720px]", children: _jsx(motion.article, { style: { scale, top: `${96 + index * 18}px` }, className: "sticky mx-auto grid h-[76vh] min-h-[610px] max-w-7xl overflow-hidden rounded-[36px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8", children: _jsxs("div", { className: "grid h-full gap-4 lg:grid-cols-[.8fr_1.2fr] lg:gap-6", children: [_jsxs("div", { className: "relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[28px] p-5 sm:rounded-[40px] sm:p-7", style: { backgroundColor: product.bg }, children: [_jsxs("div", { className: "relative z-20 flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-[0.2em] text-white/70", children: product.capsule }), _jsxs("p", { className: "mt-2 font-anton text-[clamp(3.5rem,8vw,8rem)] leading-none text-white", children: ["0", index + 1] })] }), _jsx("span", { className: "rounded-full border border-white/50 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white", children: product.color })] }), _jsx("img", { src: product.src, alt: `${product.name} — ${product.color}`, loading: "lazy", className: "absolute bottom-[-20%] left-1/2 h-[120%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,.35)] sm:bottom-[-26%] sm:h-[132%]" }), _jsx("p", { className: "relative z-20 max-w-[180px] text-xs uppercase leading-relaxed tracking-[0.14em] text-white/75", children: product.note })] }), _jsxs("div", { className: "flex flex-col justify-between rounded-[28px] border border-white/12 bg-[#111] p-5 sm:rounded-[40px] sm:p-7 md:p-9", children: [_jsxs("div", { className: "flex items-start justify-between gap-5", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-[#D7E2EA]/55", children: "Current piece" }), _jsx("h3", { className: "mt-4 max-w-xl text-[clamp(2rem,4vw,4.8rem)] font-semibold uppercase leading-[.92] tracking-[-.035em] text-[#D7E2EA]", children: product.name })] }), _jsx("span", { className: "whitespace-nowrap text-lg font-medium text-[#D7E2EA] sm:text-2xl", children: product.price })] }), _jsxs("div", { className: "my-6 grid gap-5 border-y border-white/12 py-5 sm:grid-cols-2 sm:gap-8 sm:py-7", children: [_jsxs("div", { children: [_jsx("p", { className: "mb-3 text-[10px] uppercase tracking-[0.2em] text-[#D7E2EA]/50", children: "Colour" }), _jsxs("div", { className: "flex items-center gap-3 text-sm uppercase tracking-wider text-[#D7E2EA]", children: [_jsx("span", { className: "h-5 w-5 rounded-full border border-white/40", style: { backgroundColor: product.bg } }), product.color] })] }), _jsxs("div", { children: [_jsx("p", { className: "mb-3 text-[10px] uppercase tracking-[0.2em] text-[#D7E2EA]/50", children: "Select size" }), _jsx("div", { className: "flex flex-wrap gap-2", children: SIZES.map((option) => (_jsx("button", { type: "button", onClick: () => setSize(option), className: cn('h-10 min-w-10 rounded-full border px-3 text-xs font-medium transition', size === option
                                                        ? 'border-[#D7E2EA] bg-[#D7E2EA] text-[#0C0C0C]'
                                                        : 'border-white/25 text-[#D7E2EA] hover:border-white'), children: option }, option))) })] })] }), _jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [_jsx("p", { className: "max-w-md text-sm font-light leading-relaxed text-[#D7E2EA]/60", children: "Selecciona talla y a\u00F1ade la variante al carrito. La conexi\u00F3n final con stock y proveedor se realizar\u00E1 desde nuestra tienda oficial." }), _jsxs("button", { type: "button", onClick: () => onAdd(product.id, size), className: "group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:scale-[1.03]", style: { backgroundColor: product.panel }, children: ["Add to bag ", _jsx(ShoppingBag, { size: 18 })] })] })] })] }) }) }));
}
function ShopSection({ onAdd }) {
    return (_jsxs("section", { id: "shop", className: "relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-3 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-8 md:pt-32", children: [_jsxs(FadeIn, { y: 40, className: "mb-14 text-center sm:mb-20", children: [_jsx("p", { className: "mb-4 text-xs uppercase tracking-[0.28em] text-[#D7E2EA]/50", children: "Choose your colour" }), _jsx("h2", { className: "hero-heading font-anton text-[clamp(4rem,13vw,11rem)] uppercase leading-none tracking-[-0.04em]", children: "Shop Drop" })] }), _jsx("div", { className: "mx-auto max-w-[1500px]", children: PRODUCTS.map((product, index) => (_jsx(ProductCard, { product: product, index: index, total: PRODUCTS.length, onAdd: onAdd }, product.id))) })] }));
}
function SizeAndNewsletter() {
    return (_jsx("section", { className: "bg-[#0C0C0C] px-5 pb-10 pt-8 sm:px-8 md:px-10", children: _jsxs("div", { className: "mx-auto grid max-w-7xl overflow-hidden rounded-[36px] border border-white/15 lg:grid-cols-2 lg:rounded-[60px]", children: [_jsxs(FadeIn, { className: "p-7 sm:p-10 md:p-14", y: 30, children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-white/45", children: "Fit notes" }), _jsx("h2", { className: "mt-5 font-anton text-[clamp(3.5rem,8vw,7rem)] uppercase leading-[.9] text-white", children: "Find your size" }), _jsx("p", { className: "mt-6 max-w-xl text-base font-light leading-relaxed text-white/60", children: "La tabla queda lista para sustituir sus medidas por las medidas oficiales del proveedor antes del lanzamiento." }), _jsxs("div", { className: "mt-9 overflow-hidden rounded-3xl border border-white/15", children: [_jsxs("div", { className: "grid grid-cols-4 bg-white/8 px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-white/50", children: [_jsx("span", { children: "Size" }), _jsx("span", { children: "Chest" }), _jsx("span", { children: "Length" }), _jsx("span", { children: "Sleeve" })] }), [
                                    ['S', '— cm', '— cm', '— cm'],
                                    ['M', '— cm', '— cm', '— cm'],
                                    ['L', '— cm', '— cm', '— cm'],
                                    ['XL', '— cm', '— cm', '— cm'],
                                ].map((row) => (_jsx("div", { className: "grid grid-cols-4 border-t border-white/10 px-4 py-4 text-center text-sm text-white/80", children: row.map((cell) => _jsx("span", { children: cell }, cell)) }, row[0])))] })] }), _jsxs(FadeIn, { delay: 0.12, className: "relative flex min-h-[520px] flex-col justify-between overflow-hidden bg-white p-7 text-[#0C0C0C] sm:p-10 md:p-14", y: 30, children: [_jsx("img", { src: "./assets/iti-logo.png", alt: "", className: "absolute -right-16 -top-14 h-[330px] w-[330px] opacity-[0.07] invert" }), _jsxs("div", { className: "relative z-10", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] opacity-45", children: "Early access" }), _jsx("h2", { className: "mt-5 font-anton text-[clamp(3.5rem,8vw,7rem)] uppercase leading-[.88]", children: "Enter the paddock" }), _jsx("p", { className: "mt-6 max-w-lg text-base font-light leading-relaxed opacity-60", children: "Acceso anticipado a nuevos drops, reposiciones y piezas todav\u00EDa no publicadas." })] }), _jsxs("form", { className: "relative z-10 mt-12", onSubmit: (event) => {
                                event.preventDefault();
                                const form = event.currentTarget;
                                const button = form.querySelector('button');
                                if (button)
                                    button.textContent = 'WELCOME TO ITI';
                                form.reset();
                            }, children: [_jsx("label", { htmlFor: "email", className: "sr-only", children: "Tu correo electr\u00F3nico" }), _jsxs("div", { className: "flex items-center gap-2 border-b-2 border-black pb-3", children: [_jsx("input", { id: "email", name: "email", type: "email", required: true, placeholder: "YOUR EMAIL", className: "min-w-0 flex-1 bg-transparent text-lg font-medium uppercase placeholder:text-black/35 focus:outline-none" }), _jsx("button", { type: "submit", className: "inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition hover:scale-105", "aria-label": "Unirse", children: _jsx(ArrowRight, { size: 20 }) })] })] })] })] }) }));
}
function Footer({ onOpenCart, cartCount }) {
    return (_jsx("footer", { id: "contact", className: "bg-[#0C0C0C] px-5 pb-8 pt-20 text-[#D7E2EA] sm:px-8 md:px-10", children: _jsxs("div", { className: "mx-auto max-w-7xl border-t border-white/15 pt-8", children: [_jsxs("div", { className: "grid gap-10 md:grid-cols-[1.4fr_.6fr_.6fr]", children: [_jsxs("div", { children: [_jsx("img", { src: "./assets/iti-logo.png", alt: "ITI", className: "h-24 w-24 object-contain" }), _jsx("p", { className: "mt-5 max-w-sm text-sm font-light uppercase leading-relaxed tracking-[0.13em] text-white/50", children: "European motor culture translated into streetwear." })] }), _jsxs("div", { className: "grid content-start gap-3 text-sm uppercase tracking-[0.16em]", children: [_jsx("p", { className: "mb-2 text-[10px] text-white/35", children: "Explore" }), _jsx("a", { href: "#story", className: "hover:opacity-60", children: "About" }), _jsx("a", { href: "#system", className: "hover:opacity-60", children: "Drop 01" }), _jsx("a", { href: "#shop", className: "hover:opacity-60", children: "Shop" }), _jsxs("button", { type: "button", onClick: onOpenCart, className: "text-left uppercase hover:opacity-60", children: ["Bag (", cartCount, ")"] })] }), _jsxs("div", { className: "grid content-start gap-3 text-sm uppercase tracking-[0.16em]", children: [_jsx("p", { className: "mb-2 text-[10px] text-white/35", children: "Social" }), _jsxs("a", { href: "https://instagram.com", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 hover:opacity-60", children: ["Instagram ", _jsx(Instagram, { size: 15 })] }), _jsx("a", { href: "mailto:hello@iti-store.com", className: "hover:opacity-60", children: "Contact" }), _jsxs("a", { href: "#top", className: "inline-flex items-center gap-2 hover:opacity-60", children: ["Back to top ", _jsx(ArrowRight, { size: 15, className: "-rotate-90" })] })] })] }), _jsxs("div", { className: "mt-20 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.2em] text-white/35 sm:flex-row sm:items-center sm:justify-between", children: [_jsx("p", { children: "ITI \u00A9 2026" }), _jsx("p", { children: "Spain / EUR" }), _jsx("p", { children: "Drop 01 \u2014 No Context" })] })] }) }));
}
function CartDrawer({ open, lines, onClose, onChangeQuantity, }) {
    const totalCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const displayTotal = (totalCount * 64.9).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
    });
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);
    return (_jsxs(_Fragment, { children: [_jsx(motion.button, { type: "button", "aria-label": "Cerrar carrito", onClick: onClose, initial: false, animate: { opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }, className: "fixed inset-0 z-[120] bg-black/65 backdrop-blur-sm" }), _jsxs(motion.aside, { initial: false, animate: { x: open ? 0 : '100%' }, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] }, className: "fixed bottom-0 right-0 top-0 z-[130] flex w-full max-w-[480px] flex-col bg-[#F4F3EF] text-[#0C0C0C] shadow-2xl", "aria-hidden": !open, children: [_jsxs("div", { className: "flex items-center justify-between border-b border-black/15 px-5 py-5 sm:px-7", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] opacity-45", children: "ITI Drop 01" }), _jsxs("h2", { className: "mt-1 text-2xl font-semibold uppercase", children: ["Your bag (", totalCount, ")"] })] }), _jsx("button", { type: "button", onClick: onClose, className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/20 transition hover:bg-black hover:text-white", "aria-label": "Cerrar", children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "no-scrollbar flex-1 overflow-y-auto p-5 sm:p-7", children: lines.length === 0 ? (_jsxs("div", { className: "flex h-full flex-col items-center justify-center text-center", children: [_jsx(ShoppingBag, { size: 44, strokeWidth: 1.2, className: "opacity-35" }), _jsx("p", { className: "mt-5 text-xl font-medium uppercase", children: "Your bag is empty" }), _jsx("p", { className: "mt-2 max-w-xs text-sm font-light opacity-55", children: "Selecciona un color y una talla del Drop 01 para a\u00F1adirlos." }), _jsx("button", { type: "button", onClick: onClose, className: "mt-7 rounded-full bg-black px-7 py-3 text-xs font-medium uppercase tracking-[0.16em] text-white", children: "Continue shopping" })] })) : (_jsx("div", { className: "grid gap-4", children: lines.map((line) => {
                                const product = PRODUCTS.find((item) => item.id === line.productId);
                                return (_jsxs("article", { className: "grid grid-cols-[112px_1fr] gap-4 rounded-3xl border border-black/12 bg-white p-3", children: [_jsx("div", { className: "relative h-[145px] overflow-hidden rounded-2xl", style: { backgroundColor: product.bg }, children: _jsx("img", { src: product.src, alt: "", className: "absolute bottom-[-18%] left-1/2 h-[120%] w-auto max-w-none -translate-x-1/2" }) }), _jsxs("div", { className: "flex min-w-0 flex-col justify-between py-1", children: [_jsxs("div", { children: [_jsx("p", { className: "truncate text-sm font-semibold uppercase", children: product.name }), _jsxs("p", { className: "mt-1 text-xs uppercase tracking-wider opacity-55", children: [product.color, " / ", line.size] }), _jsx("p", { className: "mt-2 text-sm font-medium", children: product.price })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "inline-flex items-center rounded-full border border-black/15", children: [_jsx("button", { type: "button", onClick: () => onChangeQuantity(line.productId, line.size, -1), className: "inline-flex h-9 w-9 items-center justify-center", "aria-label": "Restar unidad", children: _jsx(Minus, { size: 14 }) }), _jsx("span", { className: "min-w-6 text-center text-sm", children: line.quantity }), _jsx("button", { type: "button", onClick: () => onChangeQuantity(line.productId, line.size, 1), className: "inline-flex h-9 w-9 items-center justify-center", "aria-label": "A\u00F1adir unidad", children: _jsx(Plus, { size: 14 }) })] }), _jsx(Check, { size: 18, className: "opacity-35" })] })] })] }, `${line.productId}-${line.size}`));
                            }) })) }), _jsxs("div", { className: "border-t border-black/15 p-5 sm:p-7", children: [_jsxs("div", { className: "mb-5 flex items-center justify-between text-sm uppercase tracking-wider", children: [_jsx("span", { children: "Estimated total" }), _jsx("strong", { className: "text-lg", children: displayTotal })] }), _jsxs("button", { type: "button", disabled: lines.length === 0, onClick: () => alert('En nuestra tienda oficial, este botón abrirá el checkout real con las variantes seleccionadas.'), className: "flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-black px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-35", children: ["Checkout ", _jsx(ChevronRight, { size: 18 })] }), _jsx("p", { className: "mt-4 text-center text-[10px] uppercase leading-relaxed tracking-[0.12em] opacity-45", children: "Demo visual. El checkout se conectar\u00E1 al carrito real de nuestra tienda oficial." })] })] })] }));
}
export default function App() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartLines, setCartLines] = useState(() => {
        try {
            const stored = localStorage.getItem('iti-cart');
            return stored ? JSON.parse(stored) : [];
        }
        catch {
            return [];
        }
    });
    useEffect(() => {
        PRODUCTS.forEach(({ src }) => {
            const image = new Image();
            image.src = src;
        });
    }, []);
    useEffect(() => {
        localStorage.setItem('iti-cart', JSON.stringify(cartLines));
    }, [cartLines]);
    const navigate = useCallback((direction) => {
        if (isAnimating)
            return;
        setIsAnimating(true);
        setActiveIndex((current) => direction === 'next'
            ? (current + 1) % PRODUCTS.length
            : (current + PRODUCTS.length - 1) % PRODUCTS.length);
        window.setTimeout(() => setIsAnimating(false), 650);
    }, [isAnimating]);
    const selectIndex = useCallback((index) => {
        if (isAnimating || index === activeIndex)
            return;
        setIsAnimating(true);
        setActiveIndex(index);
        window.setTimeout(() => setIsAnimating(false), 650);
    }, [activeIndex, isAnimating]);
    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'ArrowRight')
                navigate('next');
            if (event.key === 'ArrowLeft')
                navigate('prev');
            if (event.key === 'Escape')
                setCartOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [navigate]);
    const addToCart = (productId, size) => {
        setCartLines((current) => {
            const existing = current.find((line) => line.productId === productId && line.size === size);
            if (existing) {
                return current.map((line) => line.productId === productId && line.size === size
                    ? { ...line, quantity: line.quantity + 1 }
                    : line);
            }
            return [...current, { productId, size, quantity: 1 }];
        });
        setCartOpen(true);
    };
    const changeQuantity = (productId, size, delta) => {
        setCartLines((current) => current
            .map((line) => line.productId === productId && line.size === size
            ? { ...line, quantity: line.quantity + delta }
            : line)
            .filter((line) => line.quantity > 0));
    };
    const cartCount = useMemo(() => cartLines.reduce((sum, line) => sum + line.quantity, 0), [cartLines]);
    return (_jsxs("main", { className: "overflow-x-clip bg-[#0C0C0C] font-kanit", children: [_jsx(Hero, { activeIndex: activeIndex, navigate: navigate, selectIndex: selectIndex, onOpenCart: () => setCartOpen(true), cartCount: cartCount }), _jsx(MarqueeSection, {}), _jsx(StorySection, {}), _jsx(SystemSection, {}), _jsx(ShopSection, { onAdd: addToCart }), _jsx(SizeAndNewsletter, {}), _jsx(Footer, { onOpenCart: () => setCartOpen(true), cartCount: cartCount }), _jsx(CartDrawer, { open: cartOpen, lines: cartLines, onClose: () => setCartOpen(false), onChangeQuantity: changeQuantity })] }));
}
