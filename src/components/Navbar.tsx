import React, { useState } from 'react';
import { Menu, X, Calendar, User, PhoneCall, ShieldCheck, CreditCard } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  onOpenPayments: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenPortal,
  onOpenPayments,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Bar 3-Zone Contract: Zone 1 (Wordmark) — Zone 2 (Nav Links) — Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-teal-700 transition-colors">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
              The Advance Dental Clinic
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline-block">
              Rath, Hamirpur
            </span>
          </div>
        </a>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#services" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
            Treatments & Services
          </a>
          <a href="#technology" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
            Technology
          </a>
          <a href="#doctors" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
            Specialists
          </a>
          <a href="#location" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
            Clinic & Map
          </a>
          <button
            onClick={onOpenPortal}
            className="flex items-center gap-1.5 text-slate-700 hover:text-teal-700 font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <User className="w-4 h-4 text-teal-600" />
            <span>Patient Portal</span>
          </button>
          <button
            onClick={onOpenPayments}
            className="flex items-center gap-1.5 text-slate-700 hover:text-teal-700 font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <CreditCard className="w-4 h-4 text-teal-600" />
            <span>Pay Bill</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary CTA */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${CLINIC_INFO.emergencyPhone}`}
            className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-teal-700 px-3 py-2 rounded-lg bg-slate-100 transition-colors whitespace-nowrap"
            title="24/7 Dental Emergency Hotline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
            <span>{CLINIC_INFO.emergencyPhone}</span>
          </a>
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 rounded-md"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Treatments & Services
            </a>
            <a
              href="#technology"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Technology & Sterilization
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Specialist Doctors
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Location & Timings
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100 text-slate-900 font-medium text-sm hover:bg-slate-200"
            >
              <User className="w-4 h-4 text-teal-600" />
              <span>Patient Portal (Records & Rx)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPayments();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100 text-slate-900 font-medium text-sm hover:bg-slate-200"
            >
              <CreditCard className="w-4 h-4 text-teal-600" />
              <span>Pay Invoices & Bills</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-teal-600 text-white font-medium text-sm hover:bg-teal-700"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
