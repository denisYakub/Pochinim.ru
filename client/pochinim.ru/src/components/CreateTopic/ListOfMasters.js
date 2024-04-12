import TOPICController from "../../controllers/TOPIC-controller";

const list = await TOPICController.getListOfMasters();

const ListOfMasters = ({topic, setActivePop, setTextPop}) => {

    const checkTopic = (value) => {
        var tf = false;
        value.forEach(element => {
            if(element[0].toLowerCase().includes(topic.toLowerCase())){
                tf = true;
            }
        });
        return tf;
    }

    const sendMessage = () => {
        console.log("hi");
        setActivePop(true);
        setTextPop("Вы не можете писать специалистам, пока не заполните анкету");
    }

    const offerTopic = () => {
        setActivePop(true);
        setTextPop("Вы не можете предлагать специалистам, пока не заполните анкету");
    }

    return(list.map((value, index) => {
        if(checkTopic(value.sercicesAndPrice)){
            return(<div key={index} className="masterBox">
            <div className="masterCard">
                <div className="masterMainInfo">
                    <img src={value.photo} alt=""></img>
                    {value.name}
                    {value.stars}
                    {value.reviews}
                </div>
                <h1>Обо мне</h1>
                {value.about}
                <h1>Образование и опыт</h1>
                <div className="masterExperienceEducation">
                    {value.experience}
                    {value.education}
                </div>
                <h1>Услуги и цены</h1>
                <div className="mastersercicesAndPrice">
                    {value.sercicesAndPrice.map((val, ind) => {
                        return(
                            <div key={ind}>
                                {val[0]}
                                ....
                                {val[1]}
                            </div>
                        );
                    })}
                </div>
                <div>Отзывы</div>
                <div className="masterReviewsExample">
                    {value.reviewsExample.stars}
                    {value.reviewsExample.date}
                    {value.reviewsExample.from}
                    {value.reviewsExample.topic}
                    {value.reviewsExample.text}
                    {value.reviewsExample.price}
                </div>
            </div>
            <div className="masterAction">
                <button onClick={sendMessage}>Написать соощение</button>
                <button onClick={offerTopic}>Предложить заказ</button>
                <div className="masterLocation">
                    <a>Регион-</a>
                    <p>Москва и Мо</p>
                </div>
            </div>
        </div>);
        }else{
            return(<div>Не подходит</div>);
        }
    }));
}

export default ListOfMasters;