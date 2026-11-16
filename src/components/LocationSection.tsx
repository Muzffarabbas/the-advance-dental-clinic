import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Navigation, Clock, Phone, Mail, ShieldCheck, Car, Accessibility, HeartPulse } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Clinic Location & Accessibility</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Rath, Uttar Pradesh</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Easily accessible from all parts of Rath & Hamirpur district.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Conveniently situated near the Hamirpur-Orai bypass corridor with seamless highway connectivity, dedicated patient parking, and step-free wheelchair accessibility.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map Embed + Route Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-100">
              {/* Responsive Map View centered at exact coordinates: 25.3262129, 79.6351584 */}
              <iframe
                title="The Advance Dental Clinic Location Map"
                src={`https://maps.google.com/maps?q=25.3262129,79.6351584&hl=en&z=17&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs font-semibold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>The Advance Dental Clinic (GPS: 25.3262° N, 79.6351° E)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {CLINIC_INFO.name}
                </span>
                <span className="text-xs text-slate-600">
                  {CLINIC_INFO.address}
                </span>
              </div>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shrink-0 whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Timings, Contact, and Clinic Logistics */}
          <div className="lg:col-span-5 space-y-5">
            {/* Timings Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Doctor Consultation Hours</span>
              </div>

              <div className="mt-4 space-y-3">
                {CLINIC_INFO.workingHours.map((sched, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                    <span className="font-semibold text-slate-900">{sched.days}</span>
                    <span className="text-slate-600">{sched.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-teal-800 font-medium">
                <HeartPulse className="w-4 h-4 text-red-500 shrink-0" />
                <span>24/7 Dental Trauma & Severe Ache Emergency Hotline Available</span>
              </div>
            </div>

            {/* Direct Contact Numbers */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Direct Contact & Inquiries
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Clinic Reception</span>
                    <a href={`tel:${CLINIC_INFO.phone}`} className="font-semibold text-slate-900 hover:text-teal-700">
                      {CLINIC_INFO.phone}
                    </a>
                    <span className="text-slate-400 mx-2">/</span>
                    <a href={`tel:${CLINIC_INFO.secondaryPhone}`} className="font-semibold text-slate-900 hover:text-teal-700">
                      {CLINIC_INFO.secondaryPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Emergency & Night Relief</span>
                    <a href={`tel:${CLINIC_INFO.emergencyPhone}`} className="font-bold text-red-600 hover:underline">
                      {CLINIC_INFO.emergencyPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email Support</span>
                    <span className="font-semibold text-slate-900">{CLINIC_INFO.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility & Amenities */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                Patient Amenities
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Free Patient Parking</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Accessibility className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Wheelchair Ramps</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>UV Clean Lounge</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Power Generator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
