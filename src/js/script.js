const buttonFullItens = document.getElementById('buttonFullItens');
const buttonHortifruti = document.getElementById('buttonHortifruti');
const buttonLaticinio = document.getElementById('buttonLaticinio');

buttonFullItens.addEventListener('click', () => {
  buttonHortifruti.classList.remove('active');
  buttonLaticinio.classList.remove('active');
  buttonFullItens.classList.add('active');
});
buttonHortifruti.addEventListener('click', () => {
  buttonFullItens.classList.remove('active');
  buttonLaticinio.classList.remove('active');
  buttonHortifruti.classList.add('active');
});
buttonLaticinio.addEventListener('click', () => {
  buttonFullItens.classList.remove('active');
  buttonHortifruti.classList.remove('active');
  buttonLaticinio.classList.toggle('active');
});
