// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();

    const headerOffset = 78;
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// Menu mobile
const headerNav = document.querySelector(".header__nav");
const navToggle = document.querySelector(".header__nav-toggle");

if (headerNav && navToggle) {
  navToggle.addEventListener("click", () => {
    headerNav.classList.toggle("header__nav--open");
  });

  headerNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      headerNav.classList.remove("header__nav--open");
    });
  });
}

// Botão voltar ao topo
const backToTopBtn = document.querySelector(".back-to-top");

function handleScrollBackToTop() {
  if (!backToTopBtn) return;
  if (window.scrollY > 380) {
    backToTopBtn.classList.add("back-to-top--visible");
  } else {
    backToTopBtn.classList.remove("back-to-top--visible");
  }
}

if (backToTopBtn) {
  window.addEventListener("scroll", handleScrollBackToTop);
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Animações ao rolar (fade-in simples)
const animatedElements = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
} else {
  // Fallback simples
  animatedElements.forEach((el) => el.classList.add("is-visible"));
}

// Formulário de contato (simulação de envio)
const contactForm = document.getElementById("contato-form");
const formFeedback = document.getElementById("form-feedback");
const whatsappButton = document.querySelector(".form__whatsapp");

if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nome = formData.get("nome") || "";
    const data = formData.get("data") || "";

    formFeedback.textContent = "";
    formFeedback.classList.remove("form__feedback--success", "form__feedback--error");

    setTimeout(() => {
      formFeedback.textContent =
        "Mensagem enviada com sucesso! Nossa equipe retornará em breve para confirmar sua reserva.";
      formFeedback.classList.add("form__feedback--success");
      contactForm.reset();
    }, 450);
  });
}

// Botão de WhatsApp do formulário
if (whatsappButton) {
  whatsappButton.addEventListener("click", () => {
    const nomeInput = document.getElementById("nome");
    const dataInput = document.getElementById("data");

    const nome = nomeInput && nomeInput.value ? nomeInput.value.trim() : "";
    const data = dataInput && dataInput.value ? dataInput.value : "";

    const baseMessage = `Olá, gostaria de fazer uma reserva no Restaurante Aurora.`;
    const details = [];

    if (nome) details.push(`Nome: ${nome}`);
    if (data) details.push(`Data desejada: ${data}`);

    const fullMessage = `${baseMessage}${details.length ? "%0A%0A" + encodeURIComponent(details.join(" | ")) : ""}`;

    const whatsappUrl = `https://wa.me/5500000000000?text=${fullMessage}`;
    window.open(whatsappUrl, "_blank");
  });
}

// Ano atual no rodapé
const currentYearEl = document.getElementById("current-year");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear().toString();
}