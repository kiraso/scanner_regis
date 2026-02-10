import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ===== MOCK DATA ===== */
const mockReports = [
  { classLevel: "ม.6/1", date: "2026-02-10" },
  { classLevel: "ม.6/1", date: "2026-02-10" },
  { classLevel: "ม.6/2", date: "2026-02-09" },
  { classLevel: "ม.5/1", date: "2026-02-08" },
  { classLevel: "ม.5/1", date: "2026-02-06" },
  { classLevel: "ม.5/2", date: "2026-02-06" },
];

const Dashboard = () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  /* ===== SUMMARY ===== */
  const totalAll = mockReports.length;
  const totalToday = mockReports.filter(
    (r) => r.date === todayStr
  ).length;

  /* ===== WEEKLY DATA ===== */
  const weeklyMap = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    weeklyMap[d.toISOString().split("T")[0]] = 0;
  }

  mockReports.forEach((r) => {
    if (weeklyMap[r.date] !== undefined) {
      weeklyMap[r.date]++;
    }
  });

  const weeklyData = Object.entries(weeklyMap).map(
    ([date, count]) => ({ date, count })
  );

  /* ===== CLASS DATA ===== */
  const classMap = {};
  mockReports.forEach((r) => {
    classMap[r.classLevel] =
      (classMap[r.classLevel] || 0) + 1;
  });

  const classData = Object.entries(classMap).map(
    ([classLevel, count]) => ({ classLevel, count })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4 sm:px-6 lg:px-10 py-6">
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard รายงานภาพรวม
        </h1>
        <p className="text-slate-500 mt-1">
          สรุปข้อมูลการแจ้งเข้าเรียนจากเครื่องสแกน
        </p>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="rounded-2xl p-5 text-white shadow-lg bg-gradient-to-r from-emerald-400 to-emerald-600">
          <p className="text-sm opacity-80">ทั้งหมด</p>
          <p className="text-4xl font-bold mt-2">{totalAll}</p>
        </div>

        <div className="rounded-2xl p-5 text-white shadow-lg bg-gradient-to-r from-sky-400 to-sky-600">
          <p className="text-sm opacity-80">วันนี้</p>
          <p className="text-4xl font-bold mt-2">{totalToday}</p>
        </div>

        <div className="rounded-2xl p-5 text-white shadow-lg bg-gradient-to-r from-violet-400 to-violet-600">
          <p className="text-sm opacity-80">7 วันย้อนหลัง</p>
          <p className="text-4xl font-bold mt-2">
            {weeklyData.reduce((a, b) => a + b.count, 0)}
          </p>
        </div>
      </div>

      {/* ===== WEEKLY CHART ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          รายงาน 7 วันย้อนหลัง
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={weeklyData}>
              <defs>
                <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="url(#weeklyGradient)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== CLASS CHART ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          สรุปตามชั้น / ห้อง
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={classData}>
              <defs>
                <linearGradient id="classGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="classLevel" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="url(#classGradient)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
