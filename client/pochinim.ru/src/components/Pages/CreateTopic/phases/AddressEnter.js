import { useRef, useState, useEffect, useContext } from "react";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import { contextWebsite } from "../../../../contexts/contextWebsite";
import InputWithError from '../../../../animations/input-error-field';

const key = "52112b4d-5217-4897-8975-50bb62c674a6";

const AddressEnter = ({TOPIC}) => {
    const WEBSITE = useContext(contextWebsite)

    const [zoom, setZoom] = useState(9);
    const [center, setCenter] = useState(WEBSITE.currentCoordinates);
    const [address, setAddress] = useState(TOPIC.address);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        try {
            TOPIC.address = address;
            
            setCenter(WEBSITE.currentCoordinates);
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
    },[address, center])

    const [placemarkCoords, setPlacemarkCoords] = useState(null);

    const ymaps = useRef(null);
    const mapRef = useRef(null);

    function setLocation(loc){
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
        });
    };

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>6/9</p>
            <h1>По какому адресу?</h1>
        </div> 
        {/*<input className="text-input-field" placeholder={"Город, улица, дом"} onChange={e => setLocation(e.target.value)}></input>*/}
        <InputWithError placeholder={"Город, улица, дом"} value={''} setValue={setLocation} 
                    error={error} setError={setError} errorText={'Не верное значение'}
                    warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
        <div className="createTopic-address-map">
            <p className="createTopic-address">{address}</p>
            <YMaps query={{apikey: key}}>
                <Map onClick={handleMapClick} 
                    onLoad={(e) => { ymaps.current = e }}
                    modules={["Placemark", "geocode", "geoObject.addon.balloon"]}
                    instanceRef={mapRef}
                    state={{center: center, zoom: zoom}} 
                    width={"100%"} height={"267px"}>
                        {placemarkCoords && (<Placemark geometry = 
                        {placemarkCoords}></Placemark>)}
                </Map>
            </YMaps>
        </div>
    </div>)
}

export default AddressEnter;