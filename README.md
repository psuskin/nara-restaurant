# Nara Restaurant Website

A modern, responsive single-page restaurant website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Modern and clean UI
- Interactive contact form
- Smooth scroll navigation
- Optimized images with Next.js Image component
- SEO friendly

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Add the following images to the `public/images` directory:

- hero-bg.jpg (Restaurant interior or exterior shot)
- about.jpg (Chef preparing food)
- sushi-platter.jpg
- wagyu.jpg
- black-cod.jpg
- ramen.jpg

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
nara/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Menu.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── public/
│   └── images/
│       ├── hero-bg.jpg
│       ├── about.jpg
│       ├── sushi-platter.jpg
│       ├── wagyu.jpg
│       ├── black-cod.jpg
│       └── ramen.jpg
└── package.json
```

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hooks
- ESLint
- Prettier

## Development

The website is built using the Next.js App Router and follows modern React best practices:

- Server Components by default
- Client Components where necessary (Contact form)
- Responsive design using Tailwind CSS
- Semantic HTML for better accessibility
- Optimized images using Next.js Image component
- Smooth scroll behavior for navigation

## License

MIT
