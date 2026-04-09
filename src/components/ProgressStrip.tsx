import type { PlayerHole } from '../lib/supabase';

interface Props {
  completedHoles: PlayerHole[];
  size?: 'sm' | 'md';
}

export function ProgressStrip({ completedHoles, size = 'sm' }: Props) {
  const completedSet = new Set(completedHoles.map((h) => h.hole_number));
  const dotSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="flex gap-[3px] flex-wrap">
      {Array.from({ length: 18 }, (_, i) => i + 1).map((hole) => (
        <div
          key={hole}
          className={`${dotSize} rounded-sm ${
            completedSet.has(hole)
              ? 'bg-green-500'
              : 'bg-gray-200'
          }`}
          title={`Hole ${hole}`}
        />
      ))}
    </div>
  );
}
