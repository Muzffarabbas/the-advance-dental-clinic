import React, { useState } from 'react';
import { Star, CheckCircle, ArrowRight, Sparkles, Quote } from 'lucide-react';

interface SmileGallerySectionProps {
  onOpenBooking: () => void;
}

export const SmileGallerySection: React.FC<SmileGallerySectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'makeovers' | 'testimonials'>('makeovers');

  const cases = [
    {
      title: 'Cosmetic Veneers & Gap Closure',
      duration: '2 Clinical Sessions',
      doctor: 'Dr. Priya Mishra',
      description: 'Patient presented with severe midline diastema and chipped incisor edges. Restored with 4 ultra-thin lithium disilicate (E-Max) veneers with natural translucency.',
      result: '100% gap closure and symmetrical smile line.',
    },
    {
      title: 'Single-Sitting Rotary Endodontics + Zirconia Crown',
      duration: '45 mins treatment',
      doctor: 'Dr. Anurag Verma',
      description: 'Acute pulpitis on upper first molar causing throbbing pain. Successfully treated with rotary bio-ceramic sealers and precision CAD/CAM zirconia crown.',
      result: 'Immediate toothache relief, full biting force restored.',
    },
    {
      title: 'Deep Staining & In-Chair Laser Whitening',
      duration: '40 mins session',
      doctor: 'Dr. Anurag Verma',
      description: 'Severe fluorosis and betel/tea stains accumulated over 8 years. Treated with gentle peroxide-free laser whitening and enamel remineralization.',
      result: 'Lifted 7 shades whiter without post-procedure sensitivity.',
    },
  ];

  const testimonials = [
    {
      name: 'Rameshwar Dayal',
      role: 'Local Businessman, Rath',
      quote: 'I had severe toothache for 3 weeks and was terrified of root canals. Dr. Anurag Verma treated it in a single sitting without an ounce of pain! The clinic feels like an AIIMS hospital in terms of cleanliness.',
      rating: 5,
      treatment: 'Rotary Root Canal & Crown',
    },
    {
      name: 'Pooja Tiwari',
      role: 'Teacher, Hamirpur',
      quote: 'Got ceramic veneers done before my sister’s wedding. The smile design looks completely natural and boosted my confidence completely. The online booking and payment portal made billing so smooth!',
      rating: 5,
      treatment: 'Smile Makeover & Veneers',
    },
    {
      name: 'Vipin Kumar Saxena',
      role: 'Civil Engineer, Rath',
      quote: 'Cleanest dental clinic in Bundelkhand. They unseal every sterilization pouch right in front of you. Truly transparent pricing with no hidden charges.',
      rating: 5,
      treatment: 'Dental Implants & Scaling',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Image Asset */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 relative group">
              <img
                src="/src/assets/images/smile_makeover_result_1794145363422.jpg"
                alt="Natural Aesthetic Smile Makeover Results"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider text-teal-300 font-semibold block">
                  Clinical Aesthetics
                </span>
                <span className="text-sm sm:text-base font-bold">
                  Natural Smile Architecture & Shade Matching
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Case Studies & Verified Patient Feedback */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Proven Outcomes</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Patient Testimonials</span>
            </div>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Real results delivered with empathy and craftsmanship.
            </h2>

            {/* Segmented Controls for Case Studies vs Patient Reviews */}
            <div className="mt-6 flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('makeovers')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'makeovers'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Clinical Case Studies
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'testimonials'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Google Maps Verified Reviews
              </button>
            </div>

            {/* Tab 1: Clinical Cases */}
            {activeTab === 'makeovers' && (
              <div className="mt-6 space-y-4">
                {cases.map((c, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {c.title}
                      </h4>
                      <span className="text-xs text-teal-700 font-medium">
                        {c.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Physician: <strong className="text-slate-700">{c.doctor}</strong>
                      </span>
                      <span className="text-teal-800 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                        {c.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Testimonials */}
            {activeTab === 'testimonials' && (
              <div className="mt-6 space-y-4">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(t.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {t.treatment}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-700 italic leading-relaxed">
                      "{t.quote}"
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{t.name}</span>
                      <span className="text-slate-500">{t.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-2xs transition-colors whitespace-nowrap"
              >
                <span>Consult Our Specialists</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
