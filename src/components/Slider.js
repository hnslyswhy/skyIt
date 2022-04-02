import React, { useState } from 'react';

import { Dialog } from 'primereact/dialog';


const Slider = (props) => {
    const [visible, setVisible] = useState(false)
    const handleOnHide = () => {

    }


    return (
        <Dialog
            header="MOVIE DETAILS"
            footer="All movie data are from Wikipedia and IMDb"
            modal
            visible={visible}
            style={{ width: '30vw' }}
            onHide={handleOnHide}
            position="right">
            <div>
                <p>Cast: <span></span></p>
                <p>Genre: <span></span></p>
                <div>
                    <p>Plot:</p>
                    <p>{props.plot}</p>
                </div>
            </div >
        </Dialog >
    );
};

export default Slider;