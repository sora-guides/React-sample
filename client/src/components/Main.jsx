import { Fragment } from 'react'
import SideMenu from './side-menu/SideMenu'

import './Main.scss'


export default function Main() {

    return (
        <Fragment>
            <div className="main">
                {/* <SideMenu /> */}

                <div className="main__container">
                    Main or Header
                </div>
            </div>
        </Fragment>
    )
}