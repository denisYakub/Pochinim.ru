import { useRef, useState } from "react";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import {motion, useAnimate} from 'framer-motion';
import buttonsAnimations from '../../../../animations/buttons-animations';

const key = "52112b4d-5217-4897-8975-50bb62c674a6";

const AddressEnter = ({address, setAddress, error, errorRed, location}) => {
    const [errorScope, animateError] = useAnimate();
    const [zoom, setZoom] = useState(9);
    const [center, setCenter] = useState(location);

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
        <input className="text-input-field" placeholder={"Город, улица, дом"} ref={errorRed} onChange={e => setLocation(e.target.value)}></input>
        <div className="createTopic-address-map">
            <p className="createTopic-address" ref={errorRed}>{address}</p>
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