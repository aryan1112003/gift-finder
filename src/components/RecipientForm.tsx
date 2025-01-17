import React from 'react';
import { Gift } from 'lucide-react';
import type { Recipient } from '../types';

interface Props {
  onSubmit: (recipient: Recipient) => void;
  loading: boolean;
}

export function RecipientForm({ onSubmit, loading }: Props) {
  const [formData, setFormData] = React.useState<Recipient>({
    name: '',
    age: 0,
    hobbies: '',
    occasion: '',
    priceRange: '',
    currency: 'USD',
    deliveryTime: ''
  });

  const getPriceRanges = (currency: string) => {
    switch (currency) {
      case 'USD':
        return [
          { value: '0-25', label: 'Under $25' },
          { value: '25-50', label: '$25-$50' },
          { value: '50-100', label: '$50-$100' },
          { value: '100-200', label: '$100-$200' },
          { value: '200+', label: 'Over $200' }
        ];
      case 'EUR':
        return [
          { value: '0-20', label: 'Under €20' },
          { value: '20-45', label: '€20-€45' },
          { value: '45-90', label: '€45-€90' },
          { value: '90-180', label: '€90-€180' },
          { value: '180+', label: 'Over €180' }
        ];
      case 'GBP':
        return [
          { value: '0-20', label: 'Under £20' },
          { value: '20-40', label: '£20-£40' },
          { value: '40-80', label: '£40-£80' },
          { value: '80-150', label: '£80-£150' },
          { value: '150+', label: 'Over £150' }
        ];
      case 'JPY':
        return [
          { value: '0-2500', label: 'Under ¥2,500' },
          { value: '2500-5000', label: '¥2,500-¥5,000' },
          { value: '5000-10000', label: '¥5,000-¥10,000' },
          { value: '10000-20000', label: '¥10,000-¥20,000' },
          { value: '20000+', label: 'Over ¥20,000' }
        ];
      case 'AUD':
        return [
          { value: '0-35', label: 'Under A$35' },
          { value: '35-70', label: 'A$35-A$70' },
          { value: '70-140', label: 'A$70-A$140' },
          { value: '140-280', label: 'A$140-A$280' },
          { value: '280+', label: 'Over A$280' }
        ];
      case 'CAD':
        return [
          { value: '0-30', label: 'Under C$30' },
          { value: '30-65', label: 'C$30-C$65' },
          { value: '65-130', label: 'C$65-C$130' },
          { value: '130-260', label: 'C$130-C$260' },
          { value: '260+', label: 'Over C$260' }
        ];
      case 'INR':
        return [
          { value: '0-2000', label: 'Under ₹2,000' },
          { value: '2000-4000', label: '₹2,000-₹4,000' },
          { value: '4000-8000', label: '₹4,000-₹8,000' },
          { value: '8000-15000', label: '₹8,000-₹15,000' },
          { value: '15000+', label: 'Over ₹15,000' }
        ];
      default:
        return [
          { value: '0-25', label: 'Budget' },
          { value: '25-50', label: 'Economy' },
          { value: '50-100', label: 'Mid-range' },
          { value: '100-200', label: 'Premium' },
          { value: '200+', label: 'Luxury' }
        ];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'currency') {
      setFormData(prev => ({ ...prev, [name]: value, priceRange: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const inputClasses = "mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 shadow-sm focus:border-purple-500 focus:ring-purple-500";
  const labelClasses = "block text-sm font-medium text-gray-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClasses}>Recipient's Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Age</label>
        <input
          type="number"
          name="age"
          required
          min="0"
          value={formData.age || ''}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Hobbies/Interests</label>
        <input
          type="text"
          name="hobbies"
          required
          value={formData.hobbies}
          onChange={handleChange}
          placeholder="e.g., reading, gaming, cooking"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Occasion</label>
        <select
          name="occasion"
          required
          value={formData.occasion}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Select an occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Christmas">Christmas</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Wedding">Wedding</option>
          <option value="Graduation">Graduation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Currency</label>
          <select
            name="currency"
            required
            value={formData.currency}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="AUD">AUD (A$)</option>
            <option value="CAD">CAD (C$)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Price Range</label>
          <select
            name="priceRange"
            required
            value={formData.priceRange}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select range</option>
            {getPriceRanges(formData.currency).map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses}>Preferred Delivery Time</label>
        <select
          name="deliveryTime"
          required
          value={formData.deliveryTime}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Select delivery time</option>
          <option value="1-2 days">1-2 days</option>
          <option value="3-5 days">3-5 days</option>
          <option value="1-2 weeks">1-2 weeks</option>
          <option value="No rush">No rush</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Gift className="animate-spin -ml-1 mr-3 h-5 w-5" />
            Finding Perfect Gifts...
          </>
        ) : (
          <>
            <Gift className="-ml-1 mr-3 h-5 w-5" />
            Find Perfect Gifts
          </>
        )}
      </button>
    </form>
  );
}