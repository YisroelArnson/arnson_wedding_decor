import React from "react";

export default function JobStats({ jobs }) {
  const today = new Date();
  const inSevenDays = new Date();
  inSevenDays.setDate(today.getDate() + 7);

  const totalJobs = jobs.length;
  const upcomingWeek = jobs.filter((j) => {
    const d = new Date(j.date);
    return d >= new Date(today.toDateString()) && d <= inSevenDays;
  }).length;
  const unpaid = jobs.filter((j) => !j.paid).length;
  const invoicesNotSent = jobs.filter((j) => !j.sent_invoice).length;
  const linenNotPickedUp = jobs.filter((j) => !j.linen_picked_up).length;

  const stats = [
    { label: "Total jobs", value: totalJobs },
    { label: "Upcoming (7d)", value: upcomingWeek },
    { label: "Unpaid", value: unpaid },
    { label: "Invoice not sent", value: invoicesNotSent },
    { label: "Linen not picked up", value: linenNotPickedUp },
  ];

  return (
    <div>
      <h2>Job stats</h2>
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


