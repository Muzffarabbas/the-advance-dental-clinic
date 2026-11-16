import React from 'react';
import { ShieldCheck, Cpu, Sparkles, Activity, CheckCircle, Award } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image Asset */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <img
                src="/src/assets/images/dental_technology_operatory_1794145362072.jpg"
                alt="Digital Dental Technology & Operatory Instruments"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Overlay Info Card */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span className="font-semibold text-slate-800">Class-B Vacuum Autoclave Tested</span>
              </div>
              <span className="text-slate-500">100% Pouch Sealed</span>
            </div>
          </div>

          {/* Right Column: Technology & Protocol Highlights */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Safety & Clinical Innovation</span>
            </div>

            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Zero compromises on sterilization, accuracy, and patient comfort.
            </h2>

            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Dental treatment requires surgical hygiene and micrometer precision. At The Advance Dental Clinic in Rath, every single instrument undergoes medical multi-stage autoclave sterilization, and procedures are guided by computerized diagnostics.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    6-Step Hospital Sterilization Protocol
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Enzymatic pre-cleaning, ultrasonic bath scrub, medical pouch heat-sealing, Class-B vacuum autoclaving at 134°C, and storage in germicidal UV chambers. Pouches are unsealed exclusively in front of the patient.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Cpu className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Digital RVG Intraoral Sensors & Low-Dose Radiography
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Crystal-clear instantaneous digital x-rays displaying bone density, hidden nerve canals, and tooth decay on high-definition monitors with up to 90% lower radiation than old chemical film x-rays.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Rotary Endodontics & Electronic Apex Monitoring
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Flexible aerospace-grade nickel-titanium root canal files prevent root perforation, reduce treatment time to under 45 minutes, and eliminate postoperative soreness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
