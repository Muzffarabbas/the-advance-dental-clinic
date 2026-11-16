/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TechnologySection } from './components/TechnologySection';
import { DoctorsSection } from './components/DoctorsSection';
import { SmileGallerySection } from './components/SmileGallerySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { PaymentModal } from './components/PaymentModal';
import { InvoiceReceiptModal } from './components/InvoiceReceiptModal';
import { DEMO_PATIENT, CLINIC_INFO } from './data/clinicData';
import { Appointment, Invoice, PatientProfile } from './types/dental';
import { Calendar, PhoneCall, User, CreditCard } from 'lucide-react';

const STORAGE_KEY = 'adc_patient_profile_v1';

export default function App() {
  // Hydrate patient profile from localStorage or fallback to comprehensive demo patient
  const [patient, setPatient] = useState<PatientProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved patient profile', e);
    }
    return DEMO_PATIENT;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patient));
    } catch (e) {
      console.error('Failed to persist patient profile', e);
    }
  }, [patient]);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();
  const [bookingDoctorId, setBookingDoctorId] = useState<string | undefined>();

  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activePaymentInvoice, setActivePaymentInvoice] = useState<Invoice | null>(null);

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceiptInvoice, setActiveReceiptInvoice] = useState<Invoice | null>(null);

  // Handlers
  const handleOpenBooking = (serviceId?: string, doctorId?: string) => {
    setBookingServiceId(serviceId);
    setBookingDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  const handleOpenPortal = () => {
    setIsPortalOpen(true);
  };

  const handleOpenBillingDirectly = () => {
    // If there is an unpaid bill, offer to pay it, or open portal billing
    const unpaid = patient.invoices.find(i => i.status === 'Unpaid');
    if (unpaid) {
      setActivePaymentInvoice(unpaid);
      setIsPaymentOpen(true);
    } else {
      setIsPortalOpen(true);
    }
  };

  const handleAppointmentBooked = (appointment: Appointment, triggerOnlinePayment: boolean) => {
    const updatedAppointments = [appointment, ...patient.appointments];
    let updatedInvoices = [...patient.invoices];

    if (triggerOnlinePayment) {
      // Create new invoice for online payment
      const newInvoice: Invoice = {
        id: `INV-${Date.now().toString().slice(-6)}`,
        invoiceNumber: `ADC/26/${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().split('T')[0],
        patientName: appointment.patientName,
        patientPhone: appointment.patientPhone,
        items: [
          {
            description: `${appointment.serviceName} (${appointment.id})`,
            qty: 1,
            unitPriceINR: appointment.amountINR,
            amountINR: appointment.amountINR,
          },
        ],
        subtotalINR: appointment.amountINR,
        discountINR: 0,
        taxINR: 0,
        totalINR: appointment.amountINR,
        status: 'Unpaid',
      };

      updatedInvoices = [newInvoice, ...updatedInvoices];
      setPatient(prev => ({
        ...prev,
        appointments: updatedAppointments,
        invoices: updatedInvoices,
      }));

      // Trigger online payment gateway modal
      setActivePaymentInvoice(newInvoice);
      setIsPaymentOpen(true);
    } else {
      // Just save appointment
      setPatient(prev => ({
        ...prev,
        appointments: updatedAppointments,
      }));
    }
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setPatient(prev => ({
      ...prev,
      appointments: prev.appointments.map(a =>
        a.id === appointmentId ? { ...a, status: 'Cancelled' as const } : a
      ),
    }));
  };

  const handlePaymentSuccess = (
    invoiceId: string,
    paymentMethod: 'UPI' | 'Card' | 'Net Banking',
    transactionId: string
  ) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setPatient(prev => ({
      ...prev,
      invoices: prev.invoices.map(inv =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'Paid' as const,
              paymentMethod,
              transactionId,
              paidAt: formattedDate,
            }
          : inv
      ),
    }));
  };

  const handleViewReceipt = (invoice: Invoice) => {
    setActiveReceiptInvoice(invoice);
    setIsReceiptOpen(true);
  };

  const handlePayInvoice = (invoice: Invoice) => {
    setActivePaymentInvoice(invoice);
    setIsPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Banner for Patient Quick Notification */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-teal-400 font-semibold">The Advance Dental Clinic</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Rath, District Hamirpur (U.P.)</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Class-B Autoclave Sterilized</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={handleOpenPortal}
              className="text-teal-300 hover:text-teal-200 underline flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Signed in: {patient.name}</span>
            </button>
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="hover:text-white font-mono"
            >
              📞 {CLINIC_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenPortal={handleOpenPortal}
        onOpenPayments={handleOpenBillingDirectly}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenPortal={handleOpenPortal}
        />

        {/* Services & Treatment Catalog */}
        <ServicesSection
          onSelectServiceToBook={serviceId => handleOpenBooking(serviceId)}
        />

        {/* Clinical Technology & Sterilization Standards */}
        <TechnologySection />

        {/* Specialist Dental Surgeons */}
        <DoctorsSection
          onSelectDoctorToBook={doctorId => handleOpenBooking(undefined, doctorId)}
        />

        {/* Smile Transformations & Verified Testimonials */}
        <SmileGallerySection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Location & Interactive Google Map */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenPortal={handleOpenPortal}
      />

      {/* Floating Action Button for Mobile Users */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 lg:hidden no-print">
        <button
          onClick={handleOpenPortal}
          className="p-3 bg-white text-slate-800 rounded-full shadow-lg border border-slate-200"
          title="Patient Portal"
        >
          <User className="w-5 h-5 text-teal-600" />
        </button>
        <button
          onClick={() => handleOpenBooking()}
          className="flex items-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-full shadow-lg font-bold text-xs"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Visit</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={bookingServiceId}
        preselectedDoctorId={bookingDoctorId}
        onAppointmentBooked={handleAppointmentBooked}
      />

      <PatientPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        patient={patient}
        onPayInvoice={handlePayInvoice}
        onViewReceipt={handleViewReceipt}
        onCancelAppointment={handleCancelAppointment}
        onNewBookingClick={() => {
          setIsPortalOpen(false);
          handleOpenBooking();
        }}
      />

      {activePaymentInvoice && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => {
            setIsPaymentOpen(false);
            setActivePaymentInvoice(null);
          }}
          invoice={activePaymentInvoice}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {activeReceiptInvoice && (
        <InvoiceReceiptModal
          isOpen={isReceiptOpen}
          onClose={() => {
            setIsReceiptOpen(false);
            setActiveReceiptInvoice(null);
          }}
          invoice={activeReceiptInvoice}
        />
      )}
    </div>
  );
}
