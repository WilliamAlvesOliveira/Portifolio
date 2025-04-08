function atualizarMenuPosition() {
    const header = document.querySelector('header');
    const altura = header.offsetHeight + 'px';
    document.documentElement.style.setProperty('--menuPosition', altura);
  }
  
  window.addEventListener('load', atualizarMenuPosition);

  window.addEventListener('resize', atualizarMenuPosition);

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
  
  document.getElementById('toggle-tema').addEventListener('click', () => {
    const atual = getComputedStyle(document.documentElement)
      .getPropertyValue('--bg-color')
      .trim();
  
    if (atual === '#f8f9fa') {
      ativarTemaEscuro();
    } else {
      ativarTemaClaro();
    }
  });
  
  

function showmenu(){
    menu.classList.toggle('show');
}

function goTo(id) {
    const section = document.getElementById(id);
     const header = document.querySelector('header');
    if (section && header) {
        const headerHeight = header.offsetHeight;
        const sectionPosition = section.offsetTop;
        window.scrollTo({
            top: sectionPosition - headerHeight, behavior: 'smooth' 
        });
    }
    if (menu && menu.classList.contains('show')) {
        menu.classList.remove('show');
    }
}

function showcel(projeto){
    const btn = document.querySelector(`#btn-${projeto}`)
    const cel = document.querySelector(`#${projeto}`) 

    if (btn && cel) {
        btn.style.display = 'none'
        cel.style.display = 'grid'
    }
}

function closecel(celular){
    const btn = document.querySelector(`#btn-${celular}`)
    const cel = document.querySelector(`#${celular}`) 

    if (btn && cel) {
        btn.style.display = 'flex'
        cel.style.display = 'none'
    }
}
