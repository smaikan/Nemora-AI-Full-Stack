# Color System Documentation

## Overview
This document describes the semantic color system implemented in the Nemora Diary application. All colors have been migrated from hardcoded hex values to semantic Tailwind theme tokens, with full dark mode support.

## Color Palette

### Primary Colors
- **primary** (`#f8c994`) - Main brand color, used for accents, buttons, and highlights
- **primary-hover** (`#e2b680`) - Hover state for primary elements
- **primary-light** (`#f5e1b8`) - Light variant for gradients
- **primary-dark** (`#c3a277`) - Dark variant for buttons and active states
- **primary-darker** (`#846f53`) - Disabled button state
- **primary-darkest** (`#5e5346`) - Darkest primary variant

### Background Colors
- **background** (`#f6ede4`) - Main page background
- **background-dark** (`#2a241f`) - Dark mode main background

### Surface Colors
- **surface** (`#fff9f3`) - Card and panel backgrounds
- **surface-alt** (`#fff7ea`) - Alternative surface variant
- **surface-alt2** (`#f6e3d0`) - Second alternative variant
- **surface-alt3** (`#fffaf5`) - Third alternative variant
- **surface-hover** (`#fef3e7`) - Hover state for surfaces
- **surface-dark** (`#3a3329`) - Dark mode surface
- **surface-dark-alt** (`#4a4236`) - Dark mode alternative surface

### Text Colors
- **text-primary** (`#463b2d`) - Main text color (darkest)
- **text-secondary** (`#5e5346`) - Secondary text color
- **text-tertiary** (`#4f412f`) - Tertiary text (button text)
- **text-muted** (`#66513e`) - Muted text (charts, labels)
- **text-dark-primary** (`#f5e1b8`) - Dark mode primary text
- **text-dark-secondary** (`#d9b58d`) - Dark mode secondary text
- **text-dark-muted** (`#c3a277`) - Dark mode muted text

### Border Colors
- **border-primary** (`#5e5346`) - Primary border color
- **border-secondary** (`#e0c9a6`) - Secondary border (dividers)
- **border-tertiary** (`#efe0c8`) - Tertiary border (card borders)
- **border-light** (`#ead7bf`) - Light border
- **border-lighter** (`#e2cfba`) - Lighter border
- **border-accent** (`#fec9a4`) - Accent border
- **border-ring** (`#d9b58d`) - Focus ring border
- **border-dark-primary** (`#5e5346`) - Dark mode primary border
- **border-dark-secondary** (`#4a4236`) - Dark mode secondary border
- **border-dark-light** (`#3a3329`) - Dark mode light border

### Button Colors
- **button-primary** (`#f8c994`) - Primary button background
- **button-hover** (`#e2b680`) - Button hover state
- **button-active** (`#c3a277`) - Active button state
- **button-disabled** (`#846f53`) - Disabled button state
- **button-light** (`#ffd7aa`) - Light button variant
- **button-dark-primary** (`#c3a277`) - Dark mode primary button
- **button-dark-hover** (`#d9b58d`) - Dark mode button hover
- **button-dark-active** (`#846f53`) - Dark mode active button

### Interactive Elements
- **interactive** (`#fae0c3`) - Interactive element background (filters, dropdowns)
- **interactive-hover** (`#f8c994`) - Interactive hover state
- **interactive-selected** (`#f3e0c9`) - Selected interactive state
- **interactive-ring** (`#d9b58d`) - Focus ring for interactive elements
- **interactive-dark** (`#4a4236`) - Dark mode interactive background
- **interactive-dark-hover** (`#5e5346`) - Dark mode interactive hover
- **interactive-dark-selected** (`#3a3329`) - Dark mode selected state

### Special Purpose Colors
- **caret** (`#fab584`) - Text input caret color
- **mood-indicator** (`#f6c37e`) - Mood chart indicator color
- **focus-ring** (`#e2b680`) - Focus ring color
- **icon-inactive** (`#8a7a60`) - Inactive icon color
- **gradient-start** (`#f8c994`) - Gradient start color
- **gradient-end** (`#f5e1b8`) - Gradient end color
- **gradient-landing-start** (`#F9FAFB`) - Landing page gradient start
- **gradient-landing-end** (`#fdeec7`) - Landing page gradient end
- **chart-start** (`#ffd89b`) - Chart gradient start
- **chart-end** (`#f6e3d5`) - Chart gradient end

## Usage Examples

### Background
```tsx
<div className="bg-background dark:bg-background-dark">
```

### Text
```tsx
<h1 className="text-text-primary dark:text-text-dark-primary">
<p className="text-text-secondary dark:text-text-dark-secondary">
```

### Buttons
```tsx
<button className="bg-button-primary hover:bg-button-hover dark:bg-button-dark-primary dark:hover:bg-button-dark-hover">
```

### Borders
```tsx
<div className="border border-border-tertiary dark:border-border-dark-secondary">
```

### Interactive Elements
```tsx
<div className="bg-interactive hover:bg-interactive-hover dark:bg-interactive-dark dark:hover:bg-interactive-dark-hover">
```

## Dark Mode

Dark mode is enabled using `darkMode: "class"` in Tailwind config. To toggle dark mode, add/remove the `dark` class on the root HTML element.

All color tokens have corresponding dark mode variants using the `dark:` prefix.

## Files Modified

The following files were updated to use the new color system:

1. `tailwind.config.js` - Added complete color system
2. `src/App.tsx` - Main background
3. `src/Components/Sidebar/index.tsx` - Sidebar colors
4. `src/Components/Sidebar/Header.tsx` - Header colors
5. `src/Components/Sidebar/SidebarMenu.tsx` - Menu colors
6. `src/Layers/Login/Login.tsx` - Login form colors
7. `src/Layers/Login/Signup.tsx` - Signup form colors
8. `src/Layers/Login/LandingPage.tsx` - Landing page colors
9. `src/Layers/mainpage/index.tsx` - Main page colors
10. `src/Layers/mainpage/MainHeader.tsx` - Header colors
11. `src/Layers/mainpage/WeeklySummary.tsx` - Summary card colors
12. `src/Layers/mainpage/MoodChart.tsx` - Chart colors (SVG gradients remain hex)
13. `src/Layers/mainpage/DateRangeToggle.tsx` - Toggle colors
14. `src/Layers/mainpage/RecentMemories.tsx` - Recent memories colors
15. `src/Layers/mainpage/QuickActions.tsx` - Quick actions colors
16. `src/Layers/mainpage/DailyTip.tsx` - Daily tip colors
17. `src/Layers/memories/index.tsx` - Memories page colors
18. `src/Layers/memories/MemoriesFilterBar.tsx` - Filter bar colors
19. `src/Layers/newpage/index.tsx` - New page editor colors

## Notes

- SVG gradients in `MoodChart.tsx` still use hex values as SVG requires explicit color values
- Inline styles in `newpage/index.tsx` use RGB values for the primary color (equivalent to `#f8c994`)
- All visual appearances remain identical to the original design
- Dark mode variants maintain proper contrast ratios

