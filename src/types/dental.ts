export interface DentalService {
  id: string;
  name: string;
  category: 'General' | 'Cosmetic' | 'Surgical' | 'Orthodontic' | 'Preventive';
  priceINR: number;
  durationMinutes: number;
  description: string;
  indications: string[];
  features: string[];
  highlight?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualification: string;
  specialty: string;
  experienceYears: number;
  image: string;
  bio: string;
  availableDays: string[];
  slots: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge?: number;
  serviceId: string;
  serviceName: string;
  doctorId: string;
  doctorName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid Online' | 'Pay at Clinic' | 'Pending';
  amountINR: number;
  chiefComplaint?: string;
  createdAt: string;
}

export interface ToothRecord {
  number: number; // Universal 1-32
  name: string;
  status: 'healthy' | 'restored' | 'root_canal' | 'crown' | 'cavity' | 'missing';
  notes?: string;
}

export interface TreatmentRecord {
  id: string;
  date: string;
  procedure: string;
  doctorId: string;
  doctorName: string;
  toothNumber?: number;
  clinicalFindings: string;
  treatmentPerformed: string;
  nextFollowUp?: string;
}

export interface PrescriptionItem {
  drugName: string;
  dosage: string;
  frequency: string; // e.g., '1-0-1'
  duration: string; // e.g., '5 days'
  instructions: string; // e.g., 'After meals'
}

export interface Prescription {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  items: PrescriptionItem[];
  specialAdvice: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  patientName: string;
  patientPhone: string;
  items: {
    description: string;
    qty: number;
    unitPriceINR: number;
    amountINR: number;
  }[];
  subtotalINR: number;
  discountINR: number;
  taxINR: number;
  totalINR: number;
  status: 'Paid' | 'Unpaid';
  paymentMethod?: 'UPI' | 'Card' | 'Net Banking' | 'Cash at Counter';
  transactionId?: string;
  paidAt?: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  allergies: string[];
  medicalConditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  address: string;
  teethChart: ToothRecord[];
  appointments: Appointment[];
  treatmentHistory: TreatmentRecord[];
  prescriptions: Prescription[];
  invoices: Invoice[];
}
