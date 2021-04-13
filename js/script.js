var app = new Vue({
    el: "#app",
    data: {
        mix:[],
        films: [],
        series:[],
        searched: "" ,
        showOverview: "overview__clamp",
        allActive: "",
        filmsActive: "",
        seriesActive: "",
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
                this.overviewNotAvailable(this.films);
                this.voteModify(this.films);
                this.films.forEach((element) => {
                    this.mix.push(element)
                });
                axios.get("https://api.themoviedb.org/3/search/tv?api_key=56e179e57d4a7222dddc19a32b9ea0ee", {
                params:{
                    query: this.searched,
                    language: "it-IT"
                }
                })
                .then((results) => {
                    this.series = results.data.results;
                    this.voteModify(this.series);
                    this.overviewNotAvailable(this.series);
                    this.series.forEach((element) => {
                        this.mix.push(element)
                    });
                });
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
        overviewNotAvailable: function(item){
            item.forEach((element) => {
                if(element.overview == ""){
                    element.overview = "Descrizione non disponibile"
                }
            });
        },
        voteModify: function(item){
            item.forEach((element) => {
                element.vote_average = Math.ceil(element.vote_average / 2);
            });
        },
        giveClass: function(e){
            e.target
        }

    }
    
})