import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, QrCode, Building, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Invoice } from '../types/dental';
import { CLINIC_INFO } from '../data/clinicData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
  onPaymentSuccess: (invoiceId: string, paymentMethod: 'UPI' | 'Card' | 'Net Banking', transactionId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedTxnId, setGeneratedTxnId] = useState('');

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('Rajesh Rajput');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardError, setCardError] = useState('');

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (!isOpen) return null;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiry(raw);
    }
  };

  const executePayment = (chosenMethod: 'UPI' | 'Card' | 'Net Banking') => {
    if (chosenMethod === 'Card') {
      const cleanNum = cardNumber.replace(/\s/g, '');
      if (cleanNum.length < 16) {
        setCardError('Please enter a full 16-digit card number');
        return;
      }
      if (expiry.length < 5) {
        setCardError('Please enter a valid expiry date (MM/YY)');
        return;
      }
      if (cvv.length < 3) {
        setCardError('Please enter 3-digit CVV');
        return;
      }
      setCardError('');
    }

    setProcessing(true);

    setTimeout(() => {
      const txnId = `TXN-${chosenMethod.toUpperCase()}-${Date.now().toString().slice(-8)}`;
      setGeneratedTxnId(txnId);
      setProcessing(false);
      setSuccess(true);
      onPaymentSuccess(invoice.id, chosenMethod, txnId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Secure Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold">Secure Clinical Payment Gateway</h3>
              <span className="text-[11px] text-slate-400">256-Bit TLS Bank Encrypted</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Summary Pill */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block">Invoice #{invoice.invoiceNumber}</span>
            <span className="font-semibold text-slate-800 line-clamp-1">
              {invoice.items[0]?.description}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block">Payable Amount</span>
            <span className="text-base font-bold text-teal-700 tabular-nums">
              ₹{invoice.totalINR.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Payment Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Payment Received Successfully!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Transaction Reference: <strong className="font-mono text-slate-800">{generatedTxnId}</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Paid To:</span>
                  <span className="font-semibold text-slate-900">{CLINIC_INFO.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-teal-700">₹{invoice.totalINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-700">Settled (Tax Invoice Updated)</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors"
              >
                View Updated Invoices & Receipts
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Payment Methods Segmented Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setMethod('upi')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    method === 'upi'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>UPI / QR</span>
                </button>

                <button
                  onClick={() => setMethod('card')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    method === 'card'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Debit / Card</span>
                </button>

                <button
                  onClick={() => setMethod('netbanking')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    method === 'netbanking'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* METHOD 1: UPI / QR */}
              {method === 'upi' && (
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block mx-auto">
                    {/* Simulated SVG QR Code */}
                    <div className="w-40 h-40 bg-white p-2 rounded-lg border border-slate-200 flex flex-col items-center justify-center mx-auto shadow-2xs relative">
                      <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                        {[...Array(36)].map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-xs ${
                              (i % 2 === 0 || i % 5 === 0) && i !== 14 && i !== 21
                                ? 'bg-slate-900'
                                : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-7 h-7 rounded bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                          UPI
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-600 block mt-2">
                      theadvancedentalclinic@okhdfcbank
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Scan with Google Pay, PhonePe, Paytm, BHIM, or any UPI App to complete payment.
                  </p>

                  <button
                    disabled={processing}
                    onClick={() => executePayment('UPI')}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-colors"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying UPI Payment...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Simulate Instant UPI Approval (₹{invoice.totalINR})</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* METHOD 2: DEBIT / CREDIT CARD */}
              {method === 'card' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4532 8900 1234 5678"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-teal-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={cardHolder}
                      onChange={e => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-teal-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={handleExpiryChange}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-teal-600 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cvv}
                        onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-teal-600 font-mono"
                      />
                    </div>
                  </div>

                  {cardError && (
                    <div className="text-[11px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{cardError}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      disabled={processing}
                      onClick={() => executePayment('Card')}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-colors"
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing 3D-Secure Authentication...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Pay ₹{invoice.totalINR.toLocaleString('en-IN')} Securely</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* METHOD 3: NET BANKING */}
              {method === 'netbanking' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">
                      Select Your Bank
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Bank of Baroda'].map(b => (
                        <button
                          key={b}
                          onClick={() => setSelectedBank(b)}
                          className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                            selectedBank === b
                              ? 'border-teal-600 bg-teal-50/50 text-teal-800 font-bold ring-1 ring-teal-600'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={processing}
                    onClick={() => executePayment('Net Banking')}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-colors"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Redirecting to {selectedBank}...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue with {selectedBank} (₹{invoice.totalINR})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>PCI-DSS Level 1 Compliant · Instant Automated Clinical Receipt</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
