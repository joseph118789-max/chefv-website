# Chef V Western Food — Website

Official website for **Chef V** (Restoran Makanan Barat CHEF V) — affordable Western cuisine across 7 branches in the Klang Valley, Malaysia.

> 🍗 Starting from RM 9.90 · Owned by FOODASTIC Sdn. Bhd.

## Features

- **Trilingual** — English / 中文 / Bahasa Melayu with clean language switching (no fallback mixing)
- **Full menu** — 10 mains, 9 cheese-baked rice, 22 drinks (cold / king-size / hot / canned)
- **Live promotions** — 4 active promos with terms & conditions
- **Gallery** — 27 food photos + branch portraits
- **7 branches** — addresses, phone numbers, WhatsApp ordering

## Tech Stack

- React 19.2.6
- Vite 8.0.12
- Plain CSS (no framework, no Tailwind)
- Custom i18n (no i18next, no react-intl) — see `src/i18n/`

## Project Structure

```
src/
├── App.jsx           # Main component (consumes i18n)
├── App.css           # Styles
├── main.jsx          # Entry point
└── i18n/             # Translation system
    ├── en.js         # English
    ├── cn.js         # 中文
    ├── ms.js         # Bahasa Melayu
    ├── index.js      # Language registry
    └── useI18n.js    # React hook + localStorage persistence
```

## Getting Started

```bash
npm install
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Contact

- WhatsApp: +6011-6105 8122
- Instagram: [@chefvwestern](https://www.instagram.com/chefvwestern)
- Facebook: [Chef V](https://www.facebook.com/share/18whBnKo9e/)

---

© 2026 Chef V Western Food · FOODASTIC Sdn. Bhd.
