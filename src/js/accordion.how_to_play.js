export default function () {
  const triggers = document.querySelectorAll('[data-trigger]');
  const descriptions = document.querySelectorAll('[data-descr]');
  const images = document.querySelectorAll('[data-img]');
  const items = document.querySelectorAll('[data-item]');
  const imgContainer = document.querySelector('[data-img-container]');
  const howToPlayContainer = document.querySelector(
    '[data-how-to-play-container]'
  );

  const mobileQuery = window.matchMedia('(max-width: 1439px)');

  function moveImgContainer(activeIndex) {
    if (mobileQuery.matches) {
      const activeItem = document.querySelector(
        `[data-item][data-index="${activeIndex}"]`
      );
      const activeDescr = activeItem.querySelector('[data-descr]');
      activeDescr.insertAdjacentElement('afterend', imgContainer);
    } else {
      howToPlayContainer.appendChild(imgContainer);
    }
  }

  function setActive(index) {
    descriptions.forEach(descr => {
      descr.dataset.hidden =
        descr.dataset.index === String(index) ? 'false' : 'true';
    });
    images.forEach(img => {
      img.dataset.hidden =
        img.dataset.index === String(index) ? 'false' : 'true';
    });
    moveImgContainer(index);
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      setActive(Number(trigger.dataset.index));
    });
  });

  mobileQuery.addEventListener('change', () => {
    const activeDescr = [...descriptions].find(
      d => d.dataset.hidden === 'false'
    );
    moveImgContainer(Number(activeDescr.dataset.index));
  });

  setActive(0);
}
