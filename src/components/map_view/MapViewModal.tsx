import React from 'react'
import {Map, Marker, Polyline, Popup, TileLayer} from "react-leaflet"
import {StoreState} from "../../state/reducers";
import {connect} from "react-redux";
import {IMapView} from "../../interfaces/MapView";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {toggleMapViewModal} from "../../state/actions/mapView";
import useWindowDimensions from "../ui/hooks/useWindowDimensions";
import Control from '@skyeer/react-leaflet-custom-control'
import {IProductTag} from "../../interfaces/ProductTag";
import L from 'leaflet'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        closeMapButton: {
            border: '2px solid grey',
            backgroundColor: 'white',
            fontWeight: 'bold',
            marginLeft: '5%',
        }
    }),
);

interface IPolyline {
    from_lat: number,
    from_long: number,
    id: string,
    to_lat: number,
    to_long: number,
}

interface Props {
    mapView: IMapView,
    toggleMapViewModal: typeof toggleMapViewModal
}

const _MapViewModal = (props: Props) => {
    const classes = useStyles();
    const {height} = useWindowDimensions();

    const mainMarkerIcon = new L.Icon({
        iconUrl: require('../../assets/img/marker-icon.png'),
        iconRetinaUrl: require('../../assets/img/marker-icon.png'),
        iconSize: [35, 50],
        shadowUrl: require('../../assets/img/marker-shadow.png')
    });


    const {productTag, previousProductTags, isMapViewModalOpen} = props.mapView;

    const lines: IPolyline[] = [];
    const allProductTags: IProductTag[] = previousProductTags.concat([productTag]);
    allProductTags.forEach(pt1 => {
        pt1.previousProductTags.forEach(pt2 => {
            allProductTags.forEach(pt3 => {
                if (pt2.productTagAddress === pt3.productTagAddress) {
                    lines.push({
                        from_lat: pt1.geolocation.latitude,
                        from_long: pt1.geolocation.longitude,
                        id: pt2.productTagAddress.concat(pt3.productTagAddress),
                        to_lat: pt3.geolocation.latitude,
                        to_long: pt3.geolocation.longitude,
                    })
                }
            })
        })
    });


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isMapViewModalOpen}
            onClose={() => props.toggleMapViewModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isMapViewModalOpen}>
                <Map
                    style={{
                        height: height,
                        width: height,
                    }}
                    animate={true}
                    center={[productTag.geolocation.latitude, productTag.geolocation.longitude]} zoom={10}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        icon={mainMarkerIcon}
                        position={[props.mapView.productTag.geolocation.latitude, props.mapView.productTag.geolocation.longitude]}>
                        <Popup>
                            {productTag.productTagAddress}
                        </Popup>
                    </Marker>
                    {props.mapView.previousProductTags.map((productTag, index) => (
                        <Marker key={index}
                                position={[productTag.geolocation.latitude, productTag.geolocation.longitude]}>
                            <Popup>
                                {productTag.productTagAddress}
                            </Popup>
                        </Marker>
                    ))}
                    {lines.map(({id, from_lat, from_long, to_lat, to_long}) => {
                        return <Polyline key={id} positions={[
                            [from_lat, from_long], [to_lat, to_long],
                        ]} color={'red'}/>
                    })}
                    <Control position="bottomright">
                        <button
                            className={classes.closeMapButton}
                            onClick={() => props.toggleMapViewModal(false)}
                        >
                            Close Map
                        </button>
                    </Control>
                </Map>
            </Fade>
        </Modal>
    )
};

const mapStateToProps = ({mapView}: StoreState) => {
    return {mapView};
};

export const MapViewModal = connect(
    mapStateToProps,
    {
        toggleMapViewModal
    }
)(_MapViewModal);
