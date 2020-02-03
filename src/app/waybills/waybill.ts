export class Waybill {
    _id: string = "-1";
    customer: string = "";     // Заказчик
    date: string = "";             // Дата
    shift: string = "";          // Смена
    dump: string = "";           // Самосвал. Гос номер
    driver: string = "";         // Водитель
    loading: string = "";        // Загрузка
    unloading: string = "";      // Выгрузка
    distance: string = "";       // Плечо
    //rideValue: string;      // Величина сделанная зарейс. 25т или 19м3 или 10часов.
    ton: string = "";            // Тонн
    cube: string = "";           // Кубов
    hour: string = "";           // Часов
    //rideUnit: string;     // Единицы измерения рейса. Тонны, кубы, часов.
    rides: string = "";          // Рейсов
    price: string = "";          // Расценка
    revenue: string = "";        // Выручка
    notFuel: boolean = false;    // Не заправлялись. Отдельной галочкой
    fuel: Fuel[] = [];           // Заправки топливом
    fuelLitres: string = "";     // Топливо литров
    fuelCost: string = "";       // Топливо в рублях
    fuelStation: string = "";    // Где заправлялись
    rateDriver: string = "";     // Ставка водителя
    wageDriver: string = "";     // Заработал водитель

    constructor() { }
}

export interface Fuel {
    liters: number,
    payment: number,
    station: string,
    date: string,
    comment: string,
    fromCustomer: boolean
}

export const nullFuel: Fuel = {
    liters: 0,
    payment: 0,
    station: "",
    date: "",
    comment: "",
    fromCustomer: false
}

export const nullWB: Waybill = {
    "_id": "1",
    "customer": "Фиктивный",
    "date": "01.01.2019",
    "shift": "Фиктивный",
    "dump": "Фиктивный",
    "driver": "Фиктивный",
    "loading": "Фиктивный",
    "unloading": "Фиктивный",
    "distance": "0",
    "ton": "0",
    "cube": "0",
    "hour": "0",
    "rides": "0",
    "price": "0",
    "revenue": "0",
    "notFuel": false,
    "fuel": [],
    "fuelLitres": "-",
    "fuelCost": "0",
    "fuelStation": "",
    "rateDriver": "",
    "wageDriver": ""
};
export const nullWBList: Waybill[] = [
    nullWB
];

export class RideUnit {
    id: number;
    name: string; 
}

export const RideUnits: RideUnit[] = [
    { id: 1, name: 'тонн' },    //ton        
    { id: 2, name: 'кубов' },   //cube
    { id: 3, name: 'часов' }    //hour
]
