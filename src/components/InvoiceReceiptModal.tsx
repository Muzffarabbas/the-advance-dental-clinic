import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Invoice } from '../types/dental';
import { CLINIC_INFO } from '../data/clinicData';

interface InvoiceReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export const InvoiceReceiptModal: React.FC<InvoiceReceiptModalProps> = ({
  isOpen,
  onClose,
  invoice,
}) => {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Action Header (Hidden during print) */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Tax Invoice & Receipt
            </span>
            <span className="text-xs text-slate-400">#{invoice.invoiceNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-8 sm:p-10 bg-white text-slate-900 space-y-6" id="printable-invoice">
          {/* Clinic Brand Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b-2 border-slate-900 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
                  AD
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  {CLINIC_INFO.name}
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-sm">
                {CLINIC_INFO.address}
              </p>
              <div className="text-[11px] text-slate-500 mt-1 space-x-2">
                <span>Phone: {CLINIC_INFO.phone}</span>
                <span>·</span>
                <span>Reg: {CLINIC_INFO.registrationNo}</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-2xl font-black tracking-tight text-teal-700 block">
                {invoice.status === 'Paid' ? 'TAX INVOICE / RECEIPT' : 'PRO-FORMA INVOICE'}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Invoice No: <strong className="text-slate-900 font-mono">{invoice.invoiceNumber}</strong>
              </span>
              <span className="text-xs text-slate-500 block">
                Date: <strong className="text-slate-900">{invoice.date}</strong>
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                GSTIN: {CLINIC_INFO.gstin}
              </span>
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-semibold">
                Billed To (Patient)
              </span>
              <span className="font-bold text-slate-900 text-sm block mt-0.5">
                {invoice.patientName}
              </span>
              <span className="text-slate-600 block">Phone: {invoice.patientPhone}</span>
              <span className="text-slate-500 block">Location: Rath, Hamirpur (U.P.)</span>
            </div>

            <div className="text-right">
              <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-semibold">
                Payment Verification
              </span>
              <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded mt-1 ${
                invoice.status === 'Paid'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {invoice.status.toUpperCase()}
              </span>
              {invoice.transactionId && (
                <span className="block text-[11px] font-mono text-slate-600 mt-1">
                  Txn ID: {invoice.transactionId}
                </span>
              )}
              {invoice.paidAt && (
                <span className="block text-[10px] text-slate-500">
                  Settled on {invoice.paidAt}
                </span>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 font-bold">Item Description</th>
                  <th className="py-2.5 font-bold text-center">Qty</th>
                  <th className="py-2.5 font-bold text-right">Unit Rate (₹)</th>
                  <th className="py-2.5 font-bold text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-3 font-semibold text-slate-900">
                      {item.description}
                    </td>
                    <td className="py-3 text-center text-slate-600 tabular-nums">
                      {item.qty}
                    </td>
                    <td className="py-3 text-right text-slate-600 tabular-nums">
                      ₹{item.unitPriceINR.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 text-right font-bold text-slate-900 tabular-nums">
                      ₹{item.amountINR.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Breakdown */}
          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="tabular-nums">₹{invoice.subtotalINR.toLocaleString('en-IN')}</span>
              </div>
              {invoice.discountINR > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Special Concession:</span>
                  <span className="tabular-nums">-₹{invoice.discountINR.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Healthcare Exemption (GST):</span>
                <span>₹0.00 (NIL)</span>
              </div>
              <div className="pt-2 border-t border-slate-300 flex justify-between text-sm font-bold text-slate-900">
                <span>Grand Total:</span>
                <span className="text-teal-700 tabular-nums">₹{invoice.totalINR.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Stamp & Authorized Signatory */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-slate-500 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 text-teal-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Authorized Digital Clinic Stamp</span>
              </div>
              <p>Computer generated invoice, valid without physical seal.</p>
            </div>

            <div className="text-center sm:text-right">
              <div className="font-serif italic text-base text-slate-800 mb-1">
                Dr. Anurag Verma
              </div>
              <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                Chief Dental Surgeon & Director
              </div>
              <div className="text-[10px] text-slate-400">
                UP-DDC Reg. No. 09412
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
