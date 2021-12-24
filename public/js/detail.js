let init = {
    method: "GET",
    param: "hello"
  }
  //récupération des paramètre de l'url pour obtenir l'id du film
  const urlParam = location.pathname.split("/")
  //   formatage permettant d'obtenir l'id du film
  const id = urlParam[2];
  const detailMovieBlock = document.querySelector(".block-detail");

  const startPath = "./?path=ajax&action=";
const options = { method:"POST", body: ""};
const params = "language=en-US&page=1,init";
const endpoint = ["3/movie/now_playing"];
const limit = 10;
const API_KEY = "69ba83f78c85f28287d57b3ca8f8c45c";
const host = {"api": "https://api.themoviedb.org","site": "https://www.themoviedb.org"};
let param = "page=2"; 
const imageSizePath = [ "/t/p/w220_and_h330_face", "/t/p/w440_and_h660_face", "/t/p/w600_and_h900_bestv2" ];

 

    fetch(" https://api.themoviedb.org/3/movie/"+ id +"?api_key="+API_KEY+"&language=fr-FR&page=1")
    .then(res=>{
      return res.json();
    })
    .then(res => {
        const divDetail = document.createElement("div");
        const ulGenre = document.createElement("ul");
        ulGenre.classList.add("genre-content");

        for (const element of res.genres) {
            let li = document.createElement("li");
            li.innerHTML = element.name;
            ulGenre.appendChild(li)
        }
        let length = res.runtime / 60;
        length = length.toString();
        length = length.slice(0,4);
        length = length.replace("."," h ");
        divDetail.innerHTML = `
        <div class="block-detail-content container">
            <div class="content image-content">
                <img src="${host.site}/${imageSizePath[1]}/${res.poster_path}" alt="">
            </div>
            <div class="content text-content">
                <h2 class="title">${res.title}</h2>
                <p class="description">${res.overview}</p>
                <div class="sub-content length-release">
                    <p>durée: ${length} </p>
                    <p>---</p>
                    <p>date de sortie:${res.release_date} </p>
                </div>
                <div class="sub-content budget-revenu">
                    <p>budget : ${res.budget} $</p>
                    <p>---</p>
                    <p>revenu : ${res.revenue} $</p>
                </div>
                <a href="/?path=addCart&id=${res.id}" class="add-cart-content">
                    <p><i class="fas addCart fa-cart-plus"></i></p>
                </a>
            </div>
        </div>
        `;
        detailMovieBlock.appendChild(divDetail);
        let divBuget = document.querySelector(".budget-revenu");
        divBuget.after(ulGenre);
    })