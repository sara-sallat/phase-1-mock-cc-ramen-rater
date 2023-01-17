// write your code here
const imgMenue = document.getElementById("ramen-menu");

function displayImages(images) {
  images.map((menueInfo) => {
    imgMenue.innerHTML += `<img id=${menueInfo.id} src=${menueInfo.image} />`;
  });
}

function clickedImg(images) {
  const menueImages = document.querySelectorAll("#ramen-menu img");
  const imgDisplayed = document.querySelector(".detail-image");
  const nameDisplayed = document.querySelector("h2");
  const restDisplayed = document.querySelector(".restaurant");
  const ratingDisplayed = document.getElementById("rating-display");
  const commentDisplayed = document.getElementById("comment-display");

  images.map((image) => {
    for (let i = 0; i < menueImages.length; i++) {
      menueImages[i].addEventListener("click", () => {
        if (image.id == menueImages[i].id) {
          console.log(image);
          console.log(menueImages[i]);
          console.log("naji");
          console.log(restDisplayed);

          nameDisplayed.textContent = image.name;
          restDisplayed.textContent = image.restaurant;
          imgDisplayed.src = image.image;
          ratingDisplayed.textContent = image.rating;
          commentDisplayed.textContent = image.comment;
        }
      });
    }
  });
}

fetch("http://localhost:3000/ramens")
  .then((response) => {
    return response.json(); //why we put return to get the data?
  })
  .then((data) => {
    displayImages(data);
    clickedImg(data);
  });

const newRamen = document.getElementById("new-ramen")[5];
newRamen.addEventListener("click", (e) => {
  e.preventDefault();
  createNewRamen();
});

function createNewRamen() {
  const newName = document.getElementById("new-name");
  const newRest = document.getElementById("new-restaurant");
  const newImage = document.getElementById("new-image");
  const newRating = document.getElementById("new-rating");
  const newComment = document.getElementById("new-comment");

  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      comment: newComment.value,
      image: newImage.value,
      name: newName.value,
      rating: newRating.value,
      restaurant: newRest.value,
    }),
  })
    .then((response) => {
      response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
