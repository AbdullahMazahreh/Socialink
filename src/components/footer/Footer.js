import React, { Fragment, useContext } from 'react'
import "./footer.css"
import { allData } from '../../context/Context'
import { FaRegCopyright } from "react-icons/fa"

function Footer() {
    const { darkTheme } = useContext(allData);
  return (
    <Fragment>
        <footer className={darkTheme ? "footer dark-theme" : "footer"}>
            <FaRegCopyright /> 2023 Copyright: SociaLink.com
        </footer>
    </Fragment>
  )
}

export default Footer
