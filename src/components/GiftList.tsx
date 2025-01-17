import React from 'react';
import { Gift } from 'lucide-react';
import type { GiftSuggestion } from '../types';

interface Props {
  gifts: GiftSuggestion[];
}

export function GiftList({ gifts }: Props) {
  if (!gifts.length) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300">Suggested Gifts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gifts.map((gift, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Gift className="h-6 w-6 text-purple-400" />
                <span className="text-lg font-semibold text-purple-400">{gift.price}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{gift.name}</h3>
              <p className="text-sm text-purple-400 mb-2">{gift.brand}</p>
              <p className="text-gray-400">{gift.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}