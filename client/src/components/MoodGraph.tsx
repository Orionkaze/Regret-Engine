import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodPoint {
  label: string;
  vibes: number;
}

interface Props {
  data: MoodPoint[];
}

export function MoodGraph({ data }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-card p-6 mt-6 w-full max-w-[800px] mx-auto opacity-0 animate-[fadeIn_300ms_ease-out_2000ms_forwards]">
      <div className="w-full h-[180px] md:h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={true} vertical={false} stroke="#2D2D44" strokeDasharray="4 4" />
            <XAxis 
              dataKey="label" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              axisLine={{ stroke: '#2D2D44' }} 
              tickLine={false} 
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip 
              contentStyle={{ background: '#1A1A2E', border: '1px solid #2D2D44', borderRadius: '8px', padding: '8px 12px' }}
              itemStyle={{ color: '#A78BFA' }}
              labelStyle={{ color: '#F8F8F2', marginBottom: '4px' }}
              formatter={(value) => [`${value} / 100`, 'Vibes']}
            />
            <Line 
              type="monotone" 
              dataKey="vibes" 
              stroke="url(#moodGradient)" 
              strokeWidth={2.5} 
              dot={{ fill: '#A78BFA', r: 4, strokeWidth: 0 }} 
              activeDot={{ r: 6, fill: '#EF4444' }} 
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
