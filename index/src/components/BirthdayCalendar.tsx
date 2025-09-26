"use client";

import { useState } from "react";
import { Person } from "@/types/birthday";

const colors = ["#545D79", "#8AB721", "#C77D99", "#78CAE3", "#E64A33"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  initialPeople: Person[];
}

export default function BirthdayCalendar({ initialPeople }: Props) {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(initialPeople, null, 2)
  );
  const [people, setPeople] = useState<Person[]>(initialPeople);

  // Handle JSON change input files
  const handleJsonChange = (val: string) => {
    setJsonInput(val);
    try {
      const parsed: Person[] = JSON.parse(val);
      setPeople(parsed);
    } catch (e) {
      console.error("Invalid JSON", e);
    }
  };

  // Group birthdays into 7 days
  const grouped: Person[][] = Array.from({ length: 7 }, () => []);

  people.forEach((p) => {
    const [y, m, d] = p.birthday.split("-");
    const date = new Date(year, parseInt(m) - 1, parseInt(d));
    const day = date.getDay();
    grouped[day].push(p);
  });

  // Sort youngest → oldest
  grouped.forEach((list) =>
    list.sort((a, b) => new Date(b.birthday).getTime() - new Date(a.birthday).getTime())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div>
          <label className="mr-2 font-semibold">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from(
              { length: new Date().getFullYear() - 1999 },
              (_, i) => 2000 + i
            ).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* JSON Input */}
        <textarea
          value={jsonInput}
          onChange={(e) => handleJsonChange(e.target.value)}
          className="border rounded p-2 font-mono text-sm w-full sm:w-[400px] h-[250px]"
        />
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, idx) => (
          <div
            key={day}
            className={`border rounded-lg p-2 min-h-[140px] flex flex-col ${
              grouped[idx].length === 0
                ? "bg-gray-100 text-gray-400"
                : "bg-white"
            }`}
          >
            <h4 className="text-center font-semibold mb-2">{day}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 flex-1">
              {grouped[idx].map((p, i) => (
                <div
                  key={p.name}
                  title={p.name}
                  className="relative w-full pt-[100%] rounded-md text-xs text-white font-bold flex items-center justify-center"
                  style={{ backgroundColor: colors[i % colors.length] }}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
