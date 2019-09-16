import React, { Fragment } from 'react';
// import NavBar from '../Navigation/NavBar/NavBar';
import Footer from '../Navigation/Footer/Footer';

const Layout = (props) => {
  return (
    <Fragment>
      {/* <NavBar/> */}
      <main>
        {props.children}
      </main>
      <Footer/>
    </Fragment>
  )
}

export default Layout;