# EduHive Theme System

## Overview
EduHive uses a consistent theme system across all pages to ensure a uniform look and feel in both light and dark modes.

## Theme Context
The theme system is managed through React Context API with the following components:

1. `ThemeProvider` - Wraps the entire application in `main.jsx`
2. `useTheme` - Hook to access current theme and toggle function
3. `useAppTheme` - Extended hook with color utilities

## Color Palette
The theme uses a consistent color palette defined in `src/theme.js`:

### Primary Colors
- Light mode: Blue (#3b82f6)
- Dark mode: Light Blue (#60a5fa)

### Secondary Colors
- Light mode: Emerald (#10b981)
- Dark mode: Light Emerald (#34d399)

### Background Colors
- Light mode: Light Gray (#f9fafb)
- Dark mode: Dark Gray (#111827)

### Text Colors
- Primary text:
  - Light mode: Dark Gray (#111827)
  - Dark mode: Light Gray (#f9fafb)
- Secondary text:
  - Light mode: Gray (#6b7280)
  - Dark mode: Light Gray (#9ca3af)

## Implementation
To use the theme in components:

1. Import the hooks:
```javascript
import { useTheme } from '../contexts/ThemeContext';
import { useAppTheme } from '../hooks/useAppTheme';
```

2. Use the hooks in your component:
```javascript
const { theme, toggleTheme } = useTheme();
const { getColor } = useAppTheme();
```

3. Apply Tailwind classes with dark mode variants:
```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h1 className="text-primary dark:text-blue-400">Themed Content</h1>
</div>
```

## Consistency Guidelines
1. Always use `dark:` variants for dark mode styles
2. Use the defined color palette consistently
3. Test components in both light and dark modes
4. Ensure proper contrast ratios for accessibility