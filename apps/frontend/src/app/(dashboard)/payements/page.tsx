'use client';
import React, { useState } from 'react';
import { Payment } from '@/lib/payement.type';
import PaymentTable from '../../../components/payment/PaymentTable';
import PaymentModal from '../../../components/payment/PaymentModal';

const mockData: Payment[] = [
  {
    _id: '1',
    invoice: 'INV001',
    amount: 100,
    method: 'CASH',
    reference: '',
    date: '2024-01-10',
    recordedBy: 'Admin',
  },
];

const PaymentPage = () => {
  const [payments, setPayments] = useState<Payment[]>(mockData);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleAdd = () => {
    setSelectedPayment(null);
    setIsOpen(true);
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce paiement ?')) {
      setPayments((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const handleSubmit = (data: Payment) => {
    if (selectedPayment) {
      // update
      setPayments((prev) => prev.map((p) => (p._id === data._id ? data : p)));
    } else {
      // create
      setPayments((prev) => [...prev, { ...data, _id: Date.now().toString() }]);
    }

    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Paiements</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nouveau paiement
        </button>
      </div>

      <PaymentTable
        payments={payments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PaymentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedPayment}
      />
    </div>
  );
};

export default PaymentPage;
