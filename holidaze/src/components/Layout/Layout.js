import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {

    return (
      <div className={styles.layoutContainer}>
        <Header />
        <Outlet />
        <Footer />
      </div>
      )
    }

  export default Layout;