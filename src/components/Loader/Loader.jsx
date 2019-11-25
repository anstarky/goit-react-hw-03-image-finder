import React from 'react';
import { createPortal } from 'react-dom';

import styles from './Loader.module.css';

const LOADER_ROOT = document.querySelector('#loader-root');

const Loader = () => createPortal(
    <div className={styles.loader}>Loading...</div>, LOADER_ROOT
);

export default Loader;
