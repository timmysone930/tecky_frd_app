export interface ReservationType {
    name: string,
    reservedDate: string,
    reservedTime: string,
    reservedSession: string,
    idType: string,
    idNumber: string,
    title: string
}

export interface ReservationSubmitType1 {
    message: string;
    memberCode?: undefined;
}

export interface ReservationSubmitType2 {
    message: string;
    memberCode: any;
}

// reservation additional info page
export interface AddInfoSubmitType{
    phone: string, 
    bDay: string, 
    email: string, 
    EmergencyContactName: string, 
    EmergencyContactPhone: string
}
// health Form page
export interface HealthSubmitType{
    Countries: string, 
    leaveHKRadio: string, 
    backDate: string,
}