# Reduced-motion accessibility

Honor the visitor's reduced-motion preference across public-site scrolling and visual effects while leaving normal-motion behavior and the light admin area unchanged.

## Changes
- Reveal all scroll-animated content immediately and remove its motion when reduced motion is active.
- Stop route-entry and GSAP scroll animations, smooth scrolling, and the animated cursor; respond if the preference changes while the site is open.
- Disable decorative CSS animations/transitions in the public dark theme and keep the hero on its existing static fallback.
- Skip the decorative loading screen for reduced-motion visitors so it does not wait on the disabled 3D scene.

## Technical details
Use the existing reduced-motion capability hook and CSS media query; scope global motion overrides to the public `.dark` theme so the admin interface remains unaffected. Verify both initial reduced-motion mode and a live preference change in the browser.
