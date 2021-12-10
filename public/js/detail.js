let init = {
    method: "GET",
    param: "hello"
  }
  //récupération des paramètre de l'url pour obtenir l'id du film
  const urlParam = location.pathname.split("/")
  //   formatage permettant d'obtenir l'id du film
  const id = urlParam[2];
  const detailMovieBlock = document.querySelector(".block-detail");


 

    fetch(" https://api.themoviedb.org/3/movie/"+ id +"?api_key="+API_KEY+"&language=en-US&page=1")
    .then(res=>{
      return res.json();
    })
    .then(res => {
        divDetail = document.createElement("div");
        ulGenre = document.createElement("ul");
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
                <a href="/addCart/${res.id}" class="add-cart-content">
                    <p><i class="fas addCart fa-cart-plus"></i></p>
                </a>
            </div>
        </div>
        `;
        detailMovieBlock.appendChild(divDetail);
        let divBuget = document.querySelector(".budget-revenu");
        divBuget.after(ulGenre);
    })