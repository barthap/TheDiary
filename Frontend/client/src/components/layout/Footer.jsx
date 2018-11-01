import React from 'react';
import logo from '../../../res/images/logo.png';

const Footer = () => (
    <div className="footer-basic" style={{margin:6}}>
        <footer>
            <div className="social"><a href="#"><i className="icon ion-social-instagram"/></a><a href="#"><i
    className="icon ion-social-snapchat"/></a><a href="#"><i className="icon ion-social-twitter"/></a><a
                href="#"><i className="icon ion-social-facebook"/></a></div>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="#">Home</a></li>
                <li className="list-inline-item"><a href="#">Services</a></li>
                <li className="list-inline-item"><a href="#">About</a></li>
                <li className="list-inline-item"><a href="#">Terms</a></li>
                <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
            </ul>
            <p className="copyright">Created by Barthap, 2018</p>
        </footer>
    </div>
);

export default Footer;
