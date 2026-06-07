import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  // Parse the value to extract the numeric part
  let numericValue = 0;

  if (typeof value === "number") {
    numericValue = value;
  } else if (typeof value === "string") {
    // Extract numeric value from strings like "487 Tage", "0,3%", "4,2", etc.
    const match = value.match(/[\d.,]+/);
    if (match) {
      // Replace comma with dot for parsing
      numericValue = parseFloat(match[0].replace(",", "."));
    }
  }

  const animatedValue = useCountUp({
    end: numericValue,
    duration,
    decimals,
  });

  // Format the output to match the original format
  let displayValue = animatedValue;

  if (typeof value === "string") {
    // If original value had a comma (European format), replace dot with comma
    if (value.includes(",")) {
      displayValue = animatedValue.replace(".", ",");
    }
    // If original value had a % or other suffix, add it back
    if (value.includes("%")) {
      displayValue += "%";
    }
  }

  return <span className={className}>{displayValue}</span>;
}
