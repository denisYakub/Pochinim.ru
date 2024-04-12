import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import { useState, useRef } from "react";
import Select from 'react-select';

const key = "52112b4d-5217-4897-8975-50bb62c674a6";

const MasterLocationEnter = ({workingFrom, setWorkingFrom, location, setLocation}) => {

    const [zoom, setZoom] = useState(9);
    const [center, setCenter] = useState([55.75, 37.57]);
    const [selectedOptions, setSelectedOptions] = useState();

    const [placemarkCoords, setPlacemarkCoords] = useState(null);

    const ymaps = useRef(null);
    const mapRef = useRef(null);

    const hints = ["Выезжаю к клиентам", "Принимаю клиентов у себя"];
    const optionList = [
        { value: "b-1", label: "Садовая" },
        { value: "b-2", label: "Сенная площадь" },
        { value: "yellow", label: "Yellow" },
        { value: "b-3", label: "Спортивная" },
        { value: "0-1", label: "Спасская" }
      ];

    const handleWorkingFrom = (value) => {
        setWorkingFrom(value)
    }

    function setAddress(loc){
        ymaps.current.geocode(loc).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const newCoords = firstGeoObject.geometry.getCoordinates();
            setCenter(newCoords);
            setZoom(10);
        })
    }

    const handleMapClick = (e) => {
        const coords = e.get("coords");
        setPlacemarkCoords(coords)
        
        ymaps.current.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const newAddress = [
                firstGeoObject.getLocalities().length
                    ? firstGeoObject.getLocalities()
                    : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                firstGeoObject.getPremiseNumber()
            ]
            .filter(Boolean)
            .join(", ");
            setLocation(newAddress);
        });
    };

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    return(<div className="phaseBlock">
        {workingFrom==0?
        <div>
            <h1>Где работаете?</h1>
            <a>Будем предлагать заказы поблизости.</a>
            <div className="options" onChange={e => handleWorkingFrom(e.target.value)}>
                <div className="option">
                    <input type="radio" value={1}></input>
                    <p>Выезжаю к клиентам</p>
                </div>
                <div className="option">
                    <input type="radio" value={2}></input>
                    <p>Принимаю клиентов у себя</p>
                </div>
            </div>
        </div>
        :
        <div className="location-block">
            <h1>Ваш адрес</h1>
            <a>Будем предлагать заказы поблизости. Ваш адрес не будет виден клиентам.</a>
            <div className="final-address">
                {workingFrom==1?
                <div className="truck-icon"></div>
                :
                <div className="home-icon"></div>}
                <p>{hints[workingFrom-1]}</p>
            </div>
            {workingFrom==2?
            <div>
                <input placeholder={"Город, улица, дом"} onChange={e => setAddress(e.target.value)}></input>
                <YMaps query={{apikey: key}}>
                    <Map onClick={handleMapClick} 
                        onLoad={(e) => { ymaps.current = e }}
                        modules={["Placemark", "geocode", "geoObject.addon.balloon"]}
                        instanceRef={mapRef}
                        state={{center: center, zoom: zoom}} 
                        width={"542px"} height={"267px"}>
                            {placemarkCoords && (<Placemark geometry = 
                            {placemarkCoords}></Placemark>)}
                    </Map>
                </YMaps>
            </div>
            :
            <div>
                <Select
                    options={optionList}
                    placeholder="Выберите метро"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                />
            </div>}
        </div>}
    </div>);
};

export default MasterLocationEnter;