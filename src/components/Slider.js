import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import "./Slider.scss"


const Slider = ({ data, displayStatus, displayFuc }) => {
    const handleOnHide = () => {
        displayFuc(false)
    }

    const header = <h1 className='intro__header'>movie details</h1>

    const footer = <p className='intro__footer'>All movie data are from Wikipedia and IMDb</p>

    return (
        <Dialog
            header={header}
            footer={footer}
            modal
            visible={displayStatus}
            style={{ width: '30vw' }}
            onHide={handleOnHide}
            position="right">
            <article className='intro'>
                <h2 className='intro__title'>{data.title}</h2>
                <p className='intro__director'>Directed by {data.director}</p>
                <p className='intro__types'>Cast: {data.cast.map((person, index) => <span className='intro__label' key={index}>{person}</span>)}</p>
                <p className='intro__types'>Genre: {data.genre.map((genre, index) => <span className='intro__label' key={index}>{genre}</span>)}</p>
                <p className='intro__types'>Plot:</p>
                <p className='intro__details'>{data.plot}</p>
            </article >
        </Dialog >
    );
};

export default Slider;



