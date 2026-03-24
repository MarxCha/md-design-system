/**
 * Chart color palette using CSS custom properties.
 * Colors resolve at runtime via the active theme.
 */
export const chartColors = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  destructive: "hsl(var(--destructive))",
  chart1: "hsl(213 51% 24%)", // Deep Blue
  chart2: "hsl(38 62% 58%)", // Warm Amber
  chart3: "hsl(160 84% 39%)", // Emerald
  chart4: "hsl(200 70% 50%)", // Cyan
  chart5: "hsl(270 60% 55%)", // Purple
  chart6: "hsl(340 65% 55%)", // Rose
  chart7: "hsl(25 80% 55%)", // Orange
  chart8: "hsl(150 50% 45%)", // Teal
} as const;

export type ChartColorKey = keyof typeof chartColors;

export const chartColorsArray = Object.values(chartColors);
