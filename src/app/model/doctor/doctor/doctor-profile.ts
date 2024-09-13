export class DoctorProfile {
  doctorId: number
  doctorName: string
  email: string
  password: string
  phoneNumber: number
  specialization: string;
  role: string;

  constructor() {
      this.doctorId = 0,
      this.doctorName = ''
      this.email = ''
      this.password = ''
      this.phoneNumber = 0
      this.specialization = ''
      this.role = ''
  }
}
