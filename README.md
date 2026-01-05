# Dimpified Frontend – Developer Documentation

A modern React-based platform for service-based businesses to onboard customers, manage bookings, and host personalized template websites.

---

## 🗂️ Repository Structure (Full Breakdown)

```
.
├── .github/workflows/         # CI/CD configs
├── public/
│   └── index.html             # Single-page entry point
├── src/
│   ├── assets/                # Static files: logos, icons, images
│   ├── auth/                  # Multi-step onboarding flow
│   │   ├── AuthLayout.jsx     # Drives step-based routing
│   │   ├── PersonalInfo.jsx
│   │   ├── BusinessInfo.jsx
│   │   ├── VerifyOtp.jsx
│   │   └── SelectTemplate.jsx etc
│   ├── component/             # Shared UI and route definitions
│   │   ├── AllRoutes.jsx      # Root-level navigation structure
│   │   ├── Buttons.jsx        # Styled button components
│   │   ├── Inputs.jsx         # Form input components
│   │   └── Toast.jsx          # Global notification handler etc
│   ├── componentRender/       # Conditional component renders
│   ├── context/               # Context providers
│   │   ├── AuthContext.js     # Login state
│   │   └── PlanContext.js     # Plan & subscription permissions
│   ├── dashboard/             # Business dashboard screens & logic
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── Services/
│   │   ├── Bookings/
│   │   ├── Schedule/
│   │   ├── WebsiteEditor/
│   │   └── BusinessSettings/
│   ├── hooks/                 # Reusable React hooks
│   │   ├── useAuth.js
│   │   ├── useSubdomain.js
│   │   └── useScrollToTop.js
│   ├── layout/                # Application layout wrappers
│   │   └── TemplateLayout.jsx
│   ├── pages/                 # Public-facing screens
│   │   ├── Home.jsx
│   │   └── Booking.jsx
│   ├── routes/                # Protected routes logic
│   ├── templates/             # Prebuilt website themes
│   │   ├── dental/
│   │   ├── hair/
│   │   └── makeup/
│   ├── utils/                 # Utilities and API helpers
│   ├── App.jsx                # Main application shell
│   ├── main.jsx               # React DOM render & provider setup
│   └── tailwind.css           # Global styles
├── .env                       # Environment (not committed)
├── .eslintrc.cjs              # Linter rules
├── package.json               # Project meta & dependencies
├── tailwind.config.js         # Tailwind customization
├── vite.config.js             # Vite config for dev & build
├── README.md                  # Documentation
└── LICENSE                    # MIT License
```

---

## 🔄 Relationship Overview

| Route                    | Component          | Layout             |
| ------------------------ | ------------------ | ------------------ |
| `/auth/*`                | Onboarding pages   | AuthLayout.jsx     |
| `/dashboard/*`           | Service management | DashboardLayout    |
| `/template/:subdomain/*` | Website themes     | TemplateLayout.jsx |

- `App.jsx` initializes the entire app with contexts and wraps it in `AllRoutes.jsx`
- Contexts provide global state access like `AuthContext` (user login info) and `PlanContext` (feature access control)

---

## 🛠️ Setup & Installation

```bash
git clone https://github.com/MigrationGFA/Dimpified.git
cd Dimpified
npm install
cp .env.example .env       # Add your API and Stripe/Paystack keys
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🔌 Environment Variables

Set values in `.env`:

```ini
VITE_API_URL=https://api.yoursite.com
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_PAYSTACK_KEY=pk_test_...
```

These values are consumed by HTTP utilities and Stripe config in `utils/`.

---

## 👣 Authentication Flow (Multi-Step)

1. `/auth/personal-info`: Collects name, phone, etc.
2. `/auth/business-info`: Collect business type, name
3. `/auth/verify-otp`: OTP sent to contact
4. `/auth/select-template`: Choose website theme

- Each step uses `AuthLayout.jsx` to manage transitions
- Redirect to `/dashboard` once all steps are complete

---

## 🛒 Dashboard & Service Management

Found in `src/dashboard/`:

- `Bookings/`: View/manage bookings
- `Schedule/`: Set business availability (working hours)
- `WebsiteEditor/`: Manage template content, images, texts
- `BusinessSettings/`: Phone number, hours, name, branding

Each subfolder is a micro-module with internal components and routing.

---

## 🌐 Subdomain-Based Templates

Visiting `https://yourbiz.dimpified.com` routes to a subdomain-specific version of a template:

- Uses `useSubdomain()` hook to identify the subdomain
- Loads content from the appropriate folder under `src/templates/`
- Layouts and assets are dynamically injected via API

---

## 🎨 UI & Design System

- `component/Inputs.jsx`: Custom form components
- `component/Buttons.jsx`: Reusable styled buttons
- `component/Toast.jsx`: Notification messages
- Styled via Tailwind CSS and `tailwind.css`
- Icons via `lucide-react`

---

## ⚖️ Utilities & Custom Hooks

- `useAuth()`: Hook for login status and user metadata
- `useSubdomain()`: Parses URL to fetch business slug
- `useScrollToTop()`: Ensures smooth nav experience
- `utils/`: Handles API, formatting, currency, etc.

---

## 📝 Developer Onboarding

```bash
npm run dev
```

Steps:

1. Explore `src/auth/` for the step-based onboarding process
2. Examine `AllRoutes.jsx` to understand routing logic
3. Use context files for state: `AuthContext.js`, `PlanContext.js`
4. Dashboard functionality in `src/dashboard/`
5. Templates live in `src/templates/` folder
6. Common buttons/forms in `src/component/`

To add a new template:

1. Duplicate an existing template folder (e.g. `dental/`)
2. Adjust the route path and mapping in `AllRoutes.jsx`
3. Use dynamic content from backend via subdomain

---

## 🔍 Summary for Developers

- Start at `/auth/` for user onboarding logic
- `AllRoutes.jsx` is the route orchestrator
- Context provides global state (auth & plan)
- Dashboard modules are self-contained
- Templates served via subdomain resolution
- Forms, buttons, API logic in `component/` and `utils/`

---
