const API_URL = "https://script.google.com/macros/s/AKfycbzk3ufLYfkXP4UycglsKiPNypBuLMkKY2dvsWA88GAI4T34ULLBMw7wtxAAhS8TKGIARQ/exec";
let isLoading = false;

let images = [];
let index = 0;
const batchSize = 8;

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    images = data;
    loadImages();
  });

function loadImages() {
  const gallery = document.getElementById("gallery");

  for (let i = 0; i < batchSize && index < images.length; i++) {

    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    gallery.appendChild(skeleton);

    const img = document.createElement("img");
    img.src = images[index];
    img.loading = "lazy";

    // 🔑 IMPORTANT FIX
    img.onload = img.onerror = () => {
      skeleton.replaceWith(img);
      img.classList.add("loaded");
      img.style.transitionDelay = `${Math.random() * 0.15}s`;
    };

    index++;
  }
}



window.addEventListener("scroll", () => {
  if (
    !isLoading &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
  ) {
    isLoading = true;
    loadImages();
    setTimeout(() => (isLoading = false), 400);
  }
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.addEventListener("click", e => {
  if (e.target.tagName === "IMG" && e.target.closest(".gallery-grid")) {
    lightboxImg.src = e.target.src;
    lightbox.style.display = "flex";
  }
});

document.querySelector(".lightbox .close").onclick = () => {
  lightbox.style.display = "none";
};

lightbox.onclick = e => {
  if (e.target === lightbox) lightbox.style.display = "none";
};
setTimeout(() => {
  if (skeleton.parentNode) {
    skeleton.replaceWith(img);
    img.classList.add("loaded");
  }
}, 1500);
document.querySelector(".loader").style.display = "none";
images = data;
loadImages();
document.body.style.overflow = "hidden";
document.body.style.overflow = "";
