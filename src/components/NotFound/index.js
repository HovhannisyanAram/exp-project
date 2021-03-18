import styles from './notFound.module.css';
import error404 from '../../assets/404.jpg';

const NotFound = () => {
  return(
    <div className={styles.notFound}>
      <img src={error404} alt="404 Error" />
    </div>
  );
};

export default NotFound;