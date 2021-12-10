
const options = document.querySelectorAll("option");
for(let option of options){

   option.addEventListener('click', function (){
       if(this.value != null){
           const id = this.value;
           console.log(id);
           fetch(`./?path=ajax&param=${id}`).then(res =>{
               return res.json();
           })
           .then(res => {
              
                document.querySelector('.del-movie-content input[name=id]').value = id;
                document.querySelector('.del-movie-content input[name=title]').value = res.title;
                document.querySelector('.del-movie-content input[name=duration]').value = res.duration;
                document.querySelector('.del-movie-content input[name=release_date]').value = res.release_date;
                document.querySelector('.del-movie-content input[name=budget]').value = res.budget;
                document.querySelector('.del-movie-content input[name=revenu]').value = res.revenu;
                document.querySelector('.del-movie-content input[name=price]').value = res.price;
                document.querySelector('.del-movie-content textarea').value = res.description;
           }).catch(err=>{
               console.log(err)
           })
           
       }
   })
}