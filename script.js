"use strict";

(() => {
  // ==============================
  //       Inicializações
  // ==============================
  const fadeEls = document.querySelectorAll('.fade-in');
  const toggleTema = document.getElementById('toggle-tema');
  const menu = document.getElementById('menu');

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
  //    Ajuste visual do menu
  // ==============================
  function atualizarMenuPosition() {
    const header = document.querySelector('header');
    if (header) {
      const altura = header.offsetHeight + 'px';
      document.documentElement.style.setProperty('--menuPosition', altura);
    }
  }

  // ==============================
  //   Ajustar imagens para o grid
  // ==============================
  function ajustarImagensGrid() {
    document.querySelectorAll('.grid-images').forEach(container => {
      container.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (!src) return;
        const fileName = src.split('/').pop().split('.')[0];
        img.classList.add(fileName);
        img.style.gridArea = fileName;
      });
    });
  }

  // ==============================
  //            Menu
  // ==============================
  function configurarMenu() {
    document.addEventListener("click", function (e) {
      const hamburger = document.querySelector(".hamburger");
      if (menu.classList.contains("show") &&
          !menu.contains(e.target) &&
          !hamburger.contains(e.target)) {
        menu.classList.remove("show");
      }
    });

    window.showmenu = () => {
      menu.classList.toggle('show');
    };
  }

  // ==============================
  //     Scroll para seções
  // ==============================
  window.goTo = (id) => {
    const section = document.getElementById(id);
    const header = document.querySelector('header');

    if (section && header) {
      const offset = section.offsetTop - header.offsetHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }

    if (menu?.classList.contains('show')) {
      menu.classList.remove('show');
    }
  };

  // ===============================
  // Visualização mobile de projetos
  // ===============================
  window.showcel = (projeto) => {
    const btn = document.querySelector(`#btn-${projeto}`);
    const cel = document.querySelector(`#${projeto}`);
    if (btn && cel) {
      btn.style.display = 'none';
      cel.style.display = 'grid';
    }
  };

  window.closecel = (celular) => {
    const btn = document.querySelector(`#btn-${celular}`);
    const cel = document.querySelector(`#${celular}`);
    if (btn && cel) {
      btn.style.display = 'flex';
      cel.style.display = 'none';
    }
  };

  // ==============================
  //   Efeito de fade nos elementos
  // ==============================
  function iniciarFadeObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, { threshold: 0.04 });

    fadeEls.forEach(el => observer.observe(el));
  }

  // ==============================
  //      Modal de imagens
  // ==============================
  function configurarModal() {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close");
    const navLeft = document.querySelector(".nav.left");
    const navRight = document.querySelector(".nav.right");
    const thumbnails = document.querySelectorAll(".grid-images img");

    if (!modal || !modalImg || thumbnails.length === 0) return;

    const images = Array.from(thumbnails).map(img => img.src);
    let currentIndex = 0;

    function openModal(src) {
      modal.classList.remove("hidden");
      modalImg.src = src;
    }

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        currentIndex = index;
        openModal(images[currentIndex]);
      });
    });

    navLeft?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      modalImg.src = images[currentIndex];
    });

    navRight?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      modalImg.src = images[currentIndex];
    });

    closeBtn?.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    modal?.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("modal-container")) {
        modal.classList.add("hidden");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.classList.add("hidden");
      }
    });
  }

  // ==============================
  //         Inicialização
  // ==============================
  document.addEventListener("DOMContentLoaded", () => {
    const temaSalvo = localStorage.getItem('tema');
    temaSalvo === 'claro' ? ativarTemaClaro() : ativarTemaEscuro();
  });

  window.addEventListener('load', atualizarMenuPosition);
  window.addEventListener('resize', atualizarMenuPosition);
  toggleTema?.addEventListener('click', alternarTema);

  configurarMenu();
  ajustarImagensGrid();
  iniciarFadeObserver();
  configurarModal();
})();
