import { LineChart as RLineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from "recharts";

// A single reusable chart: pass `mini` for a compact sparkline (used inside
// sensor cards) or omit it for a full-size chart with axes (Water Quality page).
export default function LineChart({ data, color = "#2bc4e0", mini = false, height = 60 }) {
  return (
    <ResponsiveContainer width="100%" height={mini ? height : 220}>
      <RLineChart data={data} margin={mini ? { top: 2, right: 0, bottom: 0, left: 0 } : { top: 8, right: 8, bottom: 0, left: -20 }}>
        {!mini && <XAxis dataKey="time" stroke="#3a5578" tick={{ fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#1c3454" }} />}
        {!mini && <YAxis stroke="#3a5578" tick={{ fontSize: 11 }} tickLine={false} axisLine={{ stroke: "#1c3454" }} />}
        {!mini && (
          <Tooltip
            contentStyle={{ background: "#0f2038", border: "1px solid #1c3454", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#8fa8c9" }}
          />
        )}
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
      </RLineChart>
    </ResponsiveContainer>
  );
}