var app = new Vue({
    el: "#app",
    data: {
        mix:[],
        films: [],
        series:[],
        popular:[],
        searched: "" ,
        showOverview: "overview__clamp",
        allActive: false,
        filmActive: false,
        seriesActive: false,
        flag:['en', 'it']
    }, 
    methods: {
        search: function(){
            this.mix = [];
            this.allActive = true;
            this.filmActive = true;
            this.seriesActive = true;
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
        showSection: function(element){

            element.target.classList.toggle('active');

            if ( element.target.innerHTML == "all" ) {
                if( element.target.classList =="active"){
                    this.allActive = true
                    console.log(this.allActive);
                }
                else{
                    this.allActive = false;
                    console.log(this.allActive);
                }
            }
            else if ( element.target.innerHTML == "films" ) {
                if( element.target.classList =="active"){
                    this.filmActive = true
                    console.log(this.filmActive);
                }
                else{
                    this.filmActive = false;
                    console.log(this.filmActive);
                }
            } 
            else{
                if( element.target.classList =="active"){
                    this.seriesActive = true
                    console.log(this.seriesActive);
                }
                else{
                    this.seriesActive = false;
                    console.log(this.seriesActive);
                }
            }

            
            
        },
        loadPopular: function(){
            axios.get("https://api.themoviedb.org/3/movie/popular?api_key=56e179e57d4a7222dddc19a32b9ea0ee") 
                
            .then((response) =>{
            this.popular = response.data.results;
            this.voteModify(this.popular);
            this.overviewNotAvailable(this.popular);
        });
        }
        

    },
    mounted: function(){
        this.loadPopular()
    }
    
})