// Create variables targetting the relevant DOM elements here 👇
var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var discriptorTagLine1 = document.querySelector('.tagline-1');
var discriptorTagLine2 = document.querySelector('.tagline-2');
var showNewCoverButton = document.querySelector('.random-cover-button');
var makeOwnCoverButton = document.querySelector('.make-new-button');
var mainPageDisplay = document.querySelector('.main-cover');
var displayUserForm = document.querySelector('.form-view');

// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

// Add your event listeners here 👇
showNewCoverButton.addEventListener('click', displayMainPageCover);
makeOwnCoverButton.addEventListener('click', showUserFormPage);

window.onload = displayMainPageCover;

// Create your event handlers and other functions here 👇


// We've provided one function to get you started
function displayMainPageCover() {
  var randomCover = covers[getRandomIndex(covers)];
  var randomTitle = titles[getRandomIndex(titles)];
  var randomDescriptor = descriptors[getRandomIndex(descriptors)];
  var randomDescriptor2 = descriptors[getRandomIndex(descriptors)];
  currentCover = new Cover(randomCover, randomTitle, randomDescriptor, randomDescriptor2);
  coverImage.setAttribute('src', randomCover);
  coverTitle.innerHTML = randomTitle;
  discriptorTagLine1.innerText = randomDescriptor;
  discriptorTagLine2.innerHTML = randomDescriptor2;
}

function showUserFormPage() {
  mainPageDisplay.classList.add('hidden');
  displayUserForm.classList.remove('hidden');

}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
