import styles from './App.module.css';
import Header from './../Header';
import Content from './../Content';

// eslint-disable-next-line no-unused-vars
export default () => (
  <section className={styles.App}>
    <Header />
    <Content />
  </section>
);
