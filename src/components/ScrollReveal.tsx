'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollReveal = () => {
  const pathname = usePathname();

  useEffect(() => {
    const selector =
      '.reveal, .reveal-tilt, .reveal-scale, .reveal-stamp, .reveal-left, .reveal-right, .reveal-pop, .reveal-flip, .sv-reveal, .sv-reveal-tilt, .sv-reveal-pop, .el-reveal, .dlx-reveal, .dlx-reveal-left, .dlx-reveal-right';

    const activate = (el: Element) => {
      el.classList.add('is-in', 'sv-is-in', 'el-is-in', 'dlx-is-in');
    };

    const init = () => {
      const revealEls = document.querySelectorAll(selector);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activate(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '120px 0px 80px 0px' }
      );

      revealEls.forEach((el) => {
        observer.observe(el);
        const rect = el.getBoundingClientRect();
        // Immediately reveal elements near or in the viewport
        if (rect.top < window.innerHeight + 150 && rect.bottom > -50) {
          activate(el);
        }
      });

      // Safety timeout: ensure everything visible is displayed
      const timer = setTimeout(() => {
        revealEls.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 100) {
            activate(el);
          }
        });
      }, 300);

      // Rotating badge stamps if present
      const badges = document.querySelectorAll('.dlx-badge-wrap');
      const stampHandlers: Array<() => void> = [];
      badges.forEach((badge) => {
        const stamp = badge.querySelector('.dlx-badge-stamp') as HTMLElement;
        if (stamp) {
          const handleScroll = () => {
            const rotation = window.scrollY * 0.15;
            stamp.style.transform = `rotate(${rotation}deg)`;
          };
          window.addEventListener('scroll', handleScroll, { passive: true });
          stampHandlers.push(() => window.removeEventListener('scroll', handleScroll));
        }
      });

      return () => {
        clearTimeout(timer);
        revealEls.forEach((el) => observer.unobserve(el));
        stampHandlers.forEach((h) => h());
      };
    };

    // Run after DOM has flushed
    const cleanup = init();
    return cleanup;
  }, [pathname]);

  return null;
};
