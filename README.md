# 🌍 Globetrotter: Your Ultimate Travel Planner

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-blue?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Safe_Code-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**Globetrotter** is a premium, full-stack travel planning application designed to help enthusiasts discover breathtaking destinations, plan detailed itineraries, and manage their wanderlust with ease. Built with a modern tech stack and a focus on visual excellence, it offers a seamless experience from inspiration to execution.

---

## ✨ Core Features

### 🏔️ Destination Discovery
- **Heroic Exploration**: A stunning landing page with dynamic search and regional filters.
- **Curated Cities**: Browse a grid of world-class destinations with high-quality visuals.
- **Regional Navigation**: Easily filter by Europe, Asia, Americas, Africa, and Oceania.

### 📅 Personal Trip Planning
- **Itinerary Builder**: Create multi-section trips with specific activities for each day or category.
- **Trip Management**: A dedicated dashboard to view upcoming, past, and drafted trips.
- **Detailed Views**: Deep-dive into your plans with rich itinerary summaries and activity details.

### 👤 Profile & Social
- **Custom Profiles**: Manage your travel identity, upload photos, and track your stats.
- **Trip History**: Keep a record of every adventure you've embarked on.

### 🔐 Admin & Analytics
- **Insightful Dashboard**: Monitor platform growth with trip and user analytics.
- **User Management**: Simple tools for administrators to manage the community.
- **Performance Metrics**: Track top destinations and popular activities.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router & Server Actions)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, RLS, Storage)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [React Context](https://react.dev/) & [Hooks](https://react.dev/reference/react/hooks)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- A [Supabase](https://supabase.com/) account

### 1. Installation
```bash
git clone https://github.com/your-username/globetrotter.git
cd globetrotter
npm install
```

### 2. Database Setup
1. Create a new project in your **Supabase Dashboard**.
2. Navigate to the **SQL Editor**.
3. Copy the contents of `supabase_schema.sql` into the editor and **Run** it.
   - *This will initialize tables, RLS policies, and sample data.*

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your app in action.

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Auth, Trips, Profile, Admin)
├── components/           # Reusable UI, Layout, and Feature components
├── contexts/             # React Context for global state
├── hooks/                # Custom hooks for logic reuse
├── lib/                  # Supabase client, utilities, and validations
├── public/               # Static assets (images, icons)
└── supabase_schema.sql   # Database schema & initialization script
```

---

## 📸 Screenshots

*Add your stunning application screenshots here to showcase the UI!*

---

## 🔐 Security & Optimization

- **Row Level Security (RLS)**: Your data is protected. Users can only access and modify their own trips.
- **Middleware**: Server-side authentication guards protect private routes.
- **Optimized Performance**: Next.js 14 features like Image Optimization and SSR ensure a lightning-fast experience.
- **Responsive Design**: Carefully crafted for Mobile, Tablet, and Desktop users.

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ for travelers by the **Globetrotter Team**
