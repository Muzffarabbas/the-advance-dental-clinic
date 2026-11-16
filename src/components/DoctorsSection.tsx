import React from 'react';
import { CLINIC_DOCTORS } from '../data/clinicData';
import { Calendar, Award, GraduationCap, Clock, CheckCircle2 } from 'lucide-react';

interface DoctorsSectionProps {
  onSelectDoctorToBook: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorToBook }) => {
  return (
    <section id="doctors" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide">
            <span>Specialist Clinical Faculty</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Rath & Hamirpur Practice</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Meet your experienced dental surgeons & specialists.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Our team brings over 30 collective years of academic and clinical excellence in maxillofacial surgery, micro-endodontics, aesthetic smile restoration, and orthodontics.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLINIC_DOCTORS.map(doc => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Doctor Headshot */}
                <div className="aspect-square w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 text-xs font-semibold text-slate-900 shadow-2xs">
                    {doc.experienceYears}+ Years Clinical Practice
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    {doc.name}
                  </h3>
                  <div className="text-xs font-semibold text-teal-700 mt-0.5">
                    {doc.title}
                  </div>
                  
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.qualification}</span>
                  </div>

                  <p className="mt-4 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {doc.bio}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    <div className="text-xs text-slate-700">
                      <span className="font-semibold text-slate-900">Special Focus: </span>
                      <span>{doc.specialty}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Days: {doc.availableDays.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectDoctorToBook(doc.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation with {doc.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
