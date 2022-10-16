const imageContainerEl = document.getElementById("image-container");
const loaderEl = document.getElementById("loader");
const apiKey = "0Npiv2_mVW7TL9vragJct20coo5A8Gi2wChjowK6soA";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}`;
const initImgCount = 5;
const subSeqImgCount = 20;


let photos = [];
let ready = false;
let imagesLoaded = 0;

async function getPhotos(imgCount) {
  try {
    const urlWithImgCount = `${apiUrl}&count=${imgCount}`
    const response = await fetch(urlWithImgCount);
    photos = await response.json();
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === photos.length) {
    loaderEl.hidden = true;
    ready = true;
  }
}

function displayPhotos() {
  photos.forEach((photo) => {
    const a = document.createElement("a");
    a.setAttribute("href", photo.links.html);
    a.setAttribute("traget", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    photo.alt_description && img.setAttribute("alt", photo.alt_description);
    photo.alt_description && img.setAttribute("title", photo.alt_description);

    a.appendChild(img);
    imageContainerEl.appendChild(a);

    img.addEventListener("load", imageLoaded);
  });
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imagesLoaded = 0;
    getPhotos(subSeqImgCount);
  }
});

getPhotos(initImgCount);
