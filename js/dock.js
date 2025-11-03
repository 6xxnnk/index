document.addEventListener("DOMContentLoaded", () => {
    const panel = document.querySelector('.dock-panel');
const btnMenu = document.querySelector('.dock__item[data-action="menu"]');
const btnClose = document.querySelector('.dock-panel__close');

btnMenu.addEventListener('click', ()=>{
  panel.classList.add('is-open');
  panel.setAttribute('aria-hidden','false');
  btnClose.focus();
});
btnClose.addEventListener('click', ()=>{
  panel.classList.remove('is-open');
  panel.setAttribute('aria-hidden','true');
  btnMenu.focus();
});
panel.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ btnClose.click(); } });

});