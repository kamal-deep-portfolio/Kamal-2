const dialog = document.querySelector('#image-dialog');
const expanded = document.querySelector('#expanded-image');
const title = document.querySelector('#image-title');
let trigger;
for (const button of document.querySelectorAll('[data-image]')) {
  button.addEventListener('click', () => {
    trigger = button;
    expanded.src = button.dataset.image;
    expanded.alt = button.querySelector('img').alt;
    title.textContent = button.dataset.caption;
    dialog.showModal();
    document.body.classList.add('image-open');
  });
}
document.querySelector('#close-image').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  document.body.classList.remove('image-open');
  trigger?.focus({preventScroll:true});
});
const links = [...document.querySelectorAll('aside nav a')];
if ('IntersectionObserver' in window && links.length) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      links.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, {rootMargin:'-5% 0px -65% 0px',threshold:0});
  document.querySelectorAll('.story-section').forEach(section => observer.observe(section));
}
