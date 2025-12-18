# ROMANTIX

> Premium E-Commerce Platform | Luxury Sensual Minimalism

A modern, mobile-first e-commerce platform built with React 19, TypeScript, and Tailwind CSS v4, featuring stunning animations and exceptional user experience.

## 📋 Documentation

- **[Development Plan](./DEVELOPMENT_PLAN.md)** - Detailed development phases and architecture
- **[Roadmap](./ROADMAP.md)** - Quick reference for development timeline

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## ✨ Features

- ✅ **Modern Tech Stack**: React 19 + TypeScript 5 + Vite 7
- ✅ **Tailwind CSS v4**: Latest design system with custom theme
- ✅ **Framer Motion**: Buttery-smooth animations
- ✅ **Mobile-First**: Responsive design optimized for all devices
- ✅ **Authentication Pages**: Login & Register flows with validation
- ✅ **Password Strength**: Real-time password strength indicator
- ✅ **Landing Page**: Product showcase with animated components
- ✅ **Product Cards**: Interactive product cards with hover effects
- ✅ **Testing Ready**: Vitest + Testing Library + Playwright configured
- ✅ **TypeScript**: Fully typed with path aliases
- ✅ **Dark Theme**: Luxury seductive design
- ✅ **Deployed**: Live on Vercel

## 📁 Project Structure

```
romantix/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Checkbox/
│   │   │   └── PasswordStrength/
│   │   ├── common/          # Common components
│   │   │   ├── FloatingOrb/
│   │   │   ├── Hero/
│   │   │   └── Features/
│   │   ├── layout/          # Layout components
│   │   │   ├── Header/
│   │   │   └── Footer/
│   │   ├── product/         # Product components
│   │   │   └── ProductCard/
│   │   ├── cart/            # Cart components
│   │   └── checkout/        # Checkout components
│   ├── features/            # Feature modules
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities & configs
│   ├── pages/               # Route pages
│   │   ├── Home/            # Landing page
│   │   ├── Auth/            # Login, Register, Success
│   │   ├── Products/        # Product listing
│   │   ├── Product/         # Product detail
│   │   ├── Cart/            # Shopping cart
│   │   ├── Checkout/        # Checkout flow
│   │   ├── Account/         # User account
│   │   └── Admin/           # Admin panel
│   ├── types/               # TypeScript types
│   ├── services/            # API services
│   ├── app/                 # App configuration
│   │   ├── routes/          # Route configs
│   │   └── store/           # State management
│   └── i18n/                # Internationalization
├── tests/                   # Test files
└── public/                  # Static assets
```

## 🎨 Design System

### Color Palette

- **Primary**: Deep Rose/Burgundy (#e04d75)
- **Accent**: Gold/Champagne (#d4af37)
- **Neutral**: Warm Grays

### Typography

- **Display Font**: Cormorant Garamond (serif)
- **Body Font**: Plus Jakarta Sans (sans-serif)

### Spacing

8px grid system (4px, 8px, 12px, 16px, 24px, 32px, etc.)

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:e2e` | Run Playwright E2E tests |

## 📦 Tech Stack

### Core

- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Vite 7** - Build tool

### Styling

- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion 12** - Animation library

### State Management & Data

- **Zustand 5** - Lightweight state management
- **TanStack Query 5** - Server state management
- **React Hook Form 7** - Form handling
- **Zod 4** - Schema validation

### Routing & i18n

- **React Router 7** - Client-side routing
- **react-i18next 16** - Internationalization

### Testing

- **Vitest 3** - Unit testing
- **Testing Library 16** - Component testing
- **Playwright 1** - E2E testing

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (zero config needed!)

### Netlify

1. Push to GitHub
2. Connect repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

```bash
# Build
npm run build

# Deploy (requires gh-pages setup)
# See deployment docs for details
```

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_APP_NAME=ROMANTIX
VITE_APP_URL=http://localhost:3000
VITE_API_URL=http://localhost:4000
VITE_ENABLE_ANALYTICS=false
```

## 📝 Current Features (Phase 1)

✅ Landing page with product showcase
✅ Authentication pages (Login/Register/Success)
✅ Password strength validation
✅ Form validation with Zod
✅ Product card components
✅ Animated backgrounds
✅ Header with cart counter
✅ Responsive design
✅ Deployed to Vercel

## 🎯 Roadmap

See **[ROADMAP.md](./ROADMAP.md)** for detailed timeline.

### Up Next (Phase 1 - Weeks 1-2):
- [ ] React Router setup
- [ ] Authentication state management
- [ ] Protected routes
- [ ] Role-based access control (Guest, Customer, Admin)
- [ ] Password reset flow

### Future Phases:
- **Phase 2**: Product catalog & collections
- **Phase 3**: Shopping cart & wishlist
- **Phase 4**: Checkout process
- **Phase 5**: User account & orders
- **Phase 6**: Admin panel
- **Phase 7**: Advanced features (reviews, customizer)
- **Phase 8**: Testing & optimization

## 🤝 Contributing

This project follows the technical specification outlined in the ROMANTIX proposal document.

## 📄 License

Private & Confidential

---

**ROMANTIX** - Where Luxury Meets Technology
