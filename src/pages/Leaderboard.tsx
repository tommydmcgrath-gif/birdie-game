import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchPlayers,
  fetchRecentPunches,
  type PlayerWithProgress,
  type PlayerHole,
} from '../lib/supabase';
import { TOTAL_HOLES } from '../lib/courseData';
import { ProgressStrip } from '../components/ProgressStrip';
import { format } from 'date-fns';

export function Leaderboard() {
  const [players, setPlayers] = useState<PlayerWithProgress[]>([]);
  const [recentPunches, setRecentPunches] = useState<
    (PlayerHole & { player_name: string })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [p, r] = await Promise.all([
        fetchPlayers(),
        fetchRecentPunches(8),
      ]);
      p.sort((a, b) => b.completed_count - a.completed_count);
      setPlayers(p);
      setRecentPunches(r);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Season header */}
      <div className="text-center mb-5">
        <h2 className="text-lg font-bold text-green-900">
          2026 Season Leaderboard
        </h2>
        <p className="text-xs text-gray-500">
          First to birdie all 18 holes wins
        </p>
      </div>

      {/* Players list */}
      {players.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
          <p className="text-4xl mb-3">🐦</p>
          <p className="text-gray-600 font-medium mb-1">No players yet</p>
          <p className="text-sm text-gray-400 mb-4">
            Be the first to join the birdie game!
          </p>
          <Link
            to="/join"
            className="inline-block bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors"
          >
            Join Now
          </Link>
        </div>
      ) : (
        <div className="space-y-2 mb-6">
          {players.map((player, idx) => {
            const pct = Math.round(
              (player.completed_count / TOTAL_HOLES) * 100
            );
            const remaining = TOTAL_HOLES - player.completed_count;
            const isComplete = player.completed_count === TOTAL_HOLES;

            return (
              <Link
                key={player.id}
                to={`/player/${player.id}`}
                className="block bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  {/* Rank */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      idx === 0
                        ? 'bg-gold-500 text-white'
                        : idx === 1
                        ? 'bg-gray-300 text-gray-700'
                        : idx === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-green-900 truncate">
                        {player.name}
                        {isComplete && ' 🏆'}
                      </span>
                      <span className="text-sm font-bold text-green-700 ml-2 shrink-0">
                        {player.completed_count}/{TOTAL_HOLES}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-1.5">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isComplete ? 'bg-gold-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <ProgressStrip completedHoles={player.completed_holes} />
                      <span className="text-[10px] text-gray-400 ml-2 shrink-0">
                        {remaining > 0
                          ? `${remaining} remaining`
                          : 'COMPLETE!'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Recent punches */}
      {recentPunches.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Recent Birdies
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            {recentPunches.map((punch) => (
              <div
                key={punch.id}
                className="flex items-center justify-between px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {punch.hole_number}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {punch.player_name}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {format(new Date(punch.completed_at + 'T00:00:00'), 'MMM d')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
