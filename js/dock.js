document.querySelectorAll('.dock__item').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.dock__item').forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
});