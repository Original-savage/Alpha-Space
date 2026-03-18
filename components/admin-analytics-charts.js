"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";

export default function AdminAnalyticsCharts({ topWatched = [], topClicked = [], partnerBreakdown = [] }) {
  const watchedData = topWatched.map((item) => ({
    name: item.name.length > 18 ? item.name.slice(0, 18) + "..." : item.name,
    saves: item.watchlistCount,
  }));
  const clickedData = topClicked.map((item) => ({
    name: item.name.length > 18 ? item.name.slice(0, 18) + "..." : item.name,
    clicks: item.clickCount,
  }));
  const partnerData = partnerBreakdown.map((item) => ({ name: item.partnerName, value: item.clicks }));
  const colors = ["#22d3ee", "#38bdf8", "#818cf8", "#a78bfa", "#f472b6", "#f59e0b"];

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-black">Top Watched Opportunities</h2>
        <div className="mt-6 h-80">
          {watchedData.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 text-slate-400">
              No watchlist data in this range.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={watchedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "12px", color: "#fff" }} />
                <Bar dataKey="saves" fill="#22d3ee" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-black">Top Clicked Opportunities</h2>
        <div className="mt-6 h-80">
          {clickedData.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 text-slate-400">
              No click data in this range.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clickedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "12px", color: "#fff" }} />
                <Bar dataKey="clicks" fill="#818cf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 xl:col-span-2">
        <h2 className="text-2xl font-black">Partner Click Distribution</h2>
        <div className="mt-6 h-[28rem]">
          {partnerData.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 text-slate-400">
              No partner distribution data in this range.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={partnerData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={140} label>
                  {partnerData.map((entry, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "12px", color: "#fff" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </div>
  );
}
