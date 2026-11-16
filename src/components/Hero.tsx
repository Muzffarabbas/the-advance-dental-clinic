import React from 'react';
import { Calendar, User, ShieldCheck, MapPin, Clock, Award, Star, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenPortal }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* 2-Column Split: Headline & Value Proposition | Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet Location & Certification kicker without pills */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase mb-4">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>Rath, Hamirpur (U.P.)</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Certified Multi-Specialty Dental Center</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
              Advanced, painless dental care crafted for your healthiest smile.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              From microscopic rotary root canals and permanent titanium implants to smile makeovers and gentle pediatric care. Experience hospital-grade sterilization and modern digital precision at Rath’s premier dental clinic.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-all whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenPortal}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              >
                <User className="w-4 h-4 text-teal-600" />
                <span>Patient Portal Login</span>
              </button>
            </div>

            {/* Fast Clinic Availability Info */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Consultation Hours</span>
                  <span>Mon – Sat: 9:00 AM – 1:30 PM & 4:30 PM – 8:30 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Clinic Location</span>
                  <span>Near Hamirpur-Orai Road Bypass, Rath</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[360px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group bg-slate-100">
              <img
                src="/src/assets/images/hero_dental_clinic_1794145361974.jpg"
                alt="The Advance Dental Clinic Operatory Suite"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Bottom Scrim Content with Google Maps Rating Adjacency */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-900">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>4.9 / 5.0</span>
                    <span className="text-slate-500 font-normal text-xs ml-1">(Google Maps Verified)</span>
                  </div>
                  <span className="text-xs font-semibold text-teal-700">Rath, U.P.</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                  "Most clean, high-tech, and reassuring dental experience in Hamirpur district."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI / Trust Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <span className="block text-2xl lg:text-3xl font-extrabold text-slate-900 tabular-nums">
              15,000+
            </span>
            <span className="text-xs font-medium text-slate-500 mt-1 block">
              Successful Clinical Treatments
            </span>
          </div>

          <div>
            <span className="block text-2xl lg:text-3xl font-extrabold text-slate-900 tabular-nums">
              14+ Years
            </span>
            <span className="text-xs font-medium text-slate-500 mt-1 block">
              Maxillofacial & Dental Surgery
            </span>
          </div>

          <div>
            <span className="block text-2xl lg:text-3xl font-extrabold text-slate-900 tabular-nums">
              Class-B
            </span>
            <span className="text-xs font-medium text-slate-500 mt-1 block">
              Medical Autoclave Sterilization
            </span>
          </div>

          <div>
            <span className="block text-2xl lg:text-3xl font-extrabold text-slate-900 tabular-nums">
              100% Painless
            </span>
            <span className="text-xs font-medium text-slate-500 mt-1 block">
              Rotary Endodontics & Laser Care
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
