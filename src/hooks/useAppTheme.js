import { useTheme } from '../contexts/ThemeContext';
import theme from '../theme';

export const useAppTheme = () => {
  const { theme: currentTheme } = useTheme();
  
  const getColor = (colorPath) => {
    // Split the path (e.g., 'primary.light' or 'text.primary.dark')
    const parts = colorPath.split('.');
    let current = theme.colors;
    
    // Navigate through the theme object
    for (const part of parts) {
      if (current[part] === undefined) {
        return '#000000'; // fallback color
      }
      current = current[part];
    }
    
    // Return the appropriate color based on current theme
    if (typeof current === 'object' && current !== null) {
      return current[currentTheme] || current.light;
    }
    
    return current;
  };
  
  return {
    currentTheme,
    getColor
  };
};