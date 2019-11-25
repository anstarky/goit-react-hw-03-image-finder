import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import T from 'prop-types';

import styles from './Modal.module.css';

const MODAL_ROOT = document.querySelector('#modal-root');

class Modal extends Component {
    static propTypes = {
        id: T.number.isRequired,
        url: T.string.isRequired,
        onClose: T.func.isRequired,
    };

    backdropRef = createRef();

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = e => {

        if (e.code !== 'Escape') {
            return;
        }

        this.props.onClose();
    };

    handleBackdropClick = e => {

        if (this.backdropRef.current && e.target !== this.backdropRef.current) {
            return;
        }

        this.props.onClose();
    };

    render() {
        const { id, url } = this.props;
        return createPortal(
            <div
                className={styles.backdrop}
                ref={this.backdropRef}
                onClick={this.handleBackdropClick}
                role="presentation"
            >
                <div className={styles.modal}>
                    <img src={url} alt="" id={id} />
                </div>
            </div>
            ,
            MODAL_ROOT,
        );
    }
}

export default Modal