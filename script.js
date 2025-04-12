// ==============================
//        Variáveis globais
// ==============================
const menu = document.getElementById('menu');
const toggleTema = document.getElementById('toggle-tema');
const fadeEls = document.querySelectorAll('.fade-in');

// =================================
// Layout: calcular altura do header
// =================================
function atualizarMenuPosition() {
  const header = document.querySelector('header');
  const altura = header.offsetHeight + 'px';
  document.documentElement.style.setProperty('--menuPosition', altura);
}

// =====================================
// Layout: ajustando imagens para o grid
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  // Tema salvo
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'claro') ativarTemaClaro();
  else ativarTemaEscuro();

  // Grid
  const containers = document.querySelectorAll('.grid-images');
  containers.forEach(container => {
    container.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (!src) return;

      const fileName = src.split('/').pop().split('.')[0];
      img.classList.add(fileName);
      img.style.gridArea = fileName;
    });
  });
});

// ==============================
//       Tema claro/escuro
// ==============================
function ativarTemaClaro() {
  const root = document.documentElement;
  root.style.setProperty('--bg-color', '#f8f9fa');
  root.style.setProperty('--text-color', '#1e1e1e');
  root.style.setProperty('--border-color', '#d72638');
  document.body.classList.add('tema-claro');
}

function ativarTemaEscuro() {
  const root = document.documentElement;
  root.style.setProperty('--bg-color', 'rgb(40, 40, 40)');
  root.style.setProperty('--text-color', 'white');
  root.style.setProperty('--border-color', 'gray');
  document.body.classList.remove('tema-claro');
}

function alternarTema() {
  const atual = getComputedStyle(document.documentElement)
    .getPropertyValue('--bg-color')
    .trim();

  if (atual === '#f8f9fa') {
    ativarTemaEscuro();
    localStorage.setItem('tema', 'escuro');
  } else {
    ativarTemaClaro();
    localStorage.setItem('tema', 'claro');
  }
}

// ==============================
//          Menu 
// ==============================
function showmenu() {
  menu.classList.toggle('show');
}

// ==============================
//      Scroll para seções
// ==============================
function goTo(id) {
  const section = document.getElementById(id);
  const header = document.querySelector('header');

  if (section && header) {
    const headerHeight = header.offsetHeight;
    const sectionPosition = section.offsetTop;

    window.scrollTo({
      top: sectionPosition - headerHeight,
      behavior: 'smooth'
    });
  }

  if (menu?.classList.contains('show')) {
    menu.classList.remove('show');
  }
}

// ========================================
//  Exibir visualização mobile dos projetos
// ========================================
function showcel(projeto) {
  const btn = document.querySelector(`#btn-${projeto}`);
  const cel = document.querySelector(`#${projeto}`);

  if (btn && cel) {
    btn.style.display = 'none';
    cel.style.display = 'grid';
  }
}

function closecel(celular) {
  const btn = document.querySelector(`#btn-${celular}`);
  const cel = document.querySelector(`#${celular}`);

  if (btn && cel) {
    btn.style.display = 'flex';
    cel.style.display = 'none';
  }
}

// ==============================
//   Efeito de fade nos projetos
// ==============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // volta a ficar invisível
    }
  });
}, {
  threshold: 0.04
});

fadeEls.forEach(el => observer.observe(el));

// ==============================
//    Eventos de inicialização
// ==============================
window.addEventListener('load', atualizarMenuPosition);
window.addEventListener('resize', atualizarMenuPosition);
toggleTema.addEventListener('click', alternarTema);
