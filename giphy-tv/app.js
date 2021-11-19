const gifURL = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";
const container = document.querySelector(".container")

// When the window loads!
window.addEventListener("load", function() {
  container.innerHTML = "<h1>Welcome to Giphy TV!</h1>"
  
  setTimeout(() => {
    container.innerHTML = ""; // clear the screen before displaying the TV;
    showTV();
  }, 3000);
});

function showTV() {
  const giphyTVAJAXCall = new XMLHttpRequest();
  giphyTVAJAXCall.open("GET", gifURL);
  giphyTVAJAXCall.send();

  giphyTVAJAXCall.addEventListener("load", function(e) {
    const data = e.target.response;
    pushToDOM(data);
  });
}

function pushToDOM(searchValue) {
  const response = JSON.parse(searchValue);
  const imageURLs = response.data;
  container.innerHTML = "";
  
  // displays the gifs one by one.. like switching between TV channels
  let cnt = 0;
  imageURLs.forEach(image => {
    setTimeout(() => {
      const imageURL = image.images.fixed_height.url;
      container.innerHTML = `<img src=${imageURL} />`
    }, 5000 * cnt);
    cnt++;
  });
}

