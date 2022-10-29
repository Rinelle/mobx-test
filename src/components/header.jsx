import React from 'react';
import {observer} from "mobx-react-lite";
import { default as MainStorage } from './../storages/MainStorage';

const Logo = (props) => {
    return <div className='logo'>{props.text.toUpperCase()}</div>;
}

const Header = observer(() => {
    return <div className='header'>
        <Logo text='My Logo'/>
        <div className={'cart'}>
            <div>Всего: {MainStorage.count}</div>
            <div>Цена: {MainStorage.price}</div>
        </div>
    </div>;
});

export { Header }