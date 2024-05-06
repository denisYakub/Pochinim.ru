class WebSite{
    #locations;

    constructor(){
        this.#locations = [{city: 'Москва', coordinates: [55.75, 37.57]}, 
                            {city: 'Санкт-Петербург', coordinates: [59.57, 30.19]}, 
                            {city: 'Екатеринбург', coordinates: [56.50, 60.35]}];
    }

    setUserLocation(){
        const city = localStorage.getItem('city');

        if(city != null && this.#locations.some(obj => obj.city == city)){
            this.#locations.sort(function(a, b){
                if(a.city == city){
                    return -1;
                }else if(b.city == city){
                    return 1;
                }else{
                    return 0;
                } 
            });
        }
    }

    get cities(){
        const cities = this.#locations.map(val => {
            return { value: val.city, label: val.city };
        })
        return cities;
    }

    get currentCoordinates(){
        return this.#locations[0].coordinates;
    }

    get currentCity(){
        return this.#locations[0].city;
    }
}

const webSite = new WebSite();

export default webSite;