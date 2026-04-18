'use client';
import React from 'react';
import { Payment } from '@/lib/payement.type';

interface Props {
  payments: Payment[];
  onEdit: (p: Payment) => void;
  onDelete: (id: string) => void;
}

const PaymentTable: React.FC<Props> = ({ payments, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded shadow">
      <table className="w-full text-left">
        <thead className="border-b">
          <tr>
            <th className="p-3">Montant</th>
            <th>Méthode</th>
            <th>Référence</th>
            <th>Date</th>
            <th>Utilisateur</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{p.amount} $</td>
              <td>{p.method}</td>
              <td>{p.reference || '-'}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
              <td>{p.recordedBy}</td>

              <td className="space-x-2">
                <button onClick={() => onEdit(p)} className="text-blue-500">
                  ✏️
                </button>

                <button
                  onClick={() => onDelete(p._id)}
                  className="text-red-500"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
