import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import { useState, useRef, useContext } from "react";
import { contextLocation } from '../../../../contexts/contextLocation';
import Select from 'react-select';

const key = "52112b4d-5217-4897-8975-50bb62c674a6";

const MasterLocationEnter = ({workingFrom, setWorkingFrom, address, setAddress, selectedOptionsLocation, setSelectedOptionsLocation, step, setStep}) => {

    const { location, cities, setCity } = useContext(contextLocation);

    const [zoom, setZoom] = useState(9);
    const [center, setCenter] = useState(location);

    const [placemarkCoords, setPlacemarkCoords] = useState(null);

    const ymaps = useRef(null);
    const mapRef = useRef(null);

    const hints = ["Выезжаю к клиентам", "Принимаю клиентов у себя"];
    const optionList = [
        { value: "b-1", label: "Садовая" },
        { value: "b-2", label: "Сенная площадь" },
        { value: "b-3", label: "Спортивная" },
        { value: "0-1", label: "Спасская" },
      ];

    const handleWorkingFrom = (value) => {
        setWorkingFrom(value)
    }

    function setNewAddress(loc){
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
            setAddress(newAddress);

            const newCity = firstGeoObject.getLocalities()[0]
            
            if(cities.includes(newCity)){
                setCity(newCity);
            }
        });
    };

    function handleSelect(data) {
        setSelectedOptionsLocation(data);
    }

    const click = async () =>{
        if(workingFrom != 0 && (address != ""|| selectedOptionsLocation != null)){
            setStep(step + 1);
        }
    }

    return(<div className="phases-wrapper">
        {workingFrom==0?
        <div>
            <div className="signUpMaster-annotation">
                <h1>Где работаете?</h1>
                <a>Будем предлагать заказы поблизости.</a>
            </div>
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
        <div className="location-choose-wrapper">
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
                <input placeholder={"Город, улица, дом"} value={address} onChange={e => setNewAddress(e.target.value)}></input>
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
            <div className="Select-m">
                <Select
                    options={optionList}
                    placeholder="Выберите метро"
                    value={selectedOptionsLocation}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                />
            </div>}
        </div>}
        <button onClick={click} className='continue-button'>Продолжить</button>
    </div>);
};

export default MasterLocationEnter;