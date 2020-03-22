import React from 'react'
import {Map, Marker, Popup, TileLayer} from "react-leaflet"
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

interface Props {
    mapView: IMapView,
    toggleMapViewModal: typeof toggleMapViewModal
}

const _MapViewModal = (props: Props) => {
    const classes = useStyles();
    const {height, width} = useWindowDimensions();
    console.log("h: ", height, "\nw: ", width);

    const {isMapViewModalOpen} = props.mapView;
    const {productTag} = props.mapView;

    const longitude = productTag.geolocation.longitude;
    const latitude = productTag.geolocation.latitude;

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
                    center={[latitude, longitude]} zoom={13}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude, longitude]}>
                        <Popup>
                            Product Tag Data
                        </Popup>
                    </Marker>
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
