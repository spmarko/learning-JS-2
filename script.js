let seatsContainer = document.getElementById('seats-container');
let legend = document.querySelector('.legend');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');
let movieSelect = document.getElementById('movie');

//This is for INFO selected + count
let selectedSeatsLabel = document.getElementById('selectedSeatsLabel');
let priceSeatsLabel = document.getElementById('priceSeatsLabel');

function loadData() {
  let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  let selectedMovie = localStorage.getItem('selectedMovieIndex');
  let selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((element,index) => {
     if(selectedSeats.indexOf(index) > -1){
       element.classList.add('selected');
     }
    });
  }

  if(selectedMovie !==null) {
    movieSelect.selectedIndex = selectedMovie;
  }
  updateSelectedSeats();
}
function updateSelectedSeats() {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  selectedSeatsLabel.innerHTML = selectedSeats.length;
  priceSeatsLabel.innerHTML = selectedSeats.length * +movieSelect.value;

  const seatsIndex = [...selectedSeats].map(element => {
    const index = [...seats].indexOf(element);
    return index;
  })
  console.log(seatsIndex);
  localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
}

seatsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedSeats();
  }
})

movieSelect.addEventListener('change',(e) => {
  localStorage.setItem('selectedMovieIndex',e.target.selectedIndex);
  localStorage.setItem('selectedMoviePrice',e.target.value);
  updateSelectedSeats();
})

let clearDataBTN = document.querySelector('#clearDataBTN');
clearDataBTN.addEventListener('click',(e) => {
  localStorage.clear();
  deleteAllSelected();
})

function deleteAllSelected() {
  localStorage.clear();
  seats.forEach(el => {
   if(el.classList.contains('selected')){
     el.classList.remove('selected');
   }
  })
  updateSelectedSeats();
}
loadData();