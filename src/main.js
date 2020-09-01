var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var discriptorTagLine1 = document.querySelector('.tagline-1');
var discriptorTagLine2 = document.querySelector('.tagline-2');
var showNewCoverButton = document.querySelector('.random-cover-button');
var makeOwnCoverButton = document.querySelector('.make-new-button');
var mainPageDisplay = document.querySelector('.main-cover');
var displayUserForm = document.querySelector('.form-view');
var saveCoverButton = document.querySelector('.save-cover-button');
var homeButton = document.querySelector('.home-button');
var viewSaveCoversSection = document.querySelector('.saved-view');
var viewSavedButton = document.querySelector('.view-saved-button');
var userCoverInput = document.querySelector('.user-cover');
var userTitleInput = document.querySelector('.user-title');
var userDescriptorInput1 = document.querySelector('.user-desc1');
var userDescriptorInput2 = document.querySelector('.user-desc2');
var makeABookButton = document.querySelector('.create-new-book-button');
var savedCoverSection = document.querySelector('.saved-covers-section');
var inputFields = document.getElementsByTagName('input');

var savedCovers = [];
var currentCover;

showNewCoverButton.addEventListener('click', displayMainPageCover);
makeOwnCoverButton.addEventListener('click', showUserFormPage);
viewSavedButton.addEventListener('click', viewSavedCovers);
homeButton.addEventListener('click', homeButtonFunction);
makeABookButton.addEventListener('click', clickHandler);
makeABookButton.addEventListener('mouseover', errorMessage);
saveCoverButton.addEventListener('click', saveCoverToArray);
savedCoverSection.addEventListener('dblclick', deleteSavedCovers);

window.onload = displayMainPageCover;

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
  for (var i = 0; i < inputFields.length; i++) { 
     inputFields[i].value = '' 
   };
  switchToUserPage();
  userPageButtonHandler();
  switchPagesSaveToUser();
}

function switchToUserPage() {
  mainPageDisplay.classList.add('hidden');
  displayUserForm.classList.remove('hidden');
}

function userPageButtonHandler() {
  showNewCoverButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  homeButton.classList.remove('hidden');
  viewSavedButton.classList.remove('hidden');
}

function switchPagesSaveToUser() {
  savedCoverSection.classList.add('hidden');
  viewSaveCoversSection.classList.add('hidden');
}

function viewSavedCovers() {
  displaySavedCover();
  viewSavedCoversButtonHandler();
  viewSavedCoversDisplayHandler();
}

function viewSavedCoversButtonHandler() {
  viewSavedButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  homeButton.classList.remove('hidden');
  showNewCoverButton.classList.add('hidden');
}

function viewSavedCoversDisplayHandler() {
  viewSaveCoversSection.classList.remove('hidden');
  mainPageDisplay.classList.add('hidden');
  displayUserForm.classList.add('hidden');
}

function homeButtonFunction() {
  switchToMainFromUser();
  mainToUserButtonHandler();
}

function switchToMainFromUser() {
  mainPageDisplay.classList.remove('hidden');
  displayUserForm.classList.add('hidden');
  viewSaveCoversSection.classList.add('hidden');
}

function mainToUserButtonHandler() {
  homeButton.classList.add('hidden');
  saveCoverButton.classList.remove('hidden');
  showNewCoverButton.classList.remove('hidden');
  viewSavedButton.classList.remove('hidden');
}

function createUserPost(event) {
  event.preventDefault();
  var coverValue = userCoverInput.value;
  var titleValue = userTitleInput.value;
  var descriptor1 = userDescriptorInput1.value;
  var descriptor2 = userDescriptorInput2.value;
  covers.push(coverValue);
  titles.push(titleValue);
  descriptors.push(descriptor1, descriptor2);
  currentCover = new Cover(coverValue, titleValue, descriptor1, descriptor2);
  coverImage.setAttribute('src', coverValue);
  coverTitle.innerHTML = titleValue;
  discriptorTagLine1.innerHTML = descriptor1;
  discriptorTagLine2.innerHTML = descriptor2;
}

function homeFromUserPage() {
  switchToHomeDispalyHandler();
  switchFromUserButtonHandler();
}

function switchToHomeDispalyHandler() {
  mainPageDisplay.classList.remove('hidden');
  displayUserForm.classList.add('hidden');
}

function switchFromUserButtonHandler() {
  showNewCoverButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
  homeButton.classList.add('hidden');
}

function clickHandler() {
  createUserPost(event);
  homeFromUserPage();
}

function saveCoverToArray() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  }
}

function displaySavedCover() {
  var coverData = '';
  for (var i = 0; i < savedCovers.length; i++) {
    var addDom = `
      <div class="mini-cover" id="${savedCovers[i].id}">
        <img class="cover-image" id="${savedCovers[i].id}" src="${savedCovers[i].cover}"/>
        <h2 class="cover-title" id="${savedCovers[i].id}">${savedCovers[i].title}</h2>
        <h3 class="tagline" id="${savedCovers[i].id}">A tale of <span>${savedCovers[i].tagline1}</span> and <span>${savedCovers[i].tagline2}</span></h3>
        <img class="price-tag" id="${savedCovers[i].id}" src="./assets/price.png">
        <img class="overlay" id="${savedCovers[i].id}" src="./assets/overlay.png">
      </div>
    `;
    coverData += addDom;
  }
  savedCoverSection.innerHTML = coverData;
}

function deleteSavedCovers(event) {
  var coverId = event.target.id;
  for (var i = 0; i < savedCovers.length; i++) {
    if (coverId === `${savedCovers[i].id}`) {
      savedCovers.splice(i, 1);
    }
  }
  displaySavedCover();
}

function dataValidate(data) { 
  for (i = 0; i < inputFields.length; i++) { 
    if (inputFields[i].value == '') { 
      makeABookButton.disabled = true; 
      return false; 
       } else { 
      makeABookButton.disabled = false; 
    } 
  } 
} 

function errorMessage() {
  var allowedExtension = ['jpeg', 'jpg', 'png', 'bmp'];
  var coverValue = userCoverInput.value.split('.');
  for (var i = 0; i < allowedExtension.length; i++) {
    for (var j = 0; j < coverValue.length; j++) {
      if (allowedExtension[i] === coverValue[j]) {
          return true;
      }
    }
  } alert `Not a valid image type`;
  return false;
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
