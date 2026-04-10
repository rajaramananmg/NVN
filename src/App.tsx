/**
 * Narthana Vinayagar Natyalaya - Complete Landing Page
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, px } from 'motion/react';
import {
  Menu, X, MapPin, Phone, Clock, ChevronRight,
  Facebook, Star, ExternalLink, ArrowUp, Play
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Programs', href: '#programs' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

const PROGRAMS = [
  {
    id: '01',
    title: 'Bharatanatyam for Kids',
    description: 'Building focus, posture, and discipline from a young age through rhythmic movements and sacred stories. Patient, step-by-step teaching so children learn thoroughly.',
    tag: 'Affordable Monthly Plans',
    emoji: '🪷',
    dark: false,
  },
  {
    id: '02',
    title: 'Bharatanatyam for Ladies',
    description: 'A graceful way to reconnect with culture while improving physical fitness, confidence, and mental well-being with flexible batch timings.',
    tag: 'Flexible Batch Timings',
    emoji: '🌸',
    dark: true,
  },
  {
    id: '03',
    title: 'Arangetram Preparation',
    description: 'Preparing students for their Arangetram debut with complete guidance in technique, expression, stamina, and stage confidence.',
    tag: 'ARANGETRAM SPECIAL TRAINING',
    emoji: '🎭',
    dark: false,
  },
];

const TESTIMONIALS = [
  {
    text: 'Teacher comes very friendly with my kid. No rushing, so children learn thoroughly. Excellent teaching — takes time for every single step.',
    author: 'Divhya Dharshnee',
    role: 'Parent',
    rating: 5,
  },
  {
    text: "Skillful and graceful trainer. The right place to pursue your child's passion — easy accessibility and very affordable teaching cost.",
    author: 'Deepa G',
    role: 'Parent',
    rating: 5,
  },
  {
    text: 'Bharatanatyam mam is very cooperative and friendly with children. She gave practice to children very well. Thank you mam!',
    author: 'Sandhya Rani',
    role: 'Parent',
    rating: 5,
  },
  {
    text: 'Very good class for beginners and intermediate!',
    author: 'Balaji BG',
    role: 'Student',
    rating: 5,
  },
];

const GALLERY_IMAGES = [
  {
    src: '/gallery/unnamed (4).jpg',
    alt: 'Group Pose',
    large: true,
    type: 'center',
    position: 'top',
  },
  {
    src: '/gallery/unnamed (1).jpg',
    alt: 'Graceful Pose',
    large: false,
  },
  {
    src: '/gallery/unnamed (2).jpg',
    alt: 'Master and Students',
    large: false,
  },
  {
    src: '/gallery/unnamed (3).jpg',
    alt: 'Group Bharatanatyam Pose',
    large: false,
  },
  {
    src: '/gallery/unnamed (5).jpg',
    alt: 'Salangai Pooja',
    large: false,
    type: 'center',
    position: 'top',
  },
];

const STATS = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '200+', label: 'Students Trained' },
  { value: '3', label: 'Expert Programs' },
  { value: '5★', label: 'Google Rating' },
];

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-secondary text-white shadow-xl flex items-center justify-center hover:bg-primary transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [enrollOpen, setEnrollOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden">
      <ScrollToTop />

      {/* ── Enroll Modal ── */}
      <AnimatePresence>
        {enrollOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setEnrollOpen(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-surface rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setEnrollOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container-high transition-colors"
              >
                <X size={18} />
              </button>
              <div className="text-center mb-8">
                <div className="text-4xl mb-3">🪷</div>
                <h3 className="font-headline text-3xl text-primary mb-2">Begin Your Journey</h3>
                <p className="text-on-surface-variant text-sm">Contact us to enroll or visit the academy directly.</p>
              </div>
              <div className="space-y-4">
                <a
                  href="tel:+919841652957"
                  className="flex items-center gap-4 p-4 rounded-xl bg-primary text-white hover:bg-primary-container transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-70">Call Us</p>
                    <p className="font-semibold">098416 52957</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto opacity-50 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://www.facebook.com/p/Narthana-Vinayagar-Natyalaya-100064839124405/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary">
                    <Facebook size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-outline">Find Us On</p>
                    <p className="font-semibold text-on-surface">Facebook Page</p>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-outline group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://maps.app.goo.gl/J2YeADtmUQ9wbnGp8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-outline">Visit Us</p>
                    <p className="font-semibold text-on-surface">Get Directions</p>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-outline group-hover:text-primary transition-colors" />
                </a>
              </div>
              <p className="text-center text-xs text-outline mt-6">Opens 5 PM · Monday – Saturday</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NavBar ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-surface/95 backdrop-blur-xl py-3 shadow-sm border-b border-outline-variant/20' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl sm:text-2xl font-headline font-bold leading-tight tracking-tight text-left"
          >
            <span className={scrolled ? 'text-primary' : 'text-white'}>Narthana</span>{' '}
            <span className="text-secondary italic">Vinayagar Natyalaya</span>
          </button>

          <div className="hidden md:flex items-center gap-8 font-body text-[11px] uppercase tracking-[0.2em] font-semibold">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`relative group transition-colors duration-300 ${scrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => setEnrollOpen(true)}
              className="bg-secondary text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-primary transition-all duration-300 shadow-lg shadow-secondary/30 active:scale-95"
            >
              Enroll Now
            </button>
          </div>

          <button
            className={`md:hidden ${scrolled ? 'text-primary' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-surface/98 backdrop-blur-xl shadow-2xl overflow-hidden md:hidden"
            >
              <div className="px-8 py-8 flex flex-col gap-5">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(link.href)}
                    className="text-2xl font-headline text-on-surface text-left hover:text-primary transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => { setIsMenuOpen(false); setEnrollOpen(true); }}
                  className="bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm w-full mt-2"
                >
                  Enroll Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-24 pt-32 overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            className="w-full h-[120%] object-cover object-top"
            src="/gallery/unnamed (2).jpg"
            alt="Graceful Bharatanatyam dancer"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-[12%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-secondary/10 hidden lg:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10 w-full" style={{ opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-secondary" />
              <span className="text-secondary font-body text-[10px] sm:text-xs uppercase tracking-[0.5em] font-bold">
                The Art of Bharatanatyam · Est. Chennai
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline text-[clamp(3rem,10vw,8rem)] text-white leading-[0.9] tracking-tighter mb-8 max-w-3xl"
            >
              Narthana<br />
              <span className="text-secondary italic font-light">Vinayagar Natyalaya</span><br />
              <span className="text-secondary italic font-light"></span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/75 text-base sm:text-lg max-w-md mb-12 font-light leading-relaxed"
            >
              Bharatanatyam for Kids & Ladies · Arangetram Preparation<br />
              Mogappair East, Chennai
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setEnrollOpen(true)}
                className="group bg-secondary text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs sm:text-sm flex items-center gap-3 hover:bg-white hover:text-primary transition-all duration-300 shadow-xl shadow-black/30 active:scale-95"
              >
                Start Your Journey
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('#about')}
                className="border border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs sm:text-sm flex items-center gap-3 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm active:scale-95"
              >
                <Play size={14} fill="currentColor" />
                Our Story
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute right-10 bottom-0 hidden xl:flex flex-col gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white"
          >
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest mb-1">
              <Star size={12} fill="currentColor" /> Google Reviews
            </div>
            {['Divhya', 'Deepa G', 'Sandhya'].map((name) => (
              <div key={name} className="flex items-center gap-2 text-xs text-white/80">
                <span className="text-secondary">★★★★★</span> {name}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-headline text-4xl sm:text-5xl text-secondary mb-2">{s.value}</div>
                <p className="text-white/60 text-[11px] uppercase tracking-[0.3em] font-semibold">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-24 sm:py-36 bg-surface overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -top-8 -left-8 w-full h-full bg-secondary/5 rounded-[3rem] -z-10" />
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
                  src="/gallery/unnamed.jpg"
                  alt="Bharatanatyam student"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-2xl hidden sm:block"
              >
                <p className="font-headline text-2xl italic leading-snug">Tradition in<br />Every Step.</p>
              </motion.div>
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] uppercase tracking-[0.5em] text-outline font-bold hidden xl:block whitespace-nowrap">
                Established · Mogappair East · Chennai
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px bg-secondary" />
                  <span className="text-secondary font-bold uppercase tracking-[0.4em] text-[11px]">Our Foundation</span>
                </div>
                <h2 className="font-headline text-5xl sm:text-6xl lg:text-7xl text-primary leading-[1.0]">
                  Nurturing Grace Under{' '}
                  <span className="italic text-secondary">Sumathi Mam</span>
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <p className="text-on-surface-variant leading-relaxed font-light">
                  Sumathi mam brings a patient, friendly teaching style that makes classical arts accessible to all ages. She takes time for each step — no rushing, so children learn thoroughly.
                </p>
                <p className="text-on-surface-variant leading-relaxed font-light">
                  Our curriculum focuses on strong fundamentals with thorough step-by-step training for both beginners and intermediate learners. Dance is a journey of patience and devotion.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Patient Teaching', 'Affordable Fees', 'Kids & Ladies', 'Yoga Sessions'].map(chip => (
                  <span key={chip} className="px-4 py-2 rounded-full border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider">
                    {chip}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setEnrollOpen(true)}
                className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all duration-300 shadow-lg active:scale-95"
              >
                Join the Academy
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="py-24 sm:py-36 bg-surface-container-low" id="programs">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-secondary" />
                <span className="text-secondary font-bold uppercase tracking-[0.4em] text-[11px]">Our Curriculum</span>
              </div>
              <h2 className="font-headline text-5xl sm:text-6xl text-primary">Sacred<br />Learning Paths</h2>
            </div>
            <p className="text-on-surface-variant font-light max-w-xs text-sm leading-relaxed">
              Tailored programs designed to nurture talent at every stage of the artistic journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border border-outline-variant/30">
            {PROGRAMS.map((program, idx) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`relative p-10 sm:p-12 group overflow-hidden border-r border-b border-outline-variant/30 last:border-r-0 transition-colors duration-500  ${program.dark ? 'bg-primary text-on-primary hover:bg-primary-container' : 'bg-surface hover:bg-surface-container'}`}
              >
                <div className="absolute top-6 right-8 font-headline text-8xl opacity-5 select-none pointer-events-none">{program.id}</div>
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 inline-block">{program.emoji}</div>
                <h3 className={`font-headline text-3xl mb-5 leading-tight ${program.dark ? 'text-secondary' : 'text-primary'}`}>{program.title}</h3>
                <p className={`mb-10 font-light leading-relaxed text-sm ${program.dark ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>{program.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-secondary">{program.tag}</span>
                  <button
                    onClick={() => setEnrollOpen(true)}
                    className={`flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 ${program.dark ? 'text-white' : 'text-primary'}`}
                  >
                    Enroll <ChevronRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 sm:py-36 bg-surface overflow-hidden" id="testimonials">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-secondary" />
                <span className="text-secondary font-bold uppercase tracking-[0.4em] text-[11px]">Testimonials</span>
              </div>
              <h2 className="font-headline text-5xl sm:text-6xl text-primary">Voices of<br />Grace</h2>
            </div>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`transition-all duration-300 rounded-full ${i === activeTestimonial ? 'w-8 h-3 bg-primary' : 'w-3 h-3 bg-outline-variant hover:bg-secondary'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-surface-container-low rounded-3xl p-10 sm:p-14 border border-outline-variant/20"
            >
              <div className="flex text-secondary text-2xl mb-6">
                {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} size={22} fill="currentColor" />
                ))}
              </div>
              <p className="font-headline text-3xl sm:text-4xl italic text-on-surface leading-relaxed mb-8 max-w-3xl">
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {TESTIMONIALS[activeTestimonial].author[0]}
                </div>
                <div>
                  <p className="font-bold text-on-surface">{TESTIMONIALS[activeTestimonial].author}</p>
                  <p className="text-xs text-outline uppercase tracking-widest">{TESTIMONIALS[activeTestimonial].role} · Verified on Google</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 ${idx === activeTestimonial ? 'border-secondary bg-secondary/5 shadow-md' : 'border-outline-variant/20 bg-surface-container-low hover:border-secondary/30'}`}
              >
                <div className="flex text-secondary text-sm mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-3 mb-4">"{t.text}"</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{t.author}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-24 sm:py-36 bg-surface-container-low" id="gallery">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-secondary" />
                <span className="text-secondary font-bold uppercase tracking-[0.4em] text-[11px]">Visual Journey</span>
              </div>
              <h2 className="font-headline text-5xl sm:text-6xl text-primary leading-tight">
                Moments of <span className="italic">Abhinaya</span>
              </h2>
            </div>
            <a
              href="https://www.facebook.com/p/Narthana-Vinayagar-Natyalaya-100064839124405/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.3em] border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-all"
            >
              View on Facebook <ExternalLink size={12} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[220px]">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`overflow-hidden rounded-2xl group relative ${img.large ? 'col-span-2 row-span-2' : ''}`}
              >

                <img
                  src={img.src}
                  alt={img.alt}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ${img.position === 'top'
                    ? 'object-top'
                    : img.position === 'bottom'
                      ? 'object-bottom'
                      : 'object-center'
                    }`}
                />
                <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.alt}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/70 text-xs uppercase tracking-[0.4em] mb-4 font-bold">Ready to Begin?</p>
            <h2 className="font-headline text-4xl sm:text-6xl text-white mb-8">Join Our Dance Family Today</h2>
            <button
              onClick={() => setEnrollOpen(true)}
              className="bg-white text-primary px-12 py-5 rounded-full font-bold uppercase tracking-[0.25em] text-xs sm:text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-xl active:scale-95"
            >
              Enroll Now — It's Free to Enquire
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-24 sm:py-36 bg-surface" id="contact">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px bg-secondary" />
                  <span className="text-secondary font-bold uppercase tracking-[0.4em] text-[11px]">Find Us</span>
                </div>
                <h2 className="font-headline text-5xl sm:text-6xl text-primary mb-6">Visit Our<br />Mandap</h2>
                <p className="text-on-surface-variant max-w-sm leading-relaxed">
                  Our studio is a sacred space for learning, located in the heart of Mogappair East, Chennai.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface mb-1">Address</p>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      09, Rathinavel Pandian St, Opp. Reliance Fresh,<br />
                      Block 2, J J Nagar, Mogappair East,<br />
                      Chennai, Tamil Nadu 600037
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface mb-1">Phone</p>
                    <a href="tel:+919841652957" className="text-secondary font-semibold hover:text-primary transition-colors">
                      098416 52957
                    </a>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface mb-1">Hours</p>
                    <p className="text-on-surface-variant text-sm">Opens 5:00 PM · Monday – Saturday</p>
                    <p className="text-xs text-outline mt-1">Closed on Sundays & Public Holidays</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://maps.app.goo.gl/J2YeADtmUQ9wbnGp8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all duration-300 shadow-lg active:scale-95"
                >
                  <MapPin size={14} /> Get Directions
                </a>
                <a
                  href="tel:+919841652957"
                  className="inline-flex items-center gap-2 border border-primary text-primary px-7 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all duration-300 active:scale-95"
                >
                  <Phone size={14} /> Call Now
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <a
                href="https://maps.app.goo.gl/J2YeADtmUQ9wbnGp8"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3]"
              >
                <img
                  src="/gallery/map.png"
                  alt="Narthana Vinayagar Natyalaya Session"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
                  >
                    <MapPin size={24} fill="currentColor" />
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 text-xs font-bold text-primary uppercase tracking-wider text-center">
                  Click to open in Google Maps ↗
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-20">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5 space-y-6">
              <div className="font-headline text-3xl sm:text-4xl">
                <span className="text-white">Narthana</span>{' '}
                <span className="text-secondary italic">Vinayagar Natyalaya</span>
              </div>
              <p className="text-white/50 leading-relaxed max-w-xs font-light text-sm">
                Dedicated to the preservation and promotion of Bharatanatyam — fostering a deep connection between tradition and modern expression.
              </p>
              <a
                href="https://www.facebook.com/p/Narthana-Vinayagar-Natyalaya-100064839124405/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/60 hover:text-secondary transition-colors"
              >
                <Facebook size={22} />
                <span className="text-xs uppercase tracking-widest font-bold">Follow on Facebook</span>
              </a>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary mb-6">Navigate</p>
                <ul className="space-y-4 text-sm font-light text-white/60">
                  {NAV_LINKS.map(link => (
                    <li key={link.name}>
                      <button onClick={() => scrollTo(link.href)} className="hover:text-white transition-colors">
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary mb-6">Contact</p>
                <ul className="space-y-4 text-sm font-light text-white/60">
                  <li><a href="tel:+919841652957" className="hover:text-white transition-colors">098416 52957</a></li>
                  <li className="text-xs leading-relaxed">Mogappair East,<br />Chennai 600037</li>
                  <li className="text-xs">Mon–Sat · 5 PM onwards</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary mb-4">Start Learning</p>
              <p className="text-white/50 text-xs leading-relaxed mb-5">
                Enroll your child or join as an adult learner. All levels welcome.
              </p>
              <button
                onClick={() => setEnrollOpen(true)}
                className="bg-secondary text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all duration-300 w-full text-center"
              >
                Enroll Now
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/30">
            <p>© 2025 Narthana Vinayagar Natyalaya · All Rights Reserved</p>
            <p>Crafted with Devotion 🪷</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
