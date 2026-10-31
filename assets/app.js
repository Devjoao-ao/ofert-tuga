// Carrosséis (projetos e opiniões): deslizar com o dedo + botões anterior/seguinte em loop.
document.querySelectorAll('[aria-roledescription="carousel"]').forEach(function (carousel) {
  var viewport = carousel.querySelector('.overflow-hidden');
  if (!viewport) return;
  viewport.classList.remove('overflow-hidden');
  viewport.classList.add('carousel-viewport');

  var slides = viewport.querySelectorAll('[role="group"]');
  var buttons = carousel.querySelectorAll('button');
  var prev = buttons[0];
  var next = buttons[1];

  function currentIndex() {
    var left = viewport.scrollLeft;
    var best = 0;
    slides.forEach(function (slide, i) {
      if (Math.abs(slide.offsetLeft - left) < Math.abs(slides[best].offsetLeft - left)) best = i;
    });
    return best;
  }

  function atEnd() {
    return viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 4;
  }

  function goTo(i) {
    viewport.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
  }

  if (next) next.addEventListener('click', function () {
    goTo(atEnd() ? 0 : Math.min(currentIndex() + 1, slides.length - 1));
  });
  if (prev) prev.addEventListener('click', function () {
    var i = currentIndex();
    goTo(i === 0 ? slides.length - 1 : i - 1);
  });
});
