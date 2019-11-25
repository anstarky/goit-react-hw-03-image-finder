import React, { Component } from 'react';
import T from 'prop-types';

import styles from './PhotoCard.module.css';

import Modal from '../Modal'

class PhotoCard extends Component {

    static propTypes = {
        image: T.shape({
            id: T.number.isRequired,
            tags: T.string.isRequired,
            likes: T.number.isRequired,
            views: T.number.isRequired,
            comments: T.number.isRequired,
            downloads: T.number.isRequired,
            webformatURL: T.string.isRequired,
            largeImageURL: T.string.isRequired,
        }).isRequired,
    }

    state = {
        isModalOpen: false,
    }

    openModal = () => this.setState({ isModalOpen: true });

    closeModal = () => this.setState({ isModalOpen: false });

    render() {
        const { isModalOpen } = this.state;

        const { id, tags, likes, views, comments, downloads, webformatURL, largeImageURL } = this.props.image;

        return (
            <div className={styles.photo__card} >
                <img src={webformatURL} alt={tags} />

                <div className={styles.stats}>
                    <p className={styles.stats__item}>
                        <i className="material-icons">thumb_up</i>
                        {likes}
                    </p>
                    <p className={styles.stats__item}>
                        <i className="material-icons">visibility</i>
                        {views}
                    </p>
                    <p className={styles.stats__item}>
                        <i className="material-icons">comment</i>
                        {comments}
                    </p>
                    <p className={styles.stats__item}>
                        <i className="material-icons">cloud_download</i>
                        {downloads}
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.fullscreen__button}
                    onClick={this.openModal}
                >
                    <i className="material-icons">zoom_out_map</i>
                </button>

                {isModalOpen && (<Modal onClose={this.closeModal} id={id} url={largeImageURL} />)}
            </div >
        )
    }
}

export default PhotoCard