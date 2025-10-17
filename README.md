# Paquin Law Website

A modern, elegant single-page website for Paquin Law - a solo law practice specializing in corporate and technology law.

## Features

- **Modern Design**: Clean, minimal aesthetic with Tulane Green (#007C60) as the accent color
- **Fully Responsive**: Optimized for both mobile and desktop viewing
- **Smooth Animations**: Fade-in, slide-up, and parallax effects throughout
- **Interactive Navigation**: Fixed navbar with smooth scrolling to sections
- **Contact Form**: Built-in form with validation and mailto integration

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible component library
- **Lucide React**: Modern icon library

## Sections

1. **Navbar**: Fixed navigation with smooth scrolling and mobile menu
2. **Hero Section**: Full-screen hero with parallax effect and call-to-action
3. **Practice Areas**: Four practice area cards with hover effects
4. **Our Process**: Four-step process with visual flow
5. **About**: Profile section for Christen Paquin with key highlights
6. **Contact**: Contact form with validation and direct email integration
7. **Footer**: Minimal footer with navigation and contact info

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build

```bash
npm run build
npm start
```

## Design System

### Colors

- **Primary (Tulane Green)**: #007C60
- **Light Grey**: #F5F5F5
- **White**: #FFFFFF
- **Dark Text**: Default foreground colors

### Typography

- **Headings**: Playfair Display (serif) - conveys authority
- **Body**: Geist Sans - provides clarity and readability

### Animations

- Fade-in and slide-up effects on scroll
- Parallax effect on hero section
- Hover animations on cards and buttons
- Smooth scroll behavior

## Customization

To customize the website:

1. **Colors**: Update `app/globals.css` color variables
2. **Content**: Edit component files in `components/`
3. **Fonts**: Modify font imports in `app/layout.tsx`
4. **Contact Info**: Update email and phone in `components/Contact.tsx` and `components/Footer.tsx`

## License

© 2024 Paquin Law. All rights reserved.
