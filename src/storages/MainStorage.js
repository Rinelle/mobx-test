import {action, autorun, makeAutoObservable, reaction, runInAction, when} from "mobx";
import { query } from "../ApiService";

const products = [
    {
        id: 1,
        title: 'Ducimus qui',
        description: 'Et harum quidem rerum facilis est et expedita distinctio.',
        image: './images/1.jpg'
    },
    {
        id: 2,
        title: 'Itaque earum',
        description: 'Sed ut perspiciatis unde omnis iste natus error.',
        image: './images/2.jpg'
    },
    {
        id: 3,
        title: 'Sunt in culpa',
        description: 'Itaque earum rerum hic tenetur a sapiente delectus.',
        image: './images/3.jpg'
    }
];

class MainStorage {
    products = [];
    count = 0;

    constructor() {
        makeAutoObservable(this);
        this.disposer = autorun(() => {
            console.log(`Значение в корзине изменилось на: ${this.count}`);
        });
        this.disposer1 = reaction(
            () => this.count,
            (current, prev) => {
                console.log(`В корзину было добавлено: ${current - prev} шт.`);
            }
        );
    }

    get price() {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        }).format(this.count * 200);
    }

    async getProducts() {
        const result = await query(products);

        runInAction(() => {
            this.products = result;
        });
    }

    addInCard(value) {
        runInAction(() => {
            this.count = this.count + value;
        });
    }

    dispose() {
        this.disposer();
        this.disposer1();
    }
}

export default new MainStorage();