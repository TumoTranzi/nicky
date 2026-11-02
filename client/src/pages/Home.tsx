import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Menu,
  Quote,
  Sparkles,
  X,
} from "lucide-react";

type Photo = {
  src: string;
  alt: string;
  label: string;
  note: string;
};

const photos: Photo[] = [
  {
    src: "/images/memory-01.jpg",
    alt: "A smiling portrait in a white bucket hat under a bright blue sky",
    label: "the first light",
    note: "A little bit of sunshine, kept forever.",
  },
  {
    src: "/images/memory-02.jpg",
    alt: "A portrait walking down a sunlit street",
    label: "on the way",
    note: "Somewhere between now and always.",
  },
  {
    src: "/images/memory-03.jpg",
    alt: "A playful portrait beside a warm brick wall",
    label: "soft afternoons",
    note: "The kind of day that asks you to stay.",
  },
  {
    src: "/images/memory-04.jpg",
    alt: "A relaxed portrait in a sunlit doorway",
    label: "golden hour",
    note: "Everything looked a little more golden.",
  },
  {
    src: "/images/memory-05.jpg",
    alt: "A figure walking away across an open sandy landscape",
    label: "keep walking",
    note: "I will find you in every horizon.",
  },
  {
    src: "/images/memory-06.jpg",
    alt: "A close portrait looking into the camera in a dark knit top",
    label: "the quiet kind",
    note: "The moments that do not need a caption.",
  },
  {
    src: "/images/memory-07.jpg",
    alt: "A portrait beside water wearing a graphic top",
    label: "somewhere blue",
    note: "A memory with its own tide.",
  },
  {
    src: "/images/memory-08.jpg",
    alt: "A close portrait with a calm expression",
    label: "right here",
    note: "My favorite place is still beside you.",
  },
  {
    src: "/images/memory-09.jpg",
    alt: "A portrait looking back in a cozy indoor space",
    label: "little rituals",
    note: "The ordinary, made extraordinary.",
  },
  {
    src: "/images/memory-10.jpg",
    alt: "A playful portrait in a long grey sweater under a roof",
    label: "the in-between",
    note: "Where the best stories usually happen.",
  },
  {
    src: "/images/memory-11.jpg",
    alt: "A black and white portrait looking over a shoulder",
    label: "still becoming",
    note: "And still my favorite view.",
  },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
      if (event.key === "ArrowRight") setSelectedPhoto(current => current === null ? null : (current + 1) % photos.length);
      if (event.key === "ArrowLeft") setSelectedPhoto(current => current === null ? null : (current - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  const openPhoto = (index: number) => setSelectedPhoto(index);

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ever After home">
          <span className="wordmark-mark"><Heart size={14} fill="currentColor" /></span>
          <span>ever after</span>
        </a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#story" onClick={() => setMenuOpen(false)}>our story</a>
          <a href="#memories" onClick={() => setMenuOpen(false)}>memories</a>
          <a href="#letter" onClick={() => setMenuOpen(false)}>a little letter</a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="eyebrow-line" /> an archive of us</p></Reveal>
          <Reveal className="hero-title-wrap">
            <h1 id="hero-title">Somewhere between<br /><em>now</em> and always.</h1>
          </Reveal>
          <Reveal className="hero-intro">
            <p>A small collection of the big feeling — the sunlight, the laughter, the quiet moments that somehow became everything.</p>
          </Reveal>
          <Reveal className="hero-action-wrap">
            <a className="text-link" href="#story">begin the story <ArrowDown size={15} /></a>
          </Reveal>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-image-frame">
            <img src={photos[0].src} alt={photos[0].alt} className="hero-image" />
            <span className="hero-stamp">chapter<br /><strong>01</strong></span>
            <span className="hero-caption">a little light, kept close</span>
          </div>
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
        </div>
        <div className="hero-side-note">made of moments <span>✳</span> and you</div>
      </section>

      <section className="story-section section-pad" id="story" aria-labelledby="story-title">
        <div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>the beginning, and all the little things after</span></div>
        <div className="story-grid">
          <Reveal className="story-heading">
            <p className="eyebrow">a love note in three acts</p>
            <h2 id="story-title">It was never<br /><em>just</em> a moment.</h2>
          </Reveal>
          <Reveal className="story-body">
            <p className="lead-copy">It was the way the day changed when you walked into it.</p>
            <p>In the bright, ordinary hours, you made room for wonder. In the quiet ones, you made everything feel softer. This is a little place for the moments we would rather keep than explain.</p>
            <p>Not a timeline. Not a perfect story. Just proof that the best things can be beautifully, wonderfully unplanned.</p>
            <div className="signature-line"><span>with all my heart</span><Heart size={18} fill="currentColor" /></div>
          </Reveal>
        </div>
      </section>

      <section className="memories-section section-pad" id="memories" aria-labelledby="memories-title">
        <div className="memories-heading">
          <Reveal><div className="section-kicker"><span>02</span><span className="kicker-rule" /><span>the memory archive</span></div></Reveal>
          <Reveal className="memories-title-row">
            <h2 id="memories-title">A few of my<br /><em>favorite</em> views.</h2>
            <p>Tap a frame to linger a little longer.<br />Every image is a small way of saying: I remember.</p>
          </Reveal>
        </div>
        <div className="memory-grid">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} className={`memory-card memory-card-${index + 1}`}>
              <button type="button" className="memory-button" onClick={() => openPhoto(index)} aria-label={`Open memory: ${photo.label}`}>
                <img src={photo.src} alt={photo.alt} loading={index > 2 ? "lazy" : "eager"} />
                <span className="memory-overlay" />
                <span className="memory-meta"><small>{String(index + 1).padStart(2, "0")}</small><strong>{photo.label}</strong><ArrowUpRight size={16} /></span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="quote-band" aria-label="Love quote">
        <div className="quote-mark"><Quote size={20} /></div>
        <Reveal><p>“The ordinary becomes<br /><em>extraordinary</em> when it is ours.”</p></Reveal>
        <span className="quote-spark" aria-hidden="true">✳</span>
      </section>

      <section className="letter-section section-pad" id="letter" aria-labelledby="letter-title">
        <div className="section-kicker"><span>03</span><span className="kicker-rule" /><span>unfold when you need a little softness</span></div>
        <div className="letter-layout">
          <Reveal className="letter-intro">
            <span className="tiny-star"><Sparkles size={17} /></span>
            <p className="eyebrow">a little letter</p>
            <h2 id="letter-title">For the days<br />you forget<br /><em>how loved</em><br />you are.</h2>
          </Reveal>
          <Reveal className="letter-card">
            <div className="letter-card-top"><span>dear you,</span><span>∞</span></div>
            <p>There are a thousand ways to say it, but I keep coming back to the simplest one: I am so glad you are here.</p>
            <p>Thank you for making a home out of the in-between. For the jokes, the patience, the beautiful chaos. For every version of us still on its way.</p>
            <p>Wherever the next chapter takes us, I hope you know this much — you are my favorite part of the story.</p>
            <div className="letter-signoff"><span>always,</span><strong>me</strong></div>
          </Reveal>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="closing-title">
        <div className="closing-image" aria-hidden="true"><img src={photos[5].src} alt="" /></div>
        <div className="closing-content">
          <Reveal><span className="closing-spark">✳</span></Reveal>
          <Reveal><p className="eyebrow">and so the story goes on</p></Reveal>
          <Reveal><h2 id="closing-title">Meet me in<br /><em>the next moment.</em></h2></Reveal>
          <Reveal><a className="closing-link" href="#top">keep this close <ArrowUpRight size={16} /></a></Reveal>
        </div>
        <div className="closing-footer"><span>ever after / 2026</span><span>made with intention</span><span>♡</span></div>
      </section>

      {selectedPhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded memory image" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" type="button" aria-label="Close image viewer" onClick={() => setSelectedPhoto(null)}><X size={21} /></button>
          <button className="lightbox-arrow lightbox-prev" type="button" aria-label="Previous image" onClick={event => { event.stopPropagation(); setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length); }}><ChevronLeft size={24} /></button>
          <figure className="lightbox-figure" onClick={event => event.stopPropagation()}>
            <img src={photos[selectedPhoto].src} alt={photos[selectedPhoto].alt} />
            <figcaption><span>{String(selectedPhoto + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span><strong>{photos[selectedPhoto].note}</strong></figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" aria-label="Next image" onClick={event => { event.stopPropagation(); setSelectedPhoto((selectedPhoto + 1) % photos.length); }}><ChevronRight size={24} /></button>
        </div>
      )}
    </main>
  );
}
