import { useTimeline } from '../context/TimelineContext';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const TYPE_COLORS = {
  Call: '#1e4d3b',
  Text: '#7c3aed',
  Video: '#16a34a',
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex items-center justify-center gap-5 mt-2">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-sm text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function StatsPage() {
  const { timeline } = useTimeline();

  const counts = timeline.reduce(
    (acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    },
    { Call: 0, Text: 0, Video: 0 }
  );

  const pieData = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  // Fallback seed data if no interactions logged yet
  const displayData = pieData.length > 0
    ? pieData
    : [
        { name: 'Text', value: 2 },
        { name: 'Call', value: 3 },
        { name: 'Video', value: 2 },
      ];

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Friendship Analytics</h1>

        {/* Single chart card — matches Figma exactly */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <p className="text-sm font-medium text-gray-700 mb-2">By Interaction Type</p>

          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayData}
                  cx="50%"
                  cy="48%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {displayData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={TYPE_COLORS[entry.name] || '#94a3b8'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '13px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                  formatter={(value, name) => [value, name]}
                />
                <Legend content={renderLegend} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
