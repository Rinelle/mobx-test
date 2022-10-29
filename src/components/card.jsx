import React from 'react';
import {makeAutoObservable, runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import { default as MainStorage } from './../storages/MainStorage';

class CardStorage {
    count = 0;

    constructor() {
        makeAutoObservable(this);
    }

    plus() {
        this.count++;
    }

    minus() {
        if (this.count > 0) {
            this.count--;
        }
    }

    addInCard() {
        MainStorage.addInCard(this.count);
        runInAction(() => {
            this.count = 0;
        })
    }
}

const Counter = observer(({ctrl}) => {
    return <div className={'counter'}>
        <div className={'minus'} onClick={() => ctrl.minus()}><span>-</span></div>
        <div className={'count'}><span>{ctrl.count}</span></div>
        <div className={'plus'} onClick={() => ctrl.plus()}><span>+</span></div>
    </div>
});

const Card = observer((props) => {
    const [Ctrl] = React.useState(new CardStorage());

    React.useEffect(() => {

    }, [])

    return <div className={'card'}>
        <div className={'card-image'}>
            <img src={props.image} alt=""/>
        </div>
        <div className={'info'}>
            <div className={'title'}>{props.title}</div>
            <div className={'description'}>{props.description}</div>
            <Counter ctrl={Ctrl} />
            <div>
                <button onClick={() => Ctrl.addInCard()}>Заказать</button>
            </div>
        </div>
    </div>;
});


export { Card };