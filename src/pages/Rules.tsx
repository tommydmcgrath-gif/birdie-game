export function Rules() {
  const rules = [
    {
      icon: '9️⃣',
      title: 'Play at least 9 holes',
      description:
        'A birdie only counts if the player played at least 9 holes that day.',
    },
    {
      icon: '🕳️',
      title: 'Putt it out',
      description: 'All putts must be holed out. No gimmes allowed.',
    },
    {
      icon: '🤝',
      title: 'Honor system',
      description:
        'We trust each other. Report your birdies honestly.',
    },
    {
      icon: '🏆',
      title: 'First to 18 wins',
      description:
        'The first player to birdie all 18 holes during the season wins the game.',
    },
  ];

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-5">
        <h2 className="text-lg font-bold text-green-900">Rules</h2>
        <p className="text-xs text-gray-500">
          The Birdie Game at CC of Fairfield
        </p>
      </div>

      <div className="space-y-3">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{rule.icon}</span>
              <div>
                <h3 className="font-semibold text-green-900 text-sm mb-0.5">
                  {rule.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fun footer */}
      <div className="mt-6 text-center">
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-sm text-green-800 font-medium">
            Good luck this season! 🐦⛳
          </p>
          <p className="text-xs text-green-600 mt-1">
            May the birdies be ever in your favor.
          </p>
        </div>
      </div>
    </div>
  );
}
