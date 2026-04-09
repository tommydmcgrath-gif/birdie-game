import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  fetchPlayer,
  completeHole,
  updateHoleDate,
  uncompleteHole,
  type PlayerWithProgress,
  type PlayerHole,
} from '../lib/supabase';
import { COURSE_DATA, TOTAL_HOLES } from '../lib/courseData';
import { HoleModal } from '../components/HoleModal';

export function PunchCard() {
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<PlayerWithProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedHole, setSelectedHole] = useState<number | null>(null);
  const [celebratingHole, setCelebratingHole] = useState<number | null>(null);

  const loadPlayer = useCallback(async () => {
    if (!playerId) return;
    try {
      const p = await fetchPlayer(playerId);
      setPlayer(p);
    } catch (err) {
      console.error('Failed to load player:', err);
    } finally {
      setLoading(false);
    }
  }, [playerId]);

  useEffect(() => {
    loadPlayer();
  }, [loadPlayer]);

  function getCompletion(holeNumber: number): PlayerHole | null {
    return (
      player?.completed_holes.find((h) => h.hole_number === holeNumber) ?? null
    );
  }

  async function handleComplete(date: string) {
    if (!playerId || !selectedHole) return;
    await completeHole(playerId, selectedHole, date);
    setCelebratingHole(selectedHole);
    setSelectedHole(null);
    await loadPlayer();
    setTimeout(() => setCelebratingHole(null), 600);
  }

  async function handleUpdateDate(id: string, date: string) {
    await updateHoleDate(id, date);
    setSelectedHole(null);
    await loadPlayer();
  }

  async function handleUncomplete(id: string) {
    await uncompleteHole(id);
    setSelectedHole(null);
    await loadPlayer();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Player not found</p>
        <Link to="/" className="text-green-700 font-medium">
          Back to Leaderboard
        </Link>
      </div>
    );
  }

  const completedCount = player.completed_count;
  const pct = Math.round((completedCount / TOTAL_HOLES) * 100);
  const isComplete = completedCount === TOTAL_HOLES;

  return (
    <div className="animate-fade-in-up">
      {/* Player header */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold text-green-900">
              {player.name}
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Punch Card</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-800">
              {completedCount}
              <span className="text-sm font-normal text-gray-400">
                /{TOTAL_HOLES}
              </span>
            </div>
            <div className="text-xs text-gray-400">{pct}%</div>
          </div>
        </div>

        {/* Full progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              isComplete ? 'bg-gold-500' : 'bg-green-600'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Punch card grid */}
      <div className="grid grid-cols-3 gap-2">
        {COURSE_DATA.map((hole) => {
          const completion = getCompletion(hole.number);
          const isCompleted = !!completion;
          const isCelebrating = celebratingHole === hole.number;

          return (
            <button
              key={hole.number}
              onClick={() => setSelectedHole(hole.number)}
              className={`relative rounded-lg p-3 text-left transition-all active:scale-95 ${
                isCelebrating ? 'animate-punch-celebrate' : ''
              } ${
                isCompleted
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-400'
              }`}
            >
              {/* Hole number */}
              <div
                className={`text-lg font-bold leading-none mb-0.5 ${
                  isCompleted ? 'text-white' : 'text-green-900'
                }`}
              >
                {hole.number}
              </div>

              {/* Hole info */}
              <div
                className={`text-[10px] leading-tight ${
                  isCompleted ? 'text-green-200' : 'text-gray-400'
                }`}
              >
                {hole.yards}y &middot; P{hole.par}
              </div>

              {/* Completion indicator */}
              {isCompleted ? (
                <div className="mt-1.5 flex items-center justify-between">
                  <div className="text-[10px] text-green-200 leading-tight">
                    {format(
                      new Date(completion.completed_at + 'T00:00:00'),
                      'M/d'
                    )}
                  </div>
                  <div className="text-[10px] font-semibold text-green-200">
                    &#10003;
                  </div>
                </div>
              ) : (
                <div className="mt-1.5">
                  <div className="w-4 h-4 rounded-full border border-gray-300" />
                </div>
              )}

              {/* Celebration */}
              {isCelebrating && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-lg animate-confetti-pop font-bold text-green-300">
                    &#10003;
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Back link */}
      <div className="mt-5 text-center">
        <Link
          to="/"
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          &#8592; Leaderboard
        </Link>
      </div>

      {/* Hole modal */}
      {selectedHole !== null && (
        <HoleModal
          hole={COURSE_DATA[selectedHole - 1]}
          completion={getCompletion(selectedHole)}
          onComplete={handleComplete}
          onUpdateDate={handleUpdateDate}
          onUncomplete={handleUncomplete}
          onClose={() => setSelectedHole(null)}
        />
      )}
    </div>
  );
}
