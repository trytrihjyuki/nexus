#!/usr/bin/env bash

# -----------------------------------------
# 0) PRELIMINARY: Confirm we are in the project root
#    (Optional check—remove if you don't want it)
# -----------------------------------------
if [ ! -f "package.json" ]; then
  echo "Error: No package.json found in the current directory."
  echo "Please run this script from your project root."
  exit 1
fi

# -----------------------------------------
# 1) CLEANUP: Remove existing modules + lock files
# -----------------------------------------
echo "1) Removing node_modules, pnpm-lock.yaml, and old React versions..."
rm -rf node_modules pnpm-lock.yaml
pnpm remove react react-dom @types/react @types/react-dom --ignore-scripts

# -----------------------------------------
# 2) REINSTALL: React 18 + type definitions
# -----------------------------------------
echo "2) Installing fresh React 18 and matching types..."
pnpm add react@18.2.0 react-dom@18.2.0 --ignore-scripts
pnpm add -D @types/react@18.0.28 @types/react-dom@18.0.11 --ignore-scripts

# -----------------------------------------
# 3) NEXT.JS (latest)
# -----------------------------------------
echo "3) Installing Next.js (latest) + @types/node..."
pnpm add next@latest --ignore-scripts
pnpm add -D @types/node --ignore-scripts

# Insert Next.js scripts in package.json if they don't exist
echo "Creating dev/build/start scripts in package.json..."
npx json -I -f package.json -e '
  if (!this.scripts) { this.scripts = {} }
  if (!this.scripts.dev)    { this.scripts.dev    = "next dev" }
  if (!this.scripts.build)  { this.scripts.build  = "next build" }
  if (!this.scripts.start)  { this.scripts.start  = "next start" }
'

# -----------------------------------------
# 4) TAILWIND CSS + POSTCSS + AUTOPREFIXER
# -----------------------------------------
echo "4) Installing Tailwind CSS + PostCSS + Autoprefixer..."
pnpm add -D tailwindcss postcss autoprefixer --ignore-scripts

# Initialize Tailwind config
echo "Initializing Tailwind config files (tailwind.config.js & postcss.config.js)..."
npx tailwindcss init -p

# Overwrite tailwind.config.js for a Next.js 13+ /app structure (optional).
echo "Overwriting tailwind.config.js to match Next.js 13+ app folder..."
cat << EOF > tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# -----------------------------------------
# 5) THREE / FIBER / DREI
# -----------------------------------------
echo "5) Installing three.js, @react-three/fiber, and @react-three/drei..."
pnpm add three @react-three/fiber @react-three/drei --ignore-scripts

# -----------------------------------------
# 6) FINAL CHECK: List installed versions
# -----------------------------------------
echo "6) Final check: listing relevant packages..."
pnpm list react react-dom next @react-three/fiber @react-three/drei three @types/react tailwindcss postcss autoprefixer

echo ""
echo "------------------------------------------------------------"
echo "Setup complete!"
echo "------------------------------------------------------------"
echo "Quick start commands:"
echo "  pnpm run dev    # Start Next.js dev server"
echo ""
echo "Tailwind usage:"
echo "  1) Ensure you have '@tailwind base;', '@tailwind components;', and '@
