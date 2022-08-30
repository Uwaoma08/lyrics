const input = document.querySelector("input");
const button = document.querySelector(".button");
const showSong = document.querySelector(".artist");
const moreInfo = document.querySelector(".get-lyrics-btn");
const section3 = document.querySelector(".section3");
const close = document.querySelector(".la-times-circle");
const generateToken = document.querySelector(".token");
const getSong = document.getElementById("get-song");



let musicians = [];



function takeToMore(e){
  const id = e.target.dataset.show;
  const item = musicians.find((item=> 
    item.id == id));
    
    console.log(item.images[1])

    section3.querySelector('#nameValue').innerHTML = item.artists[0].name;
    section3.querySelector('#titleValue').innerHTML = item.name;
    section3.querySelector('#downloadValue').innerHTML = item.artists[0].href;
    section3.querySelector('#imageValue').src = item.images[0].url;
    section3.querySelector('#dateValue').innerHTML = item.release_date;
  
  section3.classList.toggle("hide")
}


function afterFetch(){
  const moreLyrics = document.querySelectorAll('.get-lyrics-btn')

    moreLyrics.forEach((lyric) => {
    lyric.addEventListener('click', takeToMore)
  })
}

function myFunction() {
 
}
myFunction();

// moreInfo.addEventListener("click", () => {
//   section3.classList.toggle("hide");
// });

close.addEventListener("click", () => {
  section3.classList.toggle("hide");
});

generateToken.addEventListener("click", newToken);
button.addEventListener("click", searchSong);

function searchSong() {
  fetch(
    `https://api.spotify.com/v1/search?query=${input.value}&type=album&offset=0&limit=20`,
    {
      method: "GET",
      headers: {
        authorization:
          " Bearer BQCZR5oWizf6vkZXLimNddvAtOK5ZNWRdW32ReGajmbZFR1tiSFH80bdTXDvtxH7Vpcm-qKhmTeL0V9Xl544l1v2vUK4I9Ql0ApHgIr9Ro6jgsgGQSM",
          
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const render = data.albums.items
      .map((item) => {
        musicians.push(item)
          // console.log(item)
          return `
                <div id="get-lyrics" class="get-lyrics">
                    <div class="artist"><strong>${item.artists[0].name}</strong></div>
                    <button class="get-lyrics-btn" data-show='${item.id}' >Song Info</button>
                </div>`
        })
        .join();

      getSong.innerHTML = render;
      afterFetch()
    });
}
//const artistName= item.artists[0].name;

function newToken() {
  fetch(
    `https://accounts.spotify.com/api/token?grant_type=client_credentials&`,
    {
      method: "post",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      // showSong.innerHTML = input.value;
    });
}
