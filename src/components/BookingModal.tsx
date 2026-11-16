import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Printer, AlertCircle } from 'lucide-react';
import { CLINIC_SERVICES, CLINIC_DOCTORS, CLINIC_INFO } from '../data/clinicData';
import { Appointment } from '../types/dental';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedDoctorId?: string;
  onAppointmentBooked: (appointment: Appointment, triggerOnlinePayment: boolean) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedDoctorId,
  onAppointmentBooked,
}) => {
  const [step, setStep] = useState<number>(1);
  const [serviceId, setServiceId] = useState<string>(preselectedServiceId || 'rct');
  const [doctorId, setDoctorId] = useState<string>(preselectedDoctorId || 'dr-anurag-verma');
  const [date, setDate] = useState<string>('');
  const [slot, setSlot] = useState<string>('10:30 AM');
  
  // Patient Details
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('30');
  const [complaint, setComplaint] = useState<string>('');
  const [paymentChoice, setPaymentChoice] = useState<'online' | 'clinic'>('clinic');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync preselected
  useEffect(() => {
    if (preselectedServiceId) setServiceId(preselectedServiceId);
    if (preselectedDoctorId) setDoctorId(preselectedDoctorId);
  }, [preselectedServiceId, preselectedDoctorId]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  if (!isOpen) return null;

  const selectedService = CLINIC_SERVICES.find(s => s.id === serviceId) || CLINIC_SERVICES[0];
  const selectedDoctor = CLINIC_DOCTORS.find(d => d.id === doctorId) || CLINIC_DOCTORS[0];

  const validatePatientInfo = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) errs.patientName = 'Please enter your full name';
    if (!patientPhone.trim() || !/^\+?[0-9\s-]{10,14}$/.test(patientPhone.trim())) {
      errs.patientPhone = 'Please enter a valid 10-digit mobile number';
    }
    if (patientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail.trim())) {
      errs.patientEmail = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 3) {
      if (!validatePatientInfo()) return;
    }
    setStep(prev => prev + 1);
  };

  const handleConfirmBooking = () => {
    const newAppointment: Appointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim() || 'patient@advanceclinic.com',
      patientAge: Number(patientAge) || 30,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date,
      timeSlot: slot,
      status: 'Confirmed',
      paymentStatus: paymentChoice === 'online' ? 'Paid Online' : 'Pay at Clinic',
      amountINR: selectedService.priceINR,
      chiefComplaint: complaint.trim() || 'General consultation & evaluation',
      createdAt: new Date().toISOString(),
    };

    setConfirmedAppointment(newAppointment);
    onAppointmentBooked(newAppointment, paymentChoice === 'online');
    setStep(5); // Show confirmation pass
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Book Clinical Appointment
              </h3>
              <span className="text-xs text-slate-500">The Advance Dental Clinic · Rath</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps indicator */}
        {step < 5 && (
          <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between text-xs">
            <span className={`font-semibold ${step === 1 ? 'text-teal-700' : 'text-slate-400'}`}>
              1. Treatment
            </span>
            <span className="text-slate-300">→</span>
            <span className={`font-semibold ${step === 2 ? 'text-teal-700' : 'text-slate-400'}`}>
              2. Specialist & Date
            </span>
            <span className="text-slate-300">→</span>
            <span className={`font-semibold ${step === 3 ? 'text-teal-700' : 'text-slate-400'}`}>
              3. Patient Details
            </span>
            <span className="text-slate-300">→</span>
            <span className={`font-semibold ${step === 4 ? 'text-teal-700' : 'text-slate-400'}`}>
              4. Payment Choice
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6">
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Select Procedure or Consultation
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose the dental care service required. You can discuss details during the clinical check.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {CLINIC_SERVICES.map(srv => (
                  <button
                    key={srv.id}
                    onClick={() => setServiceId(srv.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      serviceId === srv.id
                        ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                        <span className="truncate pr-2">{srv.name}</span>
                        <span className="text-teal-700 tabular-nums shrink-0">₹{srv.priceINR}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {srv.description}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{srv.category}</span>
                      <span>{srv.durationMinutes} mins</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
                >
                  <span>Select Doctor & Date</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT SPECIALIST, DATE & SLOT */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Choose Specialist & Preferred Slot
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Selected Service: <strong className="text-slate-800">{selectedService.name}</strong> (₹{selectedService.priceINR})
                </p>
              </div>

              {/* Doctors selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  Consulting Surgeon
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CLINIC_DOCTORS.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => setDoctorId(doc.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        doctorId === doc.id
                          ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block truncate">
                        {doc.name}
                      </span>
                      <span className="text-[11px] text-teal-700 block truncate">
                        {doc.title.split('&')[0]}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        {doc.experienceYears}+ yrs exp
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-teal-600 bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Available Time Slot
                  </label>
                  <select
                    value={slot}
                    onChange={e => setSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-teal-600 bg-white text-slate-900"
                  >
                    {selectedDoctor.slots.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
                >
                  <span>Patient Information</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PATIENT INFORMATION */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Patient Information
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  We use this for clinical records and SMS appointment reminders.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Rajput"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white ${
                      errors.patientName ? 'border-red-500' : 'border-slate-300 focus:outline-teal-600'
                    }`}
                  />
                  {errors.patientName && (
                    <span className="text-[11px] text-red-600 mt-0.5 block">{errors.patientName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Mobile Number (WhatsApp/SMS) *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9839144520"
                      value={patientPhone}
                      onChange={e => setPatientPhone(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-lg border bg-white ${
                        errors.patientPhone ? 'border-red-500' : 'border-slate-300 focus:outline-teal-600'
                      }`}
                    />
                    {errors.patientPhone && (
                      <span className="text-[11px] text-red-600 mt-0.5 block">{errors.patientPhone}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 34"
                      value={patientAge}
                      onChange={e => setPatientAge(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-teal-600 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="rajesh@example.com"
                    value={patientEmail}
                    onChange={e => setPatientEmail(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white ${
                      errors.patientEmail ? 'border-red-500' : 'border-slate-300 focus:outline-teal-600'
                    }`}
                  />
                  {errors.patientEmail && (
                    <span className="text-[11px] text-red-600 mt-0.5 block">{errors.patientEmail}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Chief Complaint / Symptoms (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe any pain, sensitivity, broken tooth, or cleaning required..."
                    value={complaint}
                    onChange={e => setComplaint(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-teal-600 bg-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
                >
                  <span>Payment Preference</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT CHOICE */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Select Payment Preference
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm how you prefer to settle your clinical fees.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Procedure / Service:</span>
                  <strong className="text-slate-900">{selectedService.name}</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Treating Doctor:</span>
                  <strong className="text-slate-900">{selectedDoctor.name}</strong>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Date & Slot:</span>
                  <strong className="text-slate-900">{date} at {slot}</strong>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                  <span>Estimated Total:</span>
                  <span className="text-teal-700 tabular-nums">₹{selectedService.priceINR}</span>
                </div>
              </div>

              {/* Payment Choices */}
              <div className="space-y-3">
                <label
                  onClick={() => setPaymentChoice('clinic')}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentChoice === 'clinic'
                      ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payChoice"
                    checked={paymentChoice === 'clinic'}
                    onChange={() => setPaymentChoice('clinic')}
                    className="mt-1 text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Pay at Clinic (Cash, UPI or Card at Counter)
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      No upfront advance needed. Settle directly with reception upon check-in at Rath clinic.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentChoice('online')}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentChoice === 'online'
                      ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payChoice"
                    checked={paymentChoice === 'online'}
                    onChange={() => setPaymentChoice('online')}
                    className="mt-1 text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Pay Online Now via Secure Gateway (UPI / Card / Net Banking)
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Instant computerized receipt and priority zero-wait slot confirmation.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: BOOKING CONFIRMED PASS */}
          {step === 5 && confirmedAppointment && (
            <div className="text-center py-4 space-y-6">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Appointment Confirmed!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Booking Reference: <strong className="text-slate-800">{confirmedAppointment.id}</strong>
                </p>
              </div>

              {/* Printable Appointment Pass */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 text-left space-y-3 text-xs max-w-md mx-auto">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="font-bold text-slate-900 block">{CLINIC_INFO.name}</span>
                    <span className="text-[11px] text-slate-500">{CLINIC_INFO.address}</span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-teal-100 text-teal-800">
                    {confirmedAppointment.paymentStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block">Patient Name:</span>
                    <strong className="text-slate-900">{confirmedAppointment.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone:</span>
                    <strong className="text-slate-900">{confirmedAppointment.patientPhone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date & Time:</span>
                    <strong className="text-slate-900">{confirmedAppointment.date} at {confirmedAppointment.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Doctor:</span>
                    <strong className="text-slate-900">{confirmedAppointment.doctorName}</strong>
                  </div>
                  <div className="col-span-2 pt-1">
                    <span className="text-slate-500 block">Service:</span>
                    <strong className="text-slate-900">{confirmedAppointment.serviceName} (₹{confirmedAppointment.amountINR})</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Helpline: {CLINIC_INFO.phone}</span>
                  <span>Please arrive 10 mins early</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
