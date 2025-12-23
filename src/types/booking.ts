export interface Service {
    id: string;
    name: string;
    schedules?: any;
    capacity: number;

}

export interface BookingData  {
    fullName: string;
    email: string;
    phone: string;
    date: Date | string;
    time: string;
    serviceId: string;
    serviceName: string;
    service?: Service;
}