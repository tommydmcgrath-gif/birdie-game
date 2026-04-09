import { COURSE_DATA, COURSE_NAME, COURSE_PAR, COURSE_YARDS } from '../lib/courseData';

export function CourseInfo() {
  const front9 = COURSE_DATA.slice(0, 9);
  const back9 = COURSE_DATA.slice(9);
  const front9Par = front9.reduce((s, h) => s + h.par, 0);
  const back9Par = back9.reduce((s, h) => s + h.par, 0);
  const front9Yards = front9.reduce((s, h) => s + h.yards, 0);
  const back9Yards = back9.reduce((s, h) => s + h.yards, 0);

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-green-900">{COURSE_NAME}</h2>
        <p className="text-xs text-gray-500">
          {COURSE_YARDS} yards &middot; Par {COURSE_PAR}
        </p>
      </div>

      {/* Scorecard table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-900 text-white text-xs">
              <th className="py-2 px-2 text-left font-semibold">Hole</th>
              <th className="py-2 px-2 text-right font-semibold">Yards</th>
              <th className="py-2 px-2 text-right font-semibold">Par</th>
              <th className="py-2 px-2 text-right font-semibold">SI</th>
            </tr>
          </thead>
          <tbody>
            {front9.map((hole) => (
              <tr
                key={hole.number}
                className="border-t border-gray-50 hover:bg-green-50/50"
              >
                <td className="py-2 px-2 font-semibold text-green-900">
                  {hole.number}
                </td>
                <td className="py-2 px-2 text-right text-gray-600">
                  {hole.yards}
                </td>
                <td className="py-2 px-2 text-right font-medium">
                  {hole.par}
                </td>
                <td className="py-2 px-2 text-right text-gray-400">
                  {hole.stroke_index}
                </td>
              </tr>
            ))}
            {/* Front 9 totals */}
            <tr className="bg-green-50 border-t border-green-200">
              <td className="py-2 px-2 font-bold text-green-800 text-xs">
                OUT
              </td>
              <td className="py-2 px-2 text-right font-bold text-green-800 text-xs">
                {front9Yards}
              </td>
              <td className="py-2 px-2 text-right font-bold text-green-800 text-xs">
                {front9Par}
              </td>
              <td className="py-2 px-2" />
            </tr>

            {back9.map((hole) => (
              <tr
                key={hole.number}
                className="border-t border-gray-50 hover:bg-green-50/50"
              >
                <td className="py-2 px-2 font-semibold text-green-900">
                  {hole.number}
                </td>
                <td className="py-2 px-2 text-right text-gray-600">
                  {hole.yards}
                </td>
                <td className="py-2 px-2 text-right font-medium">
                  {hole.par}
                </td>
                <td className="py-2 px-2 text-right text-gray-400">
                  {hole.stroke_index}
                </td>
              </tr>
            ))}
            {/* Back 9 totals */}
            <tr className="bg-green-50 border-t border-green-200">
              <td className="py-2 px-2 font-bold text-green-800 text-xs">
                IN
              </td>
              <td className="py-2 px-2 text-right font-bold text-green-800 text-xs">
                {back9Yards}
              </td>
              <td className="py-2 px-2 text-right font-bold text-green-800 text-xs">
                {back9Par}
              </td>
              <td className="py-2 px-2" />
            </tr>

            {/* Total */}
            <tr className="bg-green-900 text-white">
              <td className="py-2.5 px-2 font-bold text-xs">TOTAL</td>
              <td className="py-2.5 px-2 text-right font-bold text-xs">
                {COURSE_YARDS}
              </td>
              <td className="py-2.5 px-2 text-right font-bold text-xs">
                {COURSE_PAR}
              </td>
              <td className="py-2.5 px-2" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
