'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faLock,
  faCreditCard,
  faShieldHalved,
  faSpinner,
  faTicket,
  faDownload,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

// Real QR Code component for Web UI
import { QRCodeSVG } from 'qrcode.react';
// QRCode generator for PDF Data URL
import QRCode from 'qrcode';

// React PDF Renderer imports
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from '@react-pdf/renderer';

// --- PDF Document Styles ---
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#0B0B0F',
    color: '#F8F5EE',
    fontFamily: 'Helvetica',
  },
  card: {
    borderWidth: 1,
    borderColor: '#2B2B35',
    borderRadius: 16,
    padding: 24,
    backgroundColor: '#14141B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2B2B35',
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8F5EE',
  },
  subtitle: {
    fontSize: 10,
    color: '#A7A7B0',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#F5B942',
    color: '#0B0B0F',
    fontSize: 8,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  col: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 8,
    color: '#A7A7B0',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F8F5EE',
  },
  seatsValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#36C98F',
  },
  qrSection: {
    marginTop: 20,
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#2B2B35',
    borderStyle: 'dashed',
  },
  qrImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 6,
  },
  footer: {
    marginTop: 12,
    fontSize: 9,
    color: '#A7A7B0',
    textAlign: 'center',
  },
});

// --- PDF Document Component ---
const TicketPDFDocument = ({ bookingDetails, orderId, qrDataUrl }) => (
  <Document>
    <Page size="A5" style={pdfStyles.page}>
      <View style={pdfStyles.card}>
        {/* Header */}
        <View style={pdfStyles.header}>
          <View>
            <Text style={pdfStyles.title}>{bookingDetails.title}</Text>
            <Text style={pdfStyles.subtitle}>{bookingDetails.screen}</Text>
          </View>
          <Text style={pdfStyles.badge}>{bookingDetails.format}</Text>
        </View>

        {/* Details Grid */}
        <View style={pdfStyles.grid}>
          <View style={pdfStyles.col}>
            <Text style={pdfStyles.label}>Date & Time</Text>
            <Text style={pdfStyles.value}>{bookingDetails.dateStr}</Text>
            <Text style={{ ...pdfStyles.value, color: '#F5B942', marginTop: 2 }}>
              {bookingDetails.time}
            </Text>
          </View>

          <View style={pdfStyles.col}>
            <Text style={pdfStyles.label}>Seats ({bookingDetails.seats.length})</Text>
            <Text style={pdfStyles.seatsValue}>{bookingDetails.seats.join(', ')}</Text>
          </View>

          <View style={pdfStyles.col}>
            <Text style={pdfStyles.label}>Order ID</Text>
            <Text style={{ ...pdfStyles.value, color: '#F5B942' }}>{orderId}</Text>
            <Text style={{ ...pdfStyles.subtitle, marginTop: 2 }}>
              Paid: ${bookingDetails.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* QR Code */}
        <View style={pdfStyles.qrSection}>
          {qrDataUrl && <PDFImage src={qrDataUrl} style={pdfStyles.qrImage} />}
          <Text style={pdfStyles.footer}>
            Scan this QR Code at the cinema hall entrance
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract booking details from URL
  const bookingDetails = useMemo(() => {
    return {
      title: searchParams.get('title') || 'Dune: Part Two',
      poster:
        searchParams.get('poster') ||
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
      format: searchParams.get('format') || 'Standard 2D',
      screen: searchParams.get('screen') || 'Auditorium 1',
      time: searchParams.get('time') || '07:30 PM',
      dateStr: searchParams.get('dateStr') || 'Thu, 24 Jul',
      seats: searchParams.get('seats') ? searchParams.get('seats').split(',') : ['C4', 'C5'],
      total: parseFloat(searchParams.get('total') || '27.00'),
      subtotal: parseFloat(searchParams.get('subtotal') || '25.50'),
      fee: parseFloat(searchParams.get('fee') || '1.50'),
    };
  }, [searchParams]);

  // Payment Form States
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // UX Processing & Success States
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Format Card Number
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Format Expiry
  const handleExpiryChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      setExpiry(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setExpiry(val);
    }
  };

  // Submit Payment Handler
  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const randomOrder = 'CN-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrder);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  // PDF Download Handler
  const handleDownloadPDF = async () => {
    try {
      setIsDownloadingPDF(true);

      // Generate Data URL for QR Code to embed inside the PDF
      const qrDataUrl = await QRCode.toDataURL(
        JSON.stringify({
          orderId,
          title: bookingDetails.title,
          seats: bookingDetails.seats,
          time: bookingDetails.time,
        }),
        { margin: 1, width: 200 }
      );

      // Generate PDF Blob client-side
      const blob = await pdf(
        <TicketPDFDocument
          bookingDetails={bookingDetails}
          orderId={orderId}
          qrDataUrl={qrDataUrl}
        />
      ).toBlob();

      // Trigger browser download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Ticket-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  // Serialized QR Code Payload
  const qrCodePayload = useMemo(() => {
    return JSON.stringify({
      orderId,
      title: bookingDetails.title,
      seats: bookingDetails.seats,
      time: bookingDetails.time,
    });
  }, [orderId, bookingDetails]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F8F5EE] selection:bg-[#F5B942] selection:text-[#0B0B0F] pb-16">
      {/* Top Navigation */}
      <header className="border-b border-[#2B2B35] bg-[#14141B]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-semibold text-[#A7A7B0] hover:text-[#F8F5EE] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1D1D26] border border-[#2B2B35] flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            </div>
            <span>Back to Seats</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#F5B942] bg-[#1D1D26] px-3 py-1.5 rounded-full border border-[#2B2B35]">
            <FontAwesomeIcon icon={faShieldHalved} />
            <span className="text-[#F8F5EE]">256-Bit Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8">
        {/* SUCCESS STATE: DIGITAL TICKET */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto space-y-6 pt-4"
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#36C98F]/20 text-[#36C98F] border border-[#36C98F]/40 flex items-center justify-center mx-auto text-2xl">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h1 className="text-2xl font-black text-[#F8F5EE]">Booking Confirmed!</h1>
              <p className="text-xs text-[#A7A7B0]">
                Order <span className="text-[#F5B942] font-mono font-bold">{orderId}</span> • E-Ticket sent to your device
              </p>
            </div>

            {/* Realistic Digital Cinema Ticket */}
            <div className="bg-[#14141B] border border-[#2B2B35] rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="p-6 bg-gradient-to-br from-[#1D1D26] to-[#14141B] border-b border-[#2B2B35] flex gap-4 items-center">
                <img
                  src={bookingDetails.poster}
                  alt={bookingDetails.title}
                  className="w-16 h-24 object-cover rounded-xl shadow-md border border-[#2B2B35]"
                />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-[#F5B942]/20 text-[#F5B942] border border-[#F5B942]/30">
                    {bookingDetails.format}
                  </span>
                  <h3 className="text-lg font-bold text-[#F8F5EE] line-clamp-1">{bookingDetails.title}</h3>
                  <p className="text-xs text-[#A7A7B0]">{bookingDetails.screen}</p>
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div className="p-6 grid grid-cols-2 gap-4 text-xs border-b border-dashed border-[#2B2B35] relative">
                <div className="absolute -left-3 -bottom-3 w-6 h-6 rounded-full bg-[#0B0B0F] border border-[#2B2B35]" />
                <div className="absolute -right-3 -bottom-3 w-6 h-6 rounded-full bg-[#0B0B0F] border border-[#2B2B35]" />

                <div>
                  <span className="text-[#A7A7B0] block text-[10px] uppercase">Date & Time</span>
                  <span className="font-bold text-[#F8F5EE]">{bookingDetails.dateStr}</span>
                  <span className="block text-[#FFE3A3] font-semibold">{bookingDetails.time}</span>
                </div>
                <div>
                  <span className="text-[#A7A7B0] block text-[10px] uppercase">Seats ({bookingDetails.seats.length})</span>
                  <span className="font-bold text-[#36C98F] text-base">{bookingDetails.seats.join(', ')}</span>
                </div>
              </div>

              {/* Real SVG QR Code Section */}
              <div className="p-6 text-center space-y-3 bg-[#1D1D26]/50">
                <div className="w-36 h-36 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
                  <QRCodeSVG
                    value={qrCodePayload}
                    size={120}
                    level="M"
                    bgColor="#FFFFFF"
                    fgColor="#0B0B0F"
                  />
                </div>
                <p className="text-[11px] text-[#A7A7B0]">Scan this QR code at the cinema entrance</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isDownloadingPDF}
                className="flex-1 py-3.5 rounded-xl bg-[#1D1D26] hover:bg-[#2B2B35] border border-[#2B2B35] text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isDownloadingPDF ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sm" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Save Ticket</span>
                  </>
                )}
              </button>
              <Link
                href="/"
                className="flex-1 py-3.5 rounded-xl bg-[#F5B942] hover:bg-[#D98E2B] text-[#0B0B0F] text-xs font-bold flex items-center justify-center transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        ) : (
          /* FORM & PAYMENT PROCESSOR VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: PAYMENT METHODS & FORM */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-2xl font-black text-[#F8F5EE]">Select Payment Method</h1>
                <p className="text-xs text-[#A7A7B0]">Choose your preferred checkout method below.</p>
              </div>

              {/* Payment Method Switcher */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                    paymentMethod === 'card'
                      ? 'bg-[#1D1D26] border-[#F5B942] shadow-lg shadow-[#F5B942]/10'
                      : 'bg-[#14141B] border-[#2B2B35] opacity-70 hover:opacity-100'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className={`text-xl ${paymentMethod === 'card' ? 'text-[#F5B942]' : 'text-[#A7A7B0]'}`}
                  />
                  <div>
                    <span className="block text-xs font-bold text-[#F8F5EE]">Credit / Debit Card</span>
                    <span className="text-[10px] text-[#A7A7B0]">Visa, Mastercard, AMEX</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                    paymentMethod === 'apple'
                      ? 'bg-[#1D1D26] border-[#F5B942] shadow-lg shadow-[#F5B942]/10'
                      : 'bg-[#14141B] border-[#2B2B35] opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="text-xl font-black text-[#F8F5EE]"> Pay</span>
                  <div>
                    <span className="block text-xs font-bold text-[#F8F5EE]">Apple Pay</span>
                    <span className="text-[10px] text-[#A7A7B0]">Instant 1-Click Checkout</span>
                  </div>
                </button>
              </div>

              {/* CARD FORM */}
              {paymentMethod === 'card' ? (
                <form onSubmit={handlePay} className="bg-[#14141B] border border-[#2B2B35] rounded-2xl p-6 space-y-5">
                  <div className="relative h-44 rounded-2xl bg-gradient-to-tr from-[#1D1D26] via-[#2B2B35] to-[#14141B] p-5 border border-[#2B2B35] flex flex-col justify-between shadow-xl overflow-hidden">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono tracking-widest text-[#FFE3A3] uppercase">Cinema Pass</span>
                      <FontAwesomeIcon icon={faCreditCard} className="text-[#F5B942] text-xl" />
                    </div>

                    <div className="text-lg sm:text-xl font-mono tracking-widest text-[#F8F5EE]">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-[#A7A7B0]">
                      <div>
                        <span className="block text-[8px] uppercase">Cardholder</span>
                        <span className="text-[#F8F5EE] font-bold uppercase">{cardHolder || 'YOUR NAME'}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase">Expires</span>
                        <span className="text-[#F8F5EE] font-bold">{expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#A7A7B0] mb-1.5">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="4532 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full bg-[#1D1D26] border border-[#2B2B35] rounded-xl px-4 py-3 text-sm text-[#F8F5EE] focus:outline-none focus:border-[#F5B942] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A7A7B0] mb-1.5">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full bg-[#1D1D26] border border-[#2B2B35] rounded-xl px-4 py-3 text-sm text-[#F8F5EE] focus:outline-none focus:border-[#F5B942] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#A7A7B0] mb-1.5">Expiration Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={handleExpiryChange}
                          className="w-full bg-[#1D1D26] border border-[#2B2B35] rounded-xl px-4 py-3 text-sm text-[#F8F5EE] focus:outline-none focus:border-[#F5B942] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#A7A7B0] mb-1.5">CVV / CVC</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          className="w-full bg-[#1D1D26] border border-[#2B2B35] rounded-xl px-4 py-3 text-sm text-[#F8F5EE] focus:outline-none focus:border-[#F5B942] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-[#F5B942] hover:bg-[#D98E2B] text-[#0B0B0F] font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#F5B942]/20"
                  >
                    {isProcessing ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-base" />
                        <span>Authorizing Payment...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faLock} />
                        <span>Pay ${bookingDetails.total.toFixed(2)} Now</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* APPLE PAY SIMULATION */
                <div className="bg-[#14141B] border border-[#2B2B35] rounded-2xl p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-[#1D1D26] border border-[#2B2B35] rounded-2xl flex items-center justify-center mx-auto text-3xl text-[#F8F5EE]">
                    
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F8F5EE]">Apple Pay Express</h3>
                    <p className="text-xs text-[#A7A7B0] max-w-xs mx-auto mt-1">
                      Confirm payment with Touch ID or Double-Click side button.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-white hover:bg-gray-200 text-black font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-base" />
                        <span>Processing Apple Pay...</span>
                      </>
                    ) : (
                      <span>Pay with Pay</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <aside className="lg:col-span-5">
              <div className="bg-[#14141B] border border-[#2B2B35] rounded-2xl p-6 space-y-5 sticky top-24">
                <h2 className="text-base font-bold text-[#F8F5EE] border-b border-[#2B2B35] pb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faTicket} className="text-[#F5B942]" />
                  <span>Order Summary</span>
                </h2>

                <div className="flex gap-4 items-center">
                  <img
                    src={bookingDetails.poster}
                    alt={bookingDetails.title}
                    className="w-16 h-22 object-cover rounded-xl border border-[#2B2B35]"
                  />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#F8F5EE]">{bookingDetails.title}</h3>
                    <p className="text-xs text-[#A7A7B0]">{bookingDetails.format} • {bookingDetails.screen}</p>
                    <p className="text-xs text-[#FFE3A3] font-semibold">
                      {bookingDetails.dateStr} @ {bookingDetails.time}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#2B2B35] text-xs">
                  <div className="flex justify-between text-[#A7A7B0]">
                    <span>Seats:</span>
                    <span className="text-[#36C98F] font-bold">{bookingDetails.seats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-[#A7A7B0]">
                    <span>Tickets Subtotal</span>
                    <span className="text-[#F8F5EE] font-semibold">${bookingDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#A7A7B0]">
                    <span>Convenience Fee</span>
                    <span className="text-[#F8F5EE] font-semibold">${bookingDetails.fee.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-[#2B2B35] flex justify-between text-base font-black">
                    <span className="text-[#F8F5EE]">Total</span>
                    <span className="text-[#F5B942]">${bookingDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center text-[#F5B942]">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}