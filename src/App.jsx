import { useState, useMemo } from 'react'
import './App.css'
import { useI18n } from './i18n/useI18n.js'
import { languageList } from './i18n/index.js'

// Gallery image URLs (immutable, language-independent)
const galleryImages = [
  { id: 1, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.42---63e9786f-c982-487f-94c9-2dcdf7f771b1.jpg' },
  { id: 2, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.44_1---b710eed3-4171-44fc-bd24-c198493b5014.jpg' },
  { id: 3, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.44_3---7f136ad7-3aba-41af-ae4f-b37027628fbd.jpg' },
  { id: 4, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.46---027abe06-586c-4bd6-a7e7-e5f68ec4b701.jpg' },
  { id: 5, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.48---4d43794d-9d00-4385-93c8-b0de27f5fd53.jpg' },
  { id: 6, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.52---53de03e2-e65e-4e55-85f9-c33efc62adda.jpg' },
  { id: 7, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.53---4fa3d1bf-e17f-4a2b-93f2-03c05b23b6b6.jpg' },
  { id: 8, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.53_1---38318d48-4ee0-4ade-be66-07053be69b19.jpg' },
  { id: 9, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.53_2---98bf7e10-a297-4a4f-b9cb-f56bb1bbd8f3.jpg' },
  { id: 10, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.54_1---580e206d-b8b7-4171-8c9c-8fa5aa6c7b3f.jpg' },
  { id: 11, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.54_2---932a32bb-22c3-4304-91be-45928de05997.jpg' },
  { id: 12, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.54---39b760a5-61fd-4b4d-96b9-3684482426ff.jpg' },
  { id: 13, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.55_1---f61ae608-a44b-4046-8168-49d6ca231dff.jpg' },
  { id: 14, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.55---7dc71c06-c005-4cd4-bb97-9c1cbeeecfaa.jpg' },
  { id: 15, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.57_1---76547806-d06f-41e1-bece-150c40d22bb9.jpg' },
  { id: 16, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.57---a3dd192c-cef1-4b0c-87e8-073930b230d8.jpg' },
  { id: 17, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.58_1---72cb9df1-c28c-4725-9118-e5ba429d00a4.jpg' },
  { id: 18, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.58---e3dfa61a-3ff0-4f07-a60b-6db2c7f87b4c.jpg' },
  { id: 19, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.59_1---b1cd966b-8f4b-4afa-8c83-c44e366c59b9.jpg' },
  { id: 20, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.47.59---571e0ee3-1827-4ae4-a91e-d4351b34064c.jpg' },
  { id: 21, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.48.00---0cce5bd9-b88a-4762-a00c-e76982e30ffb.jpg' },
  { id: 22, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.48.00_1---3175a809-3e7e-4d96-8041-41bcdc2c06e7.jpg' },
  { id: 23, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.48.00_2---bf9dfb2d-8b66-49fc-9849-385b9b5472f4.jpg' },
  { id: 24, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.48.00_3---2be19105-2bb4-490d-9201-d6a50b663baf.jpg' },
  { id: 25, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.48.01---c1f328b4-a222-4a29-8e56-ef8f4fb2e53f.jpg' },
  { id: 26, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.48.01_1---147413b8-3249-47a4-80bc-b2fe1a6676c2.jpg' },
  { id: 27, src: '/gallery/WhatsApp_Image_2026-06-01_at_23.48.02---0bfcf528-e2d8-4db9-85ca-53cd563d5026.jpg' },
]

function App() {
  const { lang, setLang, t } = useI18n()
  const [activeTab, setActiveTab] = useState('menu')
  const [menuCategory, setMenuCategory] = useState('mains')
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  // Helper: pick the display name based on the current language
  // For CN/EN: the `name` field already holds the localized text
  // For MS:     use the `nameMy` field
  const displayName = (item) => (lang === 'ms' ? item.nameMy : item.name)
  const displayDesc = (item) => (lang === 'ms' ? item.descMy : item.desc)

  // Current language label
  const currentLangLabel = useMemo(
    () => languageList.find((l) => l.code === lang)?.label || 'English',
    [lang]
  )

  return (
    <div className="app">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/601161058122"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
      >
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span>{t.header.chatWithUs}</span>
      </a>

      {/* Header */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon">🍗</div>
          <div>
            <h1>{t.header.title}</h1>
            <p>{t.header.subtitle}</p>
          </div>
        </div>

        <div className="header-actions">
          {/* Language Switcher */}
          <div className="lang-switcher">
            <button
              className="lang-button"
              onClick={() => setLangMenuOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langMenuOpen}
            >
              🌐 {currentLangLabel} ▾
            </button>
            {langMenuOpen && (
              <ul className="lang-menu" role="listbox">
                {languageList.map((l) => (
                  <li key={l.code}>
                    <button
                      role="option"
                      aria-selected={lang === l.code}
                      className={lang === l.code ? 'active' : ''}
                      onClick={() => {
                        setLang(l.code)
                        setLangMenuOpen(false)
                      }}
                    >
                      <span className="lang-flag">{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && <span className="lang-tick">✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            href="https://wa.me/601161058122"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            {t.header.whatsappOrder}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">{t.hero.badge}</span>
          <h2>
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </h2>
          <p>{t.hero.description}</p>
          <div className="hero-cta">
            <a href="#menu" className="btn-primary" onClick={() => setActiveTab('menu')}>
              {t.hero.viewMenu}
            </a>
            <a href="#locations" className="btn-secondary" onClick={() => setActiveTab('locations')}>
              {t.hero.findUs}
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="nav-tabs">
        <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>
          {t.nav.menu}
        </button>
        <button className={activeTab === 'promos' ? 'active' : ''} onClick={() => setActiveTab('promos')}>
          {t.nav.promos}
        </button>
        <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>
          {t.nav.gallery}
        </button>
        <button className={activeTab === 'locations' ? 'active' : ''} onClick={() => setActiveTab('locations')}>
          {t.nav.locations}
        </button>
      </nav>

      {/* Content */}
      <main className="main">
        {/* Menu Section */}
        <section id="menu" className={`section ${activeTab === 'menu' ? 'active' : ''}`}>
          <h2 className="section-title">{t.menu.sectionTitle}</h2>
          <p className="section-sub">{t.menu.sectionSub}</p>

          {/* Category tabs */}
          <div className="menu-category-tabs">
            <button
              className={menuCategory === 'mains' ? 'active' : ''}
              onClick={() => setMenuCategory('mains')}
            >
              {t.menu.categories.mains}
            </button>
            <button
              className={menuCategory === 'baked' ? 'active' : ''}
              onClick={() => setMenuCategory('baked')}
            >
              {t.menu.categories.baked}
            </button>
            <button
              className={menuCategory === 'drinks' ? 'active' : ''}
              onClick={() => setMenuCategory('drinks')}
            >
              {t.menu.categories.drinks}
            </button>
          </div>

          {/* Mains */}
          {menuCategory === 'mains' && (
            <div className="menu-grid">
              {t.mains.map((item) => (
                <div key={item.id} className="menu-card">
                  {item.tag && (
                    <span
                      className={`menu-tag tag-${item.tag
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      {item.tag}
                    </span>
                  )}
                  <h3>{displayName(item)}</h3>
                  <p className="menu-desc">{displayDesc(item)}</p>
                  <div className="menu-price">RM {item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Cheese Baked Rice */}
          {menuCategory === 'baked' && (
            <div className="menu-grid">
              {t.baked.map((item) => (
                <div key={item.id} className="menu-card">
                  {item.tag && (
                    <span
                      className={`menu-tag tag-${item.tag
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      {item.tag}
                    </span>
                  )}
                  <h3>{displayName(item)}</h3>
                  <p className="menu-desc">{displayDesc(item)}</p>
                  <div className="menu-price">RM {item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Drinks */}
          {menuCategory === 'drinks' && (
            <>
              <div className="drinks-section-title">{t.menu.drinksSections.cold}</div>
              <div className="menu-grid">
                {t.drinks.filter((d) => d.id <= 205).map((item) => (
                  <div key={item.id} className="menu-card">
                    <h3>{displayName(item)}</h3>
                    <p className="menu-desc">{displayDesc(item)}</p>
                    <div className="menu-price">RM {item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="drinks-section-title">{t.menu.drinksSections.king}</div>
              <div className="menu-grid">
                {t.drinks.filter((d) => d.id >= 206 && d.id <= 212).map((item) => (
                  <div key={item.id} className="menu-card">
                    <h3>{displayName(item)}</h3>
                    <p className="menu-desc">{displayDesc(item)}</p>
                    <div className="menu-price">RM {item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="drinks-section-title">{t.menu.drinksSections.hot}</div>
              <div className="menu-grid">
                {t.drinks.filter((d) => d.id >= 213 && d.id <= 218).map((item) => (
                  <div key={item.id} className="menu-card">
                    <h3>{displayName(item)}</h3>
                    <p className="menu-desc">{displayDesc(item)}</p>
                    <div className="menu-price">RM {item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="drinks-section-title">{t.menu.drinksSections.canned}</div>
              <div className="menu-grid">
                {t.drinks.filter((d) => d.id >= 219).map((item) => (
                  <div key={item.id} className="menu-card">
                    <h3>{displayName(item)}</h3>
                    <p className="menu-desc">{displayDesc(item)}</p>
                    <div className="menu-price">RM {item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Promotions Section */}
        <section id="promos" className={`section ${activeTab === 'promos' ? 'active' : ''}`}>
          <h2 className="section-title">{t.promo.sectionTitle}</h2>
          <p className="section-sub">{t.promo.sectionSub}</p>

          <div className="promo-grid">
            {t.promotions.map((promo, idx) => (
              <div key={idx} className="promo-card">
                <div className="promo-price">{promo.price}</div>
                <h3>{lang === 'ms' ? promo.titleMy : promo.title}</h3>
                <p className="promo-desc">{lang === 'ms' ? promo.descMy : promo.desc}</p>
              </div>
            ))}
          </div>

          <div className="promo-terms">
            <h4>{t.promo.termsTitle}</h4>
            <ul>
              {t.promo.terms.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className={`section ${activeTab === 'gallery' ? 'active' : ''}`}>
          <h2 className="section-title">{t.gallery.sectionTitle}</h2>
          <p className="section-sub">{t.gallery.sectionSub}</p>

          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div key={img.id} className="gallery-item">
                <img src={img.src} alt={t.galleryAlt[img.id] || ''} loading="lazy" />
                <p className="gallery-caption">{t.galleryAlt[img.id] || ''}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Locations Section */}
        <section id="locations" className={`section ${activeTab === 'locations' ? 'active' : ''}`}>
          <h2 className="section-title">{t.locations.sectionTitle}</h2>
          <p className="section-sub">{t.locations.sectionSub}</p>

          <div className="locations-grid">
            {t.branches.map((loc) => (
              <div key={loc.id} className="location-card">
                {loc.image && <img src={loc.image} alt={loc.name} className="location-image" />}
                <h3>{lang === 'ms' ? loc.nameMy : loc.name}</h3>
                {((lang === 'ms' ? loc.noteMy : loc.note)) && (
                  <span className="loc-note">{lang === 'ms' ? loc.noteMy : loc.note}</span>
                )}
                <p className="loc-address">📍 {loc.address}</p>
                <a href={`tel:${loc.phone}`} className="loc-phone">
                  📞 {loc.phone}
                </a>
              </div>
            ))}
          </div>

          <div className="contact-section">
            <h3>{t.locations.contactTitle}</h3>
            <p>
              {t.locations.whatsapp}:{' '}
              <a href="https://wa.me/601161058122">+6011-6105 8122</a>
            </p>
            <p>{t.locations.callGrab}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>{t.header.title}</h3>
          <p>{t.footer.tagline}</p>
          <p className="footer-brand">{t.footer.brand}</p>
          <div className="social-links">
            <a
              href="https://www.instagram.com/chefvwestern"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.instagram}
            </a>
            <a
              href="https://www.facebook.com/share/18whBnKo9e/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.facebook}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
