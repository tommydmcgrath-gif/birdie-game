import { useState } from 'react';
import { format } from 'date-fns';
import type { PlayerHole } from '../lib/supabase';
import type { HoleData } from '../lib/courseData';

interface Props {
  hole: HoleData;
  completion: PlayerHole | null;
  onComplete: (date: string) => Promise<void>;
  onUpdateDate: (id: string, date: string) => Promise<void>;
  onUncomplete: (id: string) => Promise<void>;
  onClose: () => void;
}

export function HoleModal({
  hole,
  completion,
  onComplete,
  onUpdateDate,
  onUncomplete,
  onClose,
}: Props) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState(
    completion ? completion.completed_at : today
  );
  const [loading, setLoading] = useState(false);

  async function handleComplete() {
    setLoading(true);
    try {
      await onComplete(date);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    if (!completion) return;
    setLoading(true);
    try {
      await onUpdateDate(completion.id, date);
    } finally {
      setLoading(false);
    }
  }

  async function handleUncomplete() {
    if (!completion) return;
    setLoading(true);
    try {
      await onUncomplete(completion.id);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Drawer */}
      <div
        className="relative w-full max-w-lg bg-white rounded-t-2xl shadow-2xl animate-slide-up safe-area-pb"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          {/* Handle */}
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

          {/* Hole info */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-green-900">
                Hole {hole.number}
              </h3>
              <p className="text-sm text-gray-500">
                {hole.yards} yds &middot; Par {hole.par} &middot; SI {hole.stroke_index}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                completion
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300'
              }`}
            >
              {completion ? '✓' : hole.number}
            </div>
          </div>

          {/* Date picker */}
          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700 mb-1 block">
              {completion ? 'Completion date' : 'Date birdie was made'}
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={today}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </label>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {completion ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={loading || date === completion.completed_at}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? 'Saving...' : 'Update Date'}
                </button>
                <button
                  onClick={handleUncomplete}
                  disabled={loading}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? 'Removing...' : 'Remove Birdie'}
                </button>
              </>
            ) : (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-lg"
              >
                {loading ? 'Saving...' : 'Punch It! 🐦'}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
