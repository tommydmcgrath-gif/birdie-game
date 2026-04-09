export function Rules() {
  const rules = [
    {
      title: 'Season',
      description:
        'The season runs during the GHIN handicap active season: April 1 through November 14.',
    },
    {
      title: 'Eligible Tees',
      description: 'Players must be playing from the Blue or Black tees.',
    },
    {
      title: 'Minimum Holes',
      description:
        'A birdie or eagle only counts if the player played at least 9 holes that day.',
    },
    {
      title: 'Playing Partner Required',
      description:
        'You must be playing with at least one other participant for it to count.',
    },
    {
      title: 'Putt It Out',
      description: 'All putts must be holed out. No gimmes.',
    },
    {
      title: 'Eagles Count',
      description: 'An eagle (or better) can close out a hole in place of a birdie.',
    },
    {
      title: 'Winner',
      description:
        'Winner is the first person to close out all 18 holes. If there is no winner at the end of the season, the game carries over to the next season.',
    },
    {
      title: 'Stakes',
      description:
        'The losing participants buy dinner at the club for the winner.',
    },
  ];

  return (
    <div className="animate-fade-in-up">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-green-900">Rules</h2>
        <p className="text-xs text-gray-500">
          CCF Birdie Game
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {rules.map((rule, idx) => (
          <div key={idx} className="px-4 py-3.5">
            <h3 className="font-semibold text-green-900 text-sm mb-0.5">
              {rule.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {rule.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
