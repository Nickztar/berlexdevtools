import Map, { Marker, MarkerDragEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useState } from "react";
import { R6 } from "../R6";
import { useColorModeValue } from "@chakra-ui/react";

const esLng = 12.859022122454007;
const esLat = 56.67576981218485;

export function Position() {
    const [marker, setMarker] = useState({
        longitude: esLng,
        latitude: esLat,
    });
    const mapStyle = useColorModeValue(
        "mapbox://styles/mapbox/streets-v9",
        "mapbox://styles/mapbox/dark-v9"
    );

    const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
        setMarker({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        });
    }, []);

    return (
        <Map
            initialViewState={{
                longitude: esLng,
                latitude: esLat,
                zoom: 14,
            }}
            mapboxAccessToken="pk.eyJ1Ijoibmlja3p0YXIiLCJhIjoiY2wzNmd0dmE5MDZxZjNrbzBiazJjZWlrYyJ9.wnqEfBb_Q9moM7vwlIt9rg"
            style={{
                width: 400,
                height: 200,
                borderRadius: "var(--chakra-radii-md)",
            }}
            mapStyle={mapStyle}
        >
            <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                anchor="bottom"
                draggable
                onDrag={onMarkerDrag}
            >
                <R6 style={{ transform: "scale(.5)" }} />
            </Marker>
        </Map>
    );
}
