import React, { useState } from "react";
import { addMinutes, differenceInMinutes, parse, format } from "date-fns";

interface TimeRange {
  start: string;
  end: string;
}

const parseTime = (time: string) => parse(time, "HH:mm", new Date());

const calculateBreakMinutes = (breaks: TimeRange[]) =>
  breaks.reduce((total, b) => {
    if (!b.start || !b.end) return total;
    const start = parseTime(b.start);
    const end = parseTime(b.end);
    return total + differenceInMinutes(end, start);
  }, 0);

const OfficeHoursCalculator: React.FC = () => {
  const [officeHours, setOfficeHours] = useState(8);
  const [startTime, setStartTime] = useState("10:38");

  const [breaks, setBreaks] = useState<TimeRange[]>([
    { start: "13:00", end: "14:00" },
    { start: "17:00", end: "18:00" },
  ]);

  const handleBreakChange = (
    index: number,
    key: keyof TimeRange,
    value: string
  ) => {
    const newBreaks = [...breaks];
    newBreaks[index][key] = value;
    setBreaks(newBreaks);
  };

  const addBreak = () => {
    setBreaks([...breaks, { start: "", end: "" }]);
  };

  const removeBreak = (index: number) => {
    if (index === 0) return; // Prevent removing the required lunch break
    const newBreaks = breaks.filter((_, i) => i !== index);
    setBreaks(newBreaks);
  };

  const totalBreakMins = calculateBreakMinutes(breaks);
  const requiredTimeMins = officeHours * 60;
  const calculatedLeaveTime = format(
    addMinutes(parseTime(startTime), requiredTimeMins + totalBreakMins),
    "hh:mm a"
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white dark:bg-black rounded-2xl shadow-md mt-3 space-y-6">
      <title>Office Hours Calculator</title>
      <div className="text-center bg-blue-100 p-3 rounded-xl text-blue-800 dark:text-white font-semibold text-lg">
        Leave Time: {calculatedLeaveTime}
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-800">
        Office Hours Calculator
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block text-gray-700">
          Office Hours (hrs)
          <input
            type="number"
            className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-1"
            value={officeHours}
            onChange={(e) => setOfficeHours(Number(e.target.value))}
          />
        </label>

        <label className="block text-gray-700">
          Start Time
          <input
            type="time"
            className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-1"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 text-lg mb-3">Breaks</h3>
        {breaks.map((b, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-center"
          >
            <input
              type="time"
              className="rounded-sm border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-1"
              value={b.start}
              onChange={(e) => handleBreakChange(i, "start", e.target.value)}
              required={i === 0}
            />
            <input
              type="time"
              className="rounded-sm border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-1"
              value={b.end}
              onChange={(e) => handleBreakChange(i, "end", e.target.value)}
              required={i === 0}
            />
            {i > 0 && (
              <button
                onClick={() => removeBreak(i)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addBreak}
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          + Add Break
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl space-y-2 text-gray-800">
        <div>
          <strong>Total Break:</strong> {totalBreakMins} mins
        </div>
        <div>
          <strong>Required Time:</strong> {requiredTimeMins} mins
        </div>
        <div>
          <strong>Calculated Leave Time:</strong> {calculatedLeaveTime}
        </div>
      </div>
    </div>
  );
};

export default OfficeHoursCalculator;
