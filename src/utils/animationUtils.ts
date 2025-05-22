
/**
 * Checks if an element is in the viewport
 * @param element - The DOM element to check
 * @param offset - Optional offset from the viewport edge (percentage as decimal)
 * @returns boolean - Whether the element is in the viewport
 */
export const isInViewport = (element: HTMLElement, offset: number = 0.8): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * offset
  );
};

/**
 * Sets up scroll animations for elements with the 'animate-on-scroll' class
 */
export const setupScrollAnimations = (): (() => void) => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((element) => {
      if (isInViewport(element as HTMLElement)) {
        element.classList.add('show');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  // Initial check
  animateOnScroll();

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', animateOnScroll);
  };
};
