class WebsiteController{
    async getReviews(){
        const review = {
            review: {
              topic: "Чистка ноутбука, замена термопасты",
              time: "Мастер нашелся за 15 мин",
              price: "1200 руб, оплата СБР",
              a: "Первый раз за 8 лет решила почистить ноутбук, в жару он стал сильно греться. Услуга была выполнена быстро и качественно, за 30 минут. Всем очень довольна!:)",
              date: "5 декабря 2023 г.",
            },
             master: {
                name: "Александр Н.",
                rate: "Рейтинг мастера: 4.5",
                stat: "Выполнил: 122 задания ",
                photo: "defult"
             }
            }
            return [review, review, review, review, review, review, review, review, review, review, review, review];
    }
    
    async getHints(){
        return ["Прорволо трубу", "Сломался кондиционер", "Починить телефон"];
    }
    
    async getServices(){
        const service = {
            mainBrunch: {
                name: "Электроника",
                numberOfMasters: 1545
            },
            subBrunches: ["Ремонт компьютеров", "Ремонт оргтехники", "Ремонт приставок", "Ремонт телефонов", "Ремонт электроники", "+"]
        }
        return [service, service, service, service, service, service];
    }
}

const websiteController = new WebsiteController();

export default websiteController;