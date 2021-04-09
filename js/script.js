var app = new Vue({
    el: "#app",
    data: {
        films: [],
        searched: "" ,
        showOverview: "overview__clamp",
        vote: "",
    }, 
    methods: {
        search: function(){
            axios.get("https://api.themoviedb.org/3/search/movie?api_key=56e179e57d4a7222dddc19a32b9ea0ee", {
                params:{
                    query: this.searched,
                    language: "it-IT"
                }
            })
            .then((results) => {
                console.log(results.data.results);
                this.films = results.data.results;
                this.voteModify();
                this.overviewNotAvailable();
            });
            
        },
        show: function(){
            if(this.showOverview == "overview__clamp"){
                this.showOverview = "overview__open"
            }
            else{
                this.showOverview = "overview__clamp"
            }
            
        },
        resetOverview: function(){
            this.showOverview = "overview__clamp"
        },
        overviewNotAvailable: function(){
            this.films.forEach(element => {
                if(element.overview == ""){
                    element.overview = "Descrizione non disponibile"
                }
            });
        },
        voteModify: function(){
            this.films.forEach(element => {
                element.vote_average = Math.ceil(element.vote_average / 2);
            });
        }

    }
    
})