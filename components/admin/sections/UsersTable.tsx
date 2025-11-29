// Naziv komponente: UsersTable
import React from 'react';
import { MOCK_USERS } from '../../../data/mockData'; // Uvoz mock korisnika

// Komponenta za prikaz tabele korisnika
export const UsersTable: React.FC = () => (
    <div className="space-y-4">
      <h2 className="text-3xl font-mono text-black border-b-4 border-red-600 pb-1 inline-block">PREGLED KORISNIKA</h2>
      <table className="w-full text-left font-mono border-collapse border border-black">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-3 border-r border-gray-700">ID</th>
            <th className="p-3 border-r border-gray-700">IME</th>
            <th className="p-3 border-r border-gray-700">ROLA</th>
            <th className="p-3">ZADNJA PRIJAVA</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_USERS.map(user => (
            <tr key={user.id} className="border-b border-black odd:bg-gray-100 even:bg-white hover:bg-lime-100 transition">
              <td className="p-3 border-r border-black text-red-600 font-bold">{user.id}</td>
              <td className="p-3 border-r border-black text-gray-800">{user.name}</td>
              <td className="p-3 border-r border-black">
                <span className={`px-2 py-0.5 text-xs font-bold ${user.role === 'ADMIN' ? 'bg-red-600 text-white' : 'bg-gray-400 text-black'}`}>
                  {user.role}
                </span>
              </td>
              <td className="p-3 text-sm text-gray-600">{user.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);