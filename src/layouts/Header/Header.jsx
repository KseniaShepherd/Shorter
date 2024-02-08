import React from 'react';
import AuthButtons from "../../shared/AuthButtons";
import s from './index.module.css'

function Header(props) {
    return (
        <div className={s.header}>
            <h1>Shorter</h1>
            <AuthButtons/>
        </div>
    );
}

export default Header;