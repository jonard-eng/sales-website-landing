const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const faqItems = document.querySelectorAll('.faq-item');
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  if (!button) return;

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach((faq) => {
      faq.classList.remove('active');
      faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector('input[name="name"]');
    const name = nameInput?.value?.trim() || 'there';

    formStatus.textContent = `Thanks, ${name}! Your inquiry has been received. We'll be in touch soon.`;
    contactForm.reset();
  });
}
