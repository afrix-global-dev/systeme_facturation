'use client';
import React, { useEffect, useState } from 'react';
import { Payment, PaymentMethod } from '@/lib/payement.type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Payment) => void;
  initialData: Payment | null;
}

const PaymentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState<Payment>({
    _id: '',
    invoice: '',
    amount: 0,
    method: PaymentMethod.CASH,
    reference: '',
    date: new Date().toISOString().slice(0, 10),
    recordedBy: 'Admin',
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg mb-4">
          {initialData ? 'Modifier' : 'Nouveau paiement'}
        </h2>

        <input
          name="amount"
          type="number"
          placeholder="Montant"
          value={form.amount}
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />

        <select
          name="method"
          value={form.method}
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        >
          {Object.values(PaymentMethod).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          name="reference"
          placeholder="Référence"
          value={form.reference}
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />

        <div className="flex justify-end space-x-2">
          <button onClick={onClose}>Annuler</button>
          <button
            onClick={() => onSubmit(form)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
