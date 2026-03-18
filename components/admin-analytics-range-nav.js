import Link from "next/link";

const ranges = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
  { label: "All Time", value: "all" },
];

export default function AdminAnalyticsRangeNav({ currentRange = "30d" }) {
  return (
    <div className="flex flex-wrap gap-3">
      {ranges.map((range) => {
        const active = currentRange === range.value;
        return (
          <Link key={range.value} href={`/admin/analytics?range=${range.value}`}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              active ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/5 text-white"
            }`}>
            {range.label}
          </Link>
        );
      })}
    </div>
  );
}
