import React from 'react';
import { Gift, Github, Linkedin } from 'lucide-react';
import { RecipientForm } from './components/RecipientForm';
import { GiftList } from './components/GiftList';
import { generateGiftSuggestions } from './lib/gemini';
import type { Recipient, GiftSuggestion } from './types';

function App() {
  const [loading, setLoading] = React.useState(false);
  const [gifts, setGifts] = React.useState<GiftSuggestion[]>([]);
  const [error, setError] = React.useState<string>('');

  const handleSubmit = async (recipient: Recipient) => {
    setLoading(true);
    setError('');
    try {
      const suggestions = await generateGiftSuggestions(recipient);
      setGifts(suggestions);
    } catch (err) {
      setError('Failed to generate gift suggestions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Gift className="mx-auto h-12 w-12 text-purple-400" />
          <h1 className="mt-4 text-4xl font-bold text-purple-300">
            Personalized Gift Finder
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Let AI help you find the perfect gift for your loved ones
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="bg-gray-800 shadow-xl rounded-lg p-6 mb-8 border border-gray-700">
            <RecipientForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {error && (
            <div className="bg-red-900 border-l-4 border-red-500 p-4 mb-8">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <GiftList gifts={gifts} />
        </div>

        <footer className="mt-16 text-center text-gray-400 border-t border-gray-800 pt-8">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://github.com/aryan1112003"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/aryan-acharya-9b939b316/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Created by Aryan Acharya. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;