import styles from './preloader.module.css';

const Preloader = () => {
  return <div className={styles.loaderWrapper}>
    <div className={styles.loader}></div>
  </div>
};

export default Preloader;