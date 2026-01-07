export interface Service {
    id: string;
    name: string;
    schedules?: string[];
    capacity: number;

}

export interface BookingData  {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    date: Date | string;
    time: string;
    serviceId: string;
    serviceName: string;
    service?: Service;
}