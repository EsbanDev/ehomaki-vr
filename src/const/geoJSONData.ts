import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson"

export const ehomakisGeoJSON: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                name: "Ehomakis Sushi Bar",
                amenity: "Sushi Bar",
                popupContent: "Ehomakis Sushi Bar",
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-77.01364085217759, -12.204640729060236],
                    [-77.01357178529682, -12.204542419501244],
                    [-77.01352149387877, -12.204575189358295],
                    [-77.01359123131178, -12.204673498905136],
                    [-77.01357111474458, -12.204645972235696],
                    [-77.01364085217759, -12.204640729060236],
                ]]
            }
        },
    ],
}

/**
 * @type {GeoJSON.GeoJsonObject}
 */