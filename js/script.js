var app = new Vue({
    el: "#app",
    data: {
        films: [],
        searched: "" ,
        showOverview: "overview__clamp"
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
                this.films = results.data.results
            });
            
        },
        show: function(){
            if(this.showOverview == "overview__clamp"){
                this.showOverview = ""
            }
            else{
                this.showOverview = "overview__clamp"
            }
            
        }
    }
    
})