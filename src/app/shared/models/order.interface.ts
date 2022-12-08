export interface Order {
    id: string;
    mobiliarios: MobiliarioOrder[];
    eventDescription: string;
    damageDescription: string;
    date: Date;
    address: Address;
    transportista: Tracker;
    administrador: Tracker;
    customer: Customer;
}

export interface MobiliarioOrder {
    id: number;
    category: string;
    name: string;
    price: number;
    quantity: number;
}

interface Date {
    startDate: string;
    endDate: string;
    status: string;
}

interface Address {
    colonia: string;
    street1: string;
    street2: string;
    noInterior: string;
    noExterior: string;
    codigoPostal: number;
    description: string;
}

interface Customer {
    id: string;
    customerName: string;
    customerLastName: string;
    customerEmail: string;
    customerPhoneNumber: string;
    customerBirthday: string;
    genre: string;
}

interface Tracker {
    id: string;
    name: string;
}