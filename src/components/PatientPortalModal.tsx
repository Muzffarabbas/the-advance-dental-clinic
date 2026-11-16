import React, { useState } from 'react';
import { X, User, Calendar, FileText, Activity, CreditCard, Pill, Printer, AlertTriangle, CheckCircle2, ChevronRight, Phone, ShieldCheck, Heart } from 'lucide-react';
import { PatientProfile, ToothRecord, Invoice, Appointment } from '../types/dental';
import { CLINIC_INFO } from '../data/clinicData';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
  onPayInvoice: (invoice: Invoice) => void;
  onViewReceipt: (invoice: Invoice) => void;
  onCancelAppointment: (appointmentId: string) => void;
  onNewBookingClick: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  patient,
  onPayInvoice,
  onViewReceipt,
  onCancelAppointment,
  onNewBookingClick,
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'chart' | 'treatments' | 'prescriptions' | 'billing'>('appointments');
  const [selectedTooth, setSelectedTooth] = useState<ToothRecord | null>(patient.teethChart[13]); // Default tooth #14

  if (!isOpen) return null;

  const getToothStatusColor = (status: ToothRecord['status']) => {
    switch (status) {
      case 'root_canal': return 'bg-amber-500 border-amber-600 text-white';
      case 'crown': return 'bg-teal-600 border-teal-700 text-white';
      case 'restored': return 'bg-sky-500 border-sky-600 text-white';
      case 'cavity': return 'bg-rose-500 border-rose-600 text-white';
      case 'missing': return 'bg-slate-200 border-slate-300 text-slate-400';
      case 'healthy':
      default:
        return 'bg-emerald-500 border-emerald-600 text-white';
    }
  };

  const getToothStatusLabel = (status: ToothRecord['status']) => {
    switch (status) {
      case 'root_canal': return 'Root Canal Treated';
      case 'crown': return 'CAD/CAM Crown';
      case 'restored': return 'Composite Filling';
      case 'cavity': return 'Active Cavity';
      case 'missing': return 'Missing / Extracted';
      case 'healthy': return 'Healthy Tooth';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header with Patient Identity */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">{patient.name}</h3>
                <span className="text-[11px] text-teal-300 font-mono bg-teal-950/60 px-2 py-0.5 rounded border border-teal-700/50">
                  {patient.id}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                <span>{patient.age} yrs · {patient.gender}</span>
                <span>·</span>
                <span>Blood Group: {patient.bloodGroup}</span>
                <span>·</span>
                <span>{patient.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={onNewBookingClick}
              className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors whitespace-nowrap"
            >
              + New Appointment
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Safety & Medical Alert Banner if any allergies */}
        {patient.allergies.length > 0 && (
          <div className="px-6 py-2 bg-amber-50 border-b border-amber-200 flex items-center gap-2 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>Clinical Allergy Alert:</strong> {patient.allergies.join(', ')}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 bg-white border-b border-slate-200 flex items-center gap-1 sm:gap-4 overflow-x-auto text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3.5 px-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'appointments'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointments ({patient.appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('chart')}
            className={`py-3.5 px-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'chart'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Teeth Chart (Odontogram)</span>
          </button>

          <button
            onClick={() => setActiveTab('treatments')}
            className={`py-3.5 px-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'treatments'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Treatment Records</span>
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`py-3.5 px-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'prescriptions'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Prescriptions (Rx)</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`py-3.5 px-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'billing'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Billing & Invoices</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50">
          {/* TAB 1: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Clinical Appointments
                  </h4>
                  <p className="text-xs text-slate-500">
                    Scheduled visits at The Advance Dental Clinic, Rath
                  </p>
                </div>
              </div>

              {patient.appointments.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 mt-2">No appointments scheduled.</p>
                  <button
                    onClick={onNewBookingClick}
                    className="mt-3 px-4 py-1.5 text-xs font-semibold text-white bg-teal-600 rounded-lg"
                  >
                    Book Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {patient.appointments.map(apt => (
                    <div
                      key={apt.id}
                      className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{apt.serviceName}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            apt.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : apt.status === 'Completed'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-red-50 text-red-600'
                          }`}>
                            {apt.status}
                          </span>
                          <span className="text-[10px] text-teal-700 font-mono">
                            Ref: {apt.id}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600">
                          Doctor: <strong className="text-slate-800">{apt.doctorName}</strong>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>Date: {apt.date}</span>
                          <span>·</span>
                          <span>Slot: {apt.timeSlot}</span>
                          <span>·</span>
                          <span>Fee: ₹{apt.amountINR} ({apt.paymentStatus})</span>
                        </div>

                        {apt.chiefComplaint && (
                          <div className="text-[11px] text-slate-500 italic mt-1">
                            Note: "{apt.chiefComplaint}"
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {apt.status === 'Confirmed' && (
                          <button
                            onClick={() => onCancelAppointment(apt.id)}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5 text-slate-500" />
                          <span>Print Pass</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TEETH CHART (ODONTOGRAM) */}
          {activeTab === 'chart' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Interactive Odontogram (Universal 32-Tooth System)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Click any tooth to view its clinical diagnostic notes and restoration history.
                    </p>
                  </div>
                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px]">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Healthy</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Root Canal</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-teal-600" /> Crown</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Filling</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Missing</span>
                  </div>
                </div>

                {/* Upper Arch (1-16) */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider text-center">
                    Maxillary Arch (Upper Teeth 1–16)
                  </span>
                  <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
                    {patient.teethChart.slice(0, 16).map(tooth => (
                      <button
                        key={tooth.number}
                        onClick={() => setSelectedTooth(tooth)}
                        className={`h-10 sm:h-12 rounded-lg border flex flex-col items-center justify-center transition-all ${
                          selectedTooth?.number === tooth.number
                            ? 'ring-2 ring-slate-900 scale-105 z-10'
                            : ''
                        } ${getToothStatusColor(tooth.status)}`}
                        title={`Tooth #${tooth.number}: ${tooth.name} (${getToothStatusLabel(tooth.status)})`}
                      >
                        <span className="text-[10px] font-bold tabular-nums">#{tooth.number}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lower Arch (17-32) */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider text-center">
                    Mandibular Arch (Lower Teeth 17–32)
                  </span>
                  <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
                    {patient.teethChart.slice(16, 32).map(tooth => (
                      <button
                        key={tooth.number}
                        onClick={() => setSelectedTooth(tooth)}
                        className={`h-10 sm:h-12 rounded-lg border flex flex-col items-center justify-center transition-all ${
                          selectedTooth?.number === tooth.number
                            ? 'ring-2 ring-slate-900 scale-105 z-10'
                            : ''
                        } ${getToothStatusColor(tooth.status)}`}
                        title={`Tooth #${tooth.number}: ${tooth.name} (${getToothStatusLabel(tooth.status)})`}
                      >
                        <span className="text-[10px] font-bold tabular-nums">#{tooth.number}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected Tooth Detail Card */}
              {selectedTooth && (
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-teal-700 font-semibold uppercase">
                        Tooth Detail Inspection
                      </span>
                      <h5 className="text-base font-bold text-slate-900">
                        Tooth #{selectedTooth.number} — {selectedTooth.name}
                      </h5>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
                      {getToothStatusLabel(selectedTooth.status)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {selectedTooth.notes || 'Natural healthy tooth. No dental decay, fractures, or restorations observed.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TREATMENT RECORDS */}
          {activeTab === 'treatments' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Verified Clinical History & Operative Notes
              </h4>

              <div className="space-y-3">
                {patient.treatmentHistory.map(rec => (
                  <div
                    key={rec.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                      <span className="text-sm font-bold text-slate-900">{rec.procedure}</span>
                      <span className="text-xs text-slate-500">Date: {rec.date} · {rec.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Attending Surgeon:</span>
                        <strong className="text-slate-800">{rec.doctorName}</strong>
                      </div>
                      {rec.toothNumber && (
                        <div>
                          <span className="text-slate-400 block font-medium">Treated Tooth:</span>
                          <strong className="text-slate-800">Tooth #{rec.toothNumber}</strong>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                      <strong className="block text-slate-900 mb-0.5">Operative Findings:</strong>
                      {rec.clinicalFindings}
                    </div>

                    <div className="text-xs text-slate-700">
                      <strong className="text-slate-900">Procedure Performed: </strong>
                      {rec.treatmentPerformed}
                    </div>

                    {rec.nextFollowUp && (
                      <div className="text-xs text-teal-800 font-semibold pt-1">
                        Follow-up: {rec.nextFollowUp}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRESCRIPTIONS (RX) */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Active Clinical Prescriptions (Rx)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Medications prescribed by The Advance Dental Clinic
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Prescription</span>
                </button>
              </div>

              {patient.prescriptions.map(rx => (
                <div
                  key={rx.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">Rx ID: {rx.id}</span>
                      <span className="text-slate-500">Prescribed by {rx.doctorName} on {rx.date}</span>
                    </div>
                    <span className="text-teal-700 font-semibold">Diagnosis: {rx.diagnosis}</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="pb-2 font-semibold">Medicine Name</th>
                          <th className="pb-2 font-semibold">Dosage</th>
                          <th className="pb-2 font-semibold">Frequency</th>
                          <th className="pb-2 font-semibold">Duration</th>
                          <th className="pb-2 font-semibold">Instructions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {rx.items.map((item, idx) => (
                          <tr key={idx} className="py-2">
                            <td className="py-2.5 font-bold text-slate-900">{item.drugName}</td>
                            <td className="py-2.5 text-slate-600">{item.dosage}</td>
                            <td className="py-2.5 font-semibold text-teal-700">{item.frequency}</td>
                            <td className="py-2.5 text-slate-600">{item.duration}</td>
                            <td className="py-2.5 text-slate-500 text-[11px]">{item.instructions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {rx.specialAdvice && (
                    <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-xs text-amber-900">
                      <strong>Special Advice:</strong> {rx.specialAdvice}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: BILLING & INVOICES */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Billing, Invoices & Secure Receipts
                  </h4>
                  <p className="text-xs text-slate-500">
                    Digital GST invoices and real-time payment settlement
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {patient.invoices.map(inv => (
                  <div
                    key={inv.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Invoice {inv.invoiceNumber}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {inv.status}
                        </span>
                        <span className="text-xs text-slate-400">· {inv.date}</span>
                      </div>

                      <div className="text-xs text-slate-600">
                        {inv.items.map(i => i.description).join(', ')}
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-900 tabular-nums">
                          Total: ₹{inv.totalINR.toLocaleString('en-IN')}
                        </span>
                        {inv.paymentMethod && (
                          <span className="text-slate-400 text-[11px]">
                            via {inv.paymentMethod} {inv.transactionId ? `(${inv.transactionId})` : ''}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {inv.status === 'Unpaid' ? (
                        <button
                          onClick={() => onPayInvoice(inv)}
                          className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors"
                        >
                          Pay Bill (₹{inv.totalINR})
                        </button>
                      ) : (
                        <button
                          onClick={() => onViewReceipt(inv)}
                          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-teal-600" />
                          <span>View Official Receipt</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
