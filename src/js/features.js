export default function () {
  const section = document.querySelector('[data-features]');
  const container = document.querySelector('[data-features-container]');
  const character = document.querySelector('[data-features-character]');
  const items = document.querySelectorAll('[data-features-item]');

  if (!section || !container || !character || !items.length) return;

  const DESKTOP_BREAKPOINT = 1440;
  const JUMP_ITEMS_COUNT = 3; // скільки перших карток персонаж відвідує
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function runCharacterAnimation() {
    if (prefersReducedMotion || window.innerWidth < DESKTOP_BREAKPOINT) return;

    character.getAnimations().forEach(anim => anim.cancel());
    items.forEach(item => item.setAttribute('data-features-dip', 'false'));

    const containerRect = container.getBoundingClientRect();
    const charWidth = character.offsetWidth;
    const charHeight = character.offsetHeight;

    // Беремо тільки перші JUMP_ITEMS_COUNT карток — решта персонажа не цікавлять
    const jumpItems = Array.from(items).slice(0, JUMP_ITEMS_COUNT);

    const points = jumpItems.map(item => {
      const rect = item.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2 - charWidth / 2,
        y: rect.top - containerRect.top - charHeight * 0.55,
      };
    });

    const startX = -charWidth - 40;
    const lastPoint = points[points.length - 1];
    const endX = lastPoint.x + charWidth * 2.5;

    const jumpHeight = 46;
    const ENTRY_DURATION = 500; // вхід персонажа зліва
    const JUMP_DURATION = 900; // час одного стрибка (зліт + приземлення)
    const EXIT_DURATION = 550; // виліт за правий край

    const totalDuration =
      ENTRY_DURATION + points.length * JUMP_DURATION + EXIT_DURATION;

    const keyframes = [];
    let elapsed = 0;

    // Вхід зліва
    keyframes.push({
      transform: `translate(${startX}px, ${points[0].y}px) scale(0.8)`,
      opacity: 0,
      offset: 0,
      easing: 'ease-out',
    });
    elapsed += ENTRY_DURATION;
    keyframes.push({
      transform: `translate(${startX + 30}px, ${points[0].y}px) scale(1)`,
      opacity: 1,
      offset: elapsed / totalDuration,
    });

    const dipSchedule = [];

    points.forEach((point, i) => {
      // Верхня точка дуги — прискорення вниз (падіння)
      const peakTime = elapsed + JUMP_DURATION * 0.45;
      keyframes.push({
        transform: `translate(${point.x}px, ${point.y - jumpHeight}px) rotate(${
          i % 2 === 0 ? -12 : 12
        }deg)`,
        opacity: 1,
        offset: peakTime / totalDuration,
        easing: 'ease-in',
      });

      // Приземлення — м'яке гальмування
      elapsed += JUMP_DURATION;
      keyframes.push({
        transform: `translate(${point.x}px, ${point.y}px) scale(1.1, 0.88)`,
        opacity: 1,
        offset: elapsed / totalDuration,
        easing: 'ease-out',
      });

      dipSchedule.push({ item: jumpItems[i], time: elapsed });
    });

    // Виліт за правий край
    keyframes.push({
      transform: `translate(${endX}px, ${lastPoint.y}px) scale(0.85)`,
      opacity: 0,
      offset: 1,
    });

    const animation = character.animate(keyframes, {
      duration: totalDuration,
      fill: 'forwards',
    });

    dipSchedule.forEach(({ item, time }) => {
      setTimeout(() => {
        item.setAttribute('data-features-dip', 'true');
        setTimeout(() => item.setAttribute('data-features-dip', 'false'), 260);
      }, time);
    });

    animation.onfinish = () => {
      character.style.opacity = '0';
    };
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCharacterAnimation();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(section);
}
