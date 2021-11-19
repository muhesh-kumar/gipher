// 1. Grab the contents and listen to the events
document.querySelector(".container-button").addEventListener("click", function() {
  const searchValue = document.querySelector(".container-textinput").value;
  fetchAndDisplayGIFs(searchValue);
});

document.querySelector(".container-textinput").addEventListener("keyup", function(e) {
  const searchValue = document.querySelector(".container-textinput").value;
  // if (e.keyCode == 13) { -> e.keyCode is deprecated
  //   fetchGIFs(searchValue);
  // }
  if (e.which == 13) {
    fetchAndDisplayGIFs(searchValue);
  }
});

// 2. Fetch data from the API and display the GIFs
function fetchAndDisplayGIFs(searchValue) {
  for (let i = 0; i < searchValue.length; i++) {
    if (searchValue[i] === ' ')
      searchValue = '+';
  }

  let url = `http://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=dc6zaTOxFJmzC`;
  const gihpyAJAXCall = new XMLHttpRequest();
  gihpyAJAXCall.open("GET", url);
  gihpyAJAXCall.send();

  gihpyAJAXCall.addEventListener("load", function(e) {
    const data = e.target.response;
    pushToDOM(data);
  });
}

// 3. Shows the GIFs
function pushToDOM(searchValue) {
  const response = JSON.parse(searchValue);
  const imageUrls = response.data;
  const container = document.querySelector(".js-container");
  container.innerHTML = ""; // empty the div to clear the previous search results

  imageUrls.forEach(image => {
    const imageUrl = image.images.fixed_height.url;

    // const imageTag = document.createElement("img");
    // imageTag.setAttribute("src", imageUrl);
    // container.appendChild(imageTag);
    // (OR)
    container.innerHTML += `<img src=${imageUrl} class="container-image" />`;
  });
}