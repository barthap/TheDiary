import * as React from 'react';
import {Link} from "react-router-dom";


const Error404 = () => (
    <main className="error-template">
        <h1>Oops!</h1>
        <h2>404 Not Found</h2>
        <div className="error-details">
            Sorry, an error has occured, Requested page not found!
        </div>
        <div className="ui-alert alert alert-info">
            This resource type may have not yet been supported. Check the
            project website for details.
        </div>
        <div className="error-actions">
            <Link to="/" className="btn btn-primary btn-lg">
                <span className="glyphicon glyphicon-home"/> Take Me Home
            </Link>
            <a href="https://github.com/barthap/TheDiary" className="btn btn-default btn-lg">
                <span className="glyphicon glyphicon-envelope"/> Project website
            </a>
        </div>
    </main>
);

export default Error404;
