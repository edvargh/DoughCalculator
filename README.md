# Dough Calculator

A simple dough ingredient calculator. Enter:
- Total dough weight (grams)
- Number of dough balls
- Hydration (%)
- Yeast type (dry or fresh)

The app calculates suggested amounts of:
- Flour
- Water
- Salt
- Yeast

## Tech stack
- React
- Vite
- JavaScript
- HTML/CSS

## How it works
- Hydration is calculated as water relative to flour (baker’s percentage).
- Salt is calculated as **2%** of flour weight.
- Yeast is calculated as:
  - **1%** of flour weight for dry yeast
  - **2%** of flour weight for fresh yeast

## Getting started
```bash
npm install
npm run dev

## Screenshot
![alt text](image.png)