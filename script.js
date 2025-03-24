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
