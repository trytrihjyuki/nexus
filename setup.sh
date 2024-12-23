#!/usr/bin/env bash

# --------------------------------------------------------------------
# 0) Ensure we are in the project root (with package.json)
# --------------------------------------------------------------------
if [ ! -f "package.json" ]; then
  echo "Error: No package.json found in this directory."
  echo "Please run this script from your project's root folder."
  exit 1
fi

# --------------------------------------------------------------------
# 1) CLEANUP: remove node_modules + lock file
# --------------------------------------------------------------------
echo "==== 1) Removing node_modules and pnpm-lock.yaml ===="
rm -rf node_modules pnpm-lock.yaml

# Remove old/broken or conflicting packages
echo "Removing old Next, React, Tailwind, and related packages..."
pnpm remove next react react-dom @types/react @types/react-dom tailwindcss postcss autoprefixer three @react-three/fiber @react-three/drei

# --------------------------------------------------------------------
# 2) INSTALL Next.js, React 18, Tailwind, etc.
# --------------------------------------------------------------------
echo "==== 2) Installing Next.js (latest), React 18, Tailwind, R3F... ===="
# Next.js + React 18
pnpm add -D next@latest
pnpm add react@18.2.0 react-dom@18.2.0

# Tailwind, PostCSS, Autoprefixer
pnpm add -D tailwindcss postcss autoprefixer

# Three + Fiber + Drei
pnpm add three @react-three/fiber @react-three/drei

# Optionally, if you do SSR with Node features, add @types/node
# pnpm add -D @types/node

# --------------------------------------------------------------------
# 3) Add or update package.json scripts
# --------------------------------------------------------------------
echo "==== 3) Adding 'dev', 'build', 'start' scripts to package.json (if missing) ===="
# We use 'json' CLI here to safely update package.json. 
# If you don't have 'json' installed globally, you can install it or edit package.json manually.
if ! command -v json &> /dev/null
then
  echo "Warning: 'json' CLI tool not found. Skipping script insertion."
  echo "Please add these scripts manually to package.json if needed:"
  echo '  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" }'
else
  npx json -I -f package.json -e '
    if (!this.scripts) { this.scripts = {} }
    if (!this.scripts.dev)   { this.scripts.dev   = "next dev" }
    if (!this.scripts.build) { this.scripts.build = "next build" }
    if (!this.scripts.start) { this.scripts.start = "next start" }
  '
fi

# --------------------------------------------------------------------
# 4) Initialize Tailwind config
# --------------------------------------------------------------------
echo "==== 4) Initializing Tailwind (tailwind.config.js / postcss.config.js) ===="
# This generates tailwind.config.js and postcss.config.js in your project
npx tailwindcss init -p

# Optionally overwrite tailwind.config.js for Next.js 13 (app dir):
# (Uncomment if you prefer a preconfigured file)
# cat << EOF > tailwind.config.js
# /** @type {import('tailwindcss').Config} */
# module.exports = {
#   content: [
#     "./app/**/*.{js,ts,jsx,tsx}",
#     "./components/**/*.{js,ts,jsx,tsx}",
#   ],
#   theme: {
#     extend: {},
#   },
#   plugins: [],
# }
# EOF

# --------------------------------------------------------------------
# 5) Final check: list installed versions
# --------------------------------------------------------------------
echo "==== 5) Final check: listing relevant packages... ===="
pnpm list next react react-dom tailwindcss postcss autoprefixer three @react-three/fiber @react-three/drei

echo ""
echo "======================================================"
echo "Setup complete!"
echo "To start your Next.js dev server, run:"
echo "  pnpm run dev"
echo ""
echo "If you haven't already, add Tailwind directives to your app/globals.css or index.css, e.g.:"
echo "@tailwind base;"
echo "@tailwind components;"
echo "@tailwind utilities;"
echo ""
echo "Now you have Next.js + React 18 + Tailwind CSS + R3F installed locally."
echo "======================================================"
