import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlayer } from '../lib/supabase';

export function JoinPlayer() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const player = await createPlayer(trimmed);
      navigate(`/player/${player.id}`);
    } catch (err) {
      console.error('Failed to create player:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-sm mx-auto mt-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-green-900">
            Join the Birdie Game
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your name to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Your name"
            autoFocus
            maxLength={50}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent placeholder:text-gray-300 mb-3"
          />

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors text-base"
          >
            {loading ? 'Joining...' : 'Join Game'}
          </button>
        </form>
      </div>
    </div>
  );
}
