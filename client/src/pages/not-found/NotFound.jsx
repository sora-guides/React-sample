import { Link } from 'react-router-dom'
import Button from '../../components/button/Button'

import './NotFound.scss'


export default function NotFound() {

    return (
        <div className="not-found">
            <div className="container">
                <div className="not-found-row">
                    <h2 className="not-found__title"><strong>404</strong></h2>
                    <h3 className="not-found__text"><strong>Page Not Found</strong></h3>
                    <p className="not-found__additional-text">
                        We're sorry, the page you requested could not be found. <br />
                        Please go back to the home page.
                    </p>
                    <Link to="/">
                        <Button className="btn">GO HOME</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}