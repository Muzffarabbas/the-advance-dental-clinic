import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenPortal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base">
                AD
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {CLINIC_INFO.name}
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Rath’s advanced dental medical facility specializing in microscopic rotary root canal therapy, titanium implants, digital RVG radiography, and cosmetic dental rehabilitation.
            </p>

            <div className="text-[11px] text-slate-500 space-y-1">
              <div>Registration No: {CLINIC_INFO.registrationNo}</div>
              <div>GSTIN: {CLINIC_INFO.gstin}</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-sm font-semibold text-white block uppercase tracking-wider">
              Clinical Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Treatments & Fees
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition-colors">
                  Class-B Sterilization
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white transition-colors">
                  Specialist Dental Surgeons
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Clinic Location & Map
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-teal-400 text-left transition-colors font-medium text-teal-300"
                >
                  Digital Patient Portal (Records & Rx)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-teal-400 text-left transition-colors font-medium text-teal-300"
                >
                  Book Appointment Online
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-sm font-semibold text-white block uppercase tracking-wider">
              Rath Clinic & Contact
            </span>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white">
                  {CLINIC_INFO.phone} / {CLINIC_INFO.secondaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300">Mon – Sat: 9:00 AM – 1:30 PM & 4:30 PM – 8:30 PM</span>
                  <span className="block text-slate-400">Sun: 10:00 AM – 2:00 PM (Emergency)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} The Advance Dental Clinic. All clinical rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy & Patient Confidentiality</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Infection Control Standards</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">NABH Dental Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
