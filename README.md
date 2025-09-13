# Nhoa Noir | Photography

A multilingual photography portfolio website built with Astro, showcasing the work of photographer Nhoa Noir.

## 🔗 Website

[https://nhoanoir.com](https://nhoanoir.com)

## ✨ Features

- **Responsive Design**: Optimized for all device sizes
- **Multilingual Support**: Available in Spanish (default) and English
- **Photo Albums**: Organized galleries of photography work
- **Fast Performance**: Built with Astro for optimal loading speed
- **SEO Optimized**: Includes sitemap generation and metadata

## 🛠️ Technologies

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [PostCSS](https://postcss.org/) - CSS processing tools
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing
- [Fontsource](https://fontsource.org/) - Self-hosted fonts

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/astro-photographer.git
   cd astro-photographer
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4321`

## 📦 Project Structure

```
/
├── assets/                # Static assets
│   ├── img/               # Images
│   │   ├── albums/        # Album photos
│   │   └── hero/          # Hero images
│   └── svg/               # SVG files
├── public/                # Public assets (copied as-is)
├── src/
│   ├── components/        # UI components
│   ├── i18n/              # Internationalization
│   ├── layouts/           # Page layouts
│   ├── pages/             # Page routes
│   ├── scripts/           # Client-side scripts
│   ├── styles/            # CSS styles
│   └── utils/             # Utility functions
├── astro.config.mjs       # Astro configuration
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the production site
- `npm run start:prod` - Preview the production build
- `npm run build:img` - Process images with Sharp
- `npm run lint` - Run all linters
- `npm run lint:fix` - Fix linting issues
- `npm run test` - Run tests

## 🌐 Internationalization

The website supports multiple languages:
- Spanish (default): `/es/`
- English: `/en/`

Language files are located in `src/i18n/ui.ts`.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

- Nhoa Noir - [Website](https://nhoanoir.com)
