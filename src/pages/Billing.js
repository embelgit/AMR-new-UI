import { useState, useMemo } from "react";
import {
  CreditCardIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CurrencyRupeeIcon,
  CalendarDaysIcon,
  XMarkIcon,
  PrinterIcon,
  EnvelopeIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const dummyInvoices = [
  {
    id: "INV-2025-001",
    customer: "John Doe",
    email: "john@amr.com",
    phone: "+91 98765 43210",
    address: "123, Main Street, Mumbai, MH 400001",
    meterNumber: "MTR-001",
    meterType: "SOLAR",
    amount: 4500,
    tax: 810,
    total: 5310,
    dueDate: "2025-01-15",
    billingPeriod: "Dec 1 - Dec 31, 2024",
    consumption: "450 kWh",
    rate: "₹10/kWh",
    status: "Paid",
    paidDate: "2025-01-10",
    paymentMethod: "UPI",
  },
  {
    id: "INV-2025-002",
    customer: "Alice Smith",
    email: "alice@amr.com",
    phone: "+91 98765 43211",
    address: "456, Park Avenue, Delhi, DL 110001",
    meterNumber: "MTR-003",
    meterType: "WATER",
    amount: 1200,
    tax: 216,
    total: 1416,
    dueDate: "2025-01-20",
    billingPeriod: "Dec 1 - Dec 31, 2024",
    consumption: "24 KL",
    rate: "₹50/KL",
    status: "Pending",
    paidDate: null,
    paymentMethod: null,
  },
  {
    id: "INV-2025-003",
    customer: "Bob Wilson",
    email: "bob@amr.com",
    phone: "+91 98765 43212",
    address: "789, Lake View, Bangalore, KA 560001",
    meterNumber: "MTR-004",
    meterType: "ELECTRIC",
    amount: 8900,
    tax: 1602,
    total: 10502,
    dueDate: "2025-01-10",
    billingPeriod: "Dec 1 - Dec 31, 2024",
    consumption: "890 kWh",
    rate: "₹10/kWh",
    status: "Overdue",
    paidDate: null,
    paymentMethod: null,
  },
  {
    id: "INV-2025-004",
    customer: "Charlie Brown",
    email: "charlie@amr.com",
    phone: "+91 98765 43213",
    address: "321, Green Park, Chennai, TN 600001",
    meterNumber: "MTR-006",
    meterType: "WATER",
    amount: 950,
    tax: 171,
    total: 1121,
    dueDate: "2025-01-25",
    billingPeriod: "Dec 1 - Dec 31, 2024",
    consumption: "19 KL",
    rate: "₹50/KL",
    status: "Pending",
    paidDate: null,
    paymentMethod: null,
  },
  {
    id: "INV-2025-005",
    customer: "David Lee",
    email: "david@amr.com",
    phone: "+91 98765 43214",
    address: "654, Hill Road, Pune, MH 411001",
    meterNumber: "MTR-007",
    meterType: "ELECTRIC",
    amount: 6200,
    tax: 1116,
    total: 7316,
    dueDate: "2025-01-18",
    billingPeriod: "Dec 1 - Dec 31, 2024",
    consumption: "620 kWh",
    rate: "₹10/kWh",
    status: "Paid",
    paidDate: "2025-01-12",
    paymentMethod: "Net Banking",
  },
  {
    id: "INV-2024-089",
    customer: "Emma Wilson",
    email: "emma@amr.com",
    phone: "+91 98765 43215",
    address: "987, River Side, Hyderabad, TS 500001",
    meterNumber: "MTR-008",
    meterType: "GAS",
    amount: 3400,
    tax: 612,
    total: 4012,
    dueDate: "2024-12-30",
    billingPeriod: "Nov 1 - Nov 30, 2024",
    consumption: "68 m³",
    rate: "₹50/m³",
    status: "Paid",
    paidDate: "2024-12-28",
    paymentMethod: "Credit Card",
  },
];

const statusFilters = ["All", "Paid", "Pending", "Overdue"];

const Billing = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const filteredInvoices = useMemo(() => {
    return dummyInvoices.filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customer.toLowerCase().includes(search.toLowerCase()) ||
        invoice.meterNumber.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const stats = useMemo(() => {
    const total = dummyInvoices.reduce((sum, inv) => sum + inv.total, 0);
    const paid = dummyInvoices.filter((inv) => inv.status === "Paid").reduce((sum, inv) => sum + inv.total, 0);
    const pending = dummyInvoices.filter((inv) => inv.status === "Pending").reduce((sum, inv) => sum + inv.total, 0);
    const overdue = dummyInvoices.filter((inv) => inv.status === "Overdue").reduce((sum, inv) => sum + inv.total, 0);
    return { total, paid, pending, overdue };
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case "Pending":
        return <ClockIcon className="w-5 h-5 text-amber-600" />;
      case "Overdue":
        return <ExclamationCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMeterColor = (meterType) => {
    switch (meterType) {
      case "SOLAR":
        return "bg-amber-100 text-amber-700";
      case "GAS":
        return "bg-orange-100 text-orange-700";
      case "WATER":
        return "bg-blue-100 text-blue-700";
      case "ELECTRIC":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownload = (invoice, e) => {
    if (e) e.stopPropagation();
    setToastMessage(`Downloading invoice ${invoice.id}...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePrint = (invoice) => {
    setToastMessage(`Preparing invoice ${invoice.id} for printing...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleEmail = (invoice) => {
    setToastMessage(`Sending invoice ${invoice.id} to ${invoice.email}...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Billing</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage invoices and payments
            </p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition">
            <CreditCardIcon className="w-5 h-5" />
            Create Invoice
          </button>
        </div>
      </div>

      <div className="px-4 py-6 md:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Billing</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(stats.total)}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <CurrencyRupeeIcon className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Paid</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(stats.paid)}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm">Pending</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(stats.pending)}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <ClockIcon className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Overdue</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(stats.overdue)}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <ExclamationCircleIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative w-full sm:w-auto">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search invoices..."
                  className="pl-10 pr-4 py-2.5 bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all w-full sm:w-64"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${showFilters ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                <FunnelIcon className="w-5 h-5" />
                Filters
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-500">Total Invoices: <span className="font-semibold text-slate-800">{dummyInvoices.length}</span></span>
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-200">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                <div className="flex gap-2">
                  {statusFilters.map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${statusFilter === status
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">Invoice</th>
                  <th className="px-5 py-4 text-left font-semibold">Customer</th>
                  <th className="px-5 py-4 text-left font-semibold">Meter</th>
                  <th className="px-5 py-4 text-left font-semibold">Amount</th>
                  <th className="px-5 py-4 text-left font-semibold">Due Date</th>
                  <th className="px-5 py-4 text-left font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-slate-50 transition cursor-pointer"
                    onClick={() => setSelectedInvoice(invoice)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <DocumentTextIcon className="w-5 h-5 text-slate-600" />
                        </div>
                        <span className="font-medium text-slate-800">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-slate-800">{invoice.customer}</p>
                        <p className="text-xs text-slate-500">{invoice.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getMeterColor(invoice.meterType)}`}>
                          {invoice.meterType}
                        </span>
                        <span className="text-slate-600">{invoice.meterNumber}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {formatCurrency(invoice.total)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarDaysIcon className="w-4 h-4" />
                        {invoice.dueDate}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(invoice.status)}
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvoice(invoice);
                          }}
                          className="p-2 hover:bg-blue-100 rounded-lg transition"
                          title="View"
                        >
                          <EyeIcon className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={(e) => handleDownload(invoice, e)}
                          className="p-2 hover:bg-green-100 rounded-lg transition"
                          title="Download"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmail(invoice);
                          }}
                          className="p-2 hover:bg-purple-100 rounded-lg transition"
                          title="Send Email"
                        >
                          <EnvelopeIcon className="w-4 h-4 text-purple-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="p-12 text-center">
              <CreditCardIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No invoices found</p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">{selectedInvoice.id}</h2>
                  <p className="text-sm text-slate-500">{selectedInvoice.billingPeriod}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-2 hover:bg-slate-200 rounded-lg transition"
              >
                <XMarkIcon className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedInvoice.status)}
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status}
                  </span>
                  {selectedInvoice.paidDate && (
                    <span className="text-sm text-slate-500">
                      Paid on {selectedInvoice.paidDate} via {selectedInvoice.paymentMethod}
                    </span>
                  )}
                </div>

                {/* Customer Info */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Customer Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Name</p>
                      <p className="font-medium text-slate-800">{selectedInvoice.customer}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Email</p>
                      <p className="font-medium text-slate-800">{selectedInvoice.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Phone</p>
                      <p className="font-medium text-slate-800">{selectedInvoice.phone}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Meter</p>
                      <p className="font-medium text-slate-800">{selectedInvoice.meterNumber} ({selectedInvoice.meterType})</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-slate-500">Address</p>
                      <p className="font-medium text-slate-800">{selectedInvoice.address}</p>
                    </div>
                  </div>
                </div>

                {/* Billing Details */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Billing Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Consumption</span>
                      <span className="font-medium text-slate-800">{selectedInvoice.consumption}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Rate</span>
                      <span className="font-medium text-slate-800">{selectedInvoice.rate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-medium text-slate-800">{formatCurrency(selectedInvoice.amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Tax (18% GST)</span>
                      <span className="font-medium text-slate-800">{formatCurrency(selectedInvoice.tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-slate-200">
                      <span className="font-semibold text-slate-800">Total Amount</span>
                      <span className="font-bold text-xl text-blue-600">{formatCurrency(selectedInvoice.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDaysIcon className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-500">Due Date:</span>
                  <span className="font-semibold text-slate-800">{selectedInvoice.dueDate}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => handleEmail(selectedInvoice)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition"
              >
                <EnvelopeIcon className="w-4 h-4" />
                Send Email
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePrint(selectedInvoice)}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition"
                >
                  <PrinterIcon className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => handleDownload(selectedInvoice)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slideUp z-50">
          <CheckCircleIcon className="w-5 h-5 text-green-400" />
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Billing;
