import React from 'react';
import {Header} from './components/header';
import { Card } from './components/card';
import { default as Storage } from './storages/MainStorage';
import { observer } from 'mobx-react-lite';


const App = observer(() => {
    React.useEffect(() => {
        Storage.getProducts();

        return (() => {
            Storage.dispose();
        });
    }, []);

    return <div className={'wrapper'}>
        <Header/>
        <div className={'main'}>
            <div className={'card-wrapper'}>
                {Storage.products.map(item => <Card key={item.id} {...item} />)}
            </div>
        </div>
    </div>
});

export default App;