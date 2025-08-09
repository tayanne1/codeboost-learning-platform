// ------ Seletores principais ------ \\
const bullets = document.querySelectorAll(".bullets span"); // Navegação/carrossel
const images = document.querySelectorAll(".image"); // Imagens do carrossel
const inputs = document.querySelectorAll(".input-field"); // Campos de formulário
const toggleButtons = document.querySelectorAll(".toggle"); // Botões alternar login/signup
const main = document.querySelector("main"); // Elemento principal
const textGroup = document.querySelector(".text"); // Grupo de textos do carrossel
const texts = document.querySelectorAll(".text p"); // Textos individuais
const wrap = document.querySelector(".wrap-text"); // Container do texto

// ------ Menu hambúrguer ------ \\
const menuToggle = document.querySelector(".menu-toggle"); // Botão abrir/fechar menu
const menu = document.querySelector(".menu"); // Menu de navegação

// ------ Alternância de tema ------ \\
const toggleBtn = document.getElementById("theme-toggle"); // Botão alternar tema
const moonIcon = document.getElementById("moon-icon"); // Ícone de lua (modo escuro)
const sunIcon = document.getElementById("sun-icon"); // Ícone de sol (modo claro)

// ------ INTERAÇÃO: Label flutuante nos inputs ------ \\
inputs.forEach((input) => {
  // Ao carregar a página, se já tiver valor (ex.: autofill), ativa o label
  if (input.value.trim() !== "") {
    input.classList.add("active");
  }

  // Quando o campo ganha foco
  input.addEventListener("focus", () => {
    input.classList.add("active");
  });

  // Quando o campo perde foco
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.classList.remove("active");
    }
  });
});

// ------ MODO TOGGLE: Alternar login/signup ------ \\
toggleButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Evita scroll para o topo ao clicar
    main.classList.toggle("signup-mode");
  });
});

// ------ CARROSSEL DE TEXTO E IMAGEM ------ \\
let index = 0;

const heights = Array.from(texts).map((p) => p.offsetHeight);

wrap.style.height = `${heights[0]}px`;

function updateSlider(index) {
  images.forEach((img) => img.classList.remove("show"));
  const currentImage = document.querySelector(`.img-${index + 1}`);
  if (currentImage) currentImage.classList.add("show");

  bullets.forEach((bullet) => bullet.classList.remove("active"));
  if (bullets[index]) bullets[index].classList.add("active");

  const offset = heights.slice(0, index).reduce((acc, h) => acc + h, 0);
  textGroup.style.transform = `translateY(-${offset}px)`;

  wrap.style.height = `${heights[index]}px`;
}

// ------ INTERAÇÃO: Clicar nas bullets ------ \\
bullets.forEach((bullet) => {
  bullet.addEventListener("click", () => {
    index = parseInt(bullet.dataset.value) - 1;
    updateSlider(index);
  });
});

// ------ CARROSSEL AUTOMÁTICO ------ \\
setInterval(() => {
  index = (index + 1) % texts.length;
  updateSlider(index);
}, 4000);

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Carregar modo salvo
if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark-mode");
  moonIcon.style.display = "none";
  sunIcon.style.display = "inline";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  moonIcon.style.display = isDark ? "none" : "inline";
  sunIcon.style.display = isDark ? "inline" : "none";

  // Salvar escolha
  localStorage.setItem("dark-mode", isDark);
});
