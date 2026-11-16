import React, { useState } from 'react';
import { CLINIC_SERVICES } from '../data/clinicData';
import { DentalService } from '../types/dental';
import { Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { label: 'All Treatments', value: 'All' },
    { label: 'General & RCT', value: 'General' },
    { label: 'Implants & Surgery', value: 'Surgical' },
    { label: 'Cosmetic & Makeovers', value: 'Cosmetic' },
    { label: 'Orthodontics & Aligners', value: 'Orthodontic' },
    { label: 'Preventive Care', value: 'Preventive' },
  ];

  const filteredServices = activeCategory === 'All'
    ? CLINIC_SERVICES
    : CLINIC_SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide">
            <span>Specialized Clinical Procedures</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Transparent Hospital Pricing</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Evidence-based dentistry, from routine preservation to complex rehabilitation.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Every procedure at The Advance Dental Clinic is performed under strict magnification, computerized apex measurement, and hospital-grade sterilization protocols.
          </p>
        </div>

        {/* Category Filter Tabs - clean segmented button styling */}
        <div className="mt-8 flex flex-wrap gap-2 p-1.5 bg-slate-200/80 rounded-xl w-fit">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeCategory === cat.value
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Procedure Bento Showcase if 'All' is selected */}
        {activeCategory === 'All' && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bento Card 1: Rotary RCT Spotlight */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-medium">
                    <span>Endodontic Specialty</span>
                    <span aria-hidden="true" className="mx-2">·</span>
                    <span>Single or Dual Sitting</span>
                  </div>
                  <span className="text-lg font-bold text-teal-700 tabular-nums">
                    ₹2,500
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  Rotary Painless Root Canal Therapy
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Say goodbye to painful, nerve-wracking traditional dental drilling. We use nickel-titanium flexible rotary instrumentation, computerized electronic apex locators, and warm bio-ceramic obturation to preserve your natural tooth comfortably.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Micro-Apex Depth Precision</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Rubber Dam Sterile Isolation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Zero-Pain Local Anesthesia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Long-Term Tooth Longevity</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Duration: 45 minutes</span>
                </div>
                <button
                  onClick={() => onSelectServiceToBook('rct')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Book Root Canal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bento Card 2: Titanium Dental Implants */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-medium">
                    <span>Surgical Rehabilitation</span>
                    <span aria-hidden="true" className="mx-2">·</span>
                    <span>Permanent Tooth</span>
                  </div>
                  <span className="text-lg font-bold text-teal-700 tabular-nums">
                    ₹18,000
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  Titanium Dental Implants
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  The gold standard for missing teeth. Direct osseointegration restores 100% of your biting force without shaving down adjacent healthy teeth.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Biocompatible Grade-5 Titanium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Custom Computer-Milled Zirconia Crown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Prevents Jawbone Atrophy & Aging</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Duration: 60 minutes</span>
                </div>
                <button
                  onClick={() => onSelectServiceToBook('implants')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Book Implant Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs hover:border-teal-500/50 hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs text-teal-800 font-medium">
                    {service.category}
                  </span>
                  <span className="text-base font-bold text-slate-900 tabular-nums">
                    ₹{service.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mt-1.5">
                  {service.name}
                </h4>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Indications & Features */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    Key Features
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.durationMinutes} min</span>
                </div>
                <button
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 group whitespace-nowrap"
                >
                  <span>Book Procedure</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
