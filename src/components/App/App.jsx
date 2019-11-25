import React, { Component } from 'react';
import styles from './App.module.css';

import * as imageAPI from '../../services/image-api.jsx';

import SearchForm from '../SearchForm';
import Gallery from '../Gallery';
import ErrorNotification from '../ErrorNotification';
import Loader from '../Loader';

const mapper = images => {
    return images.map(({ objectID: id, url: pageURL, ...props }) => ({
        id,
        pageURL,
        ...props,
    }));
};

class App extends Component {
    state = {
        images: [],
        isLoading: false,
        error: null,
        pageNumber: 1,
        query: '',
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query) {
            this.fetchImages();
        }
    }

    onSearch = query => {
        this.setState({ query, images: [], pageNumber: 1 });
    };

    fetchImages = () => {
        const { query, pageNumber } = this.state;

        this.setState({ isLoading: true });

        imageAPI
            .fetchImages(query, pageNumber)
            .then(images => {
                this.setState(state => ({
                    images: [...state.images, ...mapper(images)],
                    pageNumber: state.pageNumber + 1,
                }));
            })
            .catch(error => {
                this.setState({ error });
            })
            .finally(() => {
                this.setState({ isLoading: false });
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
    };

    render() {
        const { images, isLoading, error } = this.state;

        return (
            <div className={styles.app}>
                <SearchForm onSubmit={this.onSearch} />

                {error && <ErrorNotification message={error.message} />}

                {isLoading && <Loader />}

                {images.length > 0 && <Gallery images={images} />}

                {images.length > 0 && (
                    <button
                        type="button"
                        onClick={this.fetchImages}
                        className={styles.button}>
                        Load more articles
                    </button>
                )}
            </div>
        );
    }
}

export default App;