var app = new Vue({
    el: "#app",
    data: {
        films: [],
        series:[],
        searched: "" ,
        showOverview: "overview__clamp",
        vote: "",
        flagClass:'flag-icon flag-icon- + film.original_language'
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
                this.films = results.data.results;
                // console.log(this.films);
                this.voteModify();
                this.overviewNotAvailable();
            });
            axios.get("https://api.themoviedb.org/3/search/tv?api_key=56e179e57d4a7222dddc19a32b9ea0ee", {
                params:{
                    query: this.searched,
                    language: "it-IT"
                }
            })
            .then((results) => {
                this.series = results.data.results;
                this.series.forEach(element => {
                    this.films.push(element)
                });
                console.log(this.films);
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