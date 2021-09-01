// dayNightTheme = () => {
//   let date = new Date();
//   let hour = date.getHours();

//   if(hour >= 7 && hour < 19){
//     document.body.style.backgroundColor = 'white';
//     document.body.style.color = 'black';
//   }
//   else{
//     document.body.style.backgroundColor = 'black';
//     document.body.style.color = 'white';
//   }
// }

window.addEventListener('load', () => {
  apiRequest("random");
});

document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key == "Enter")
    apiRequest(input.value);
});

document.querySelector("#search").addEventListener("click", () => {
  apiRequest(input.value);
});

apiRequest = (value) => {

  document.querySelector("#grid").textContent = "";

  const url = 'https://api.unsplash.com/search/photos?query=' + value + '&per_page=30&client_id=nc5E-jYD_8Uf7egGSF2MAvoFrfwH--vBTq5SeacrQIk';

  fetch(url)

    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })

    .then(data => {
      if (data.length != 0) {
        loadImages(data);
      }
    })

    .catch(error => console.log(error));
}

loadImages = (data) => {
  for (let i = 0; i < data.results.length; i++) {
    let image = document.createElement("div");
    image.className = "img";
    image.style.backgroundImage = "url(" + data.results[i].urls.raw + "&w=1366&h=768" + ")";
    image.addEventListener("click", function () {
      window.open(data.results[i].links.download, '_blank');
    })
    document.querySelector("#grid").appendChild(image);
  }
}
