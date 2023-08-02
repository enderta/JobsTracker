import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub,} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import LogOut from './LogOut';

function SocialMediaIcon({icon}) {
    return (
        <a href="#">
            <FontAwesomeIcon icon={icon}/>
        </a>
    );
}

function Footer() {
    const socialMediaIcons = [faGithub];

    return (
        <footer className="footer">
            <div className="row footer-row">
                <div>
                    <LogOut/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;