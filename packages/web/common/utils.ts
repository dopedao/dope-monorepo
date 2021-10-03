export const isTouchDevice = () => {
  return (
    typeof window !== 'undefined' &&
    (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    )
  );
}