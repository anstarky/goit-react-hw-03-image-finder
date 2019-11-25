import React from 'react';
import T from 'prop-types';

import styles from './Gallery.module.css';

import PhotoCard from '../PhotoCard'

const Gallery = ({ images }) => (
    <ul className={styles.gallery}>
        {images.map((image) => (
            <li key={image.id} className={styles.gallery__item}>
                <PhotoCard image={image} />
            </li>
        ))}
    </ul >
);

Gallery.propTypes = {
    images: T.arrayOf(T.shape).isRequired,
};

export default Gallery;