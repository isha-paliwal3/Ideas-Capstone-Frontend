import { DoctorProfile } from "./doctor-profile";

export class DoctorResponse {
    doctor: DoctorProfile
    jwt: string;
    constructor() {
        this.doctor = new DoctorProfile()
        this.jwt = ''
    }
}
