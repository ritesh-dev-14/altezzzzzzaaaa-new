import React, { useEffect, useRef } from 'react';

function CursorGlow() {
  const glowRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const canUseEffect = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    );
    if (!canUseEffect.matches) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let animationFrame = 0;

    const moveElement = (element, x, y) => {
      if (element) {
        element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const animateOrb = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      moveElement(orbRef.current, current.x, current.y);

      if (Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1) {
        animationFrame = window.requestAnimationFrame(animateOrb);
      } else {
        animationFrame = 0;
      }
    };

    const handlePointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      moveElement(glowRef.current, target.x, target.y);

      if (glowRef.current) glowRef.current.classList.add('is-visible');
      if (orbRef.current) orbRef.current.classList.add('is-visible');
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animateOrb);
    };

    const handlePointerLeave = () => {
      if (glowRef.current) glowRef.current.classList.remove('is-visible');
      if (orbRef.current) orbRef.current.classList.remove('is-visible');
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="cursor-effect" aria-hidden="true">
      <span className="cursor-effect__glow" ref={glowRef} />
      <span className="cursor-effect__orb" ref={orbRef} />
    </div>
  );
}

export default CursorGlow;
