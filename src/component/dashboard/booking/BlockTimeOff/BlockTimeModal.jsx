import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

const BlockedTimeModal = ({ isOpen, onClose, onAdd }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]); // Already supports multiple selections
  const [title, setTitle] = useState("");
  const [teamMember, setTeamMember] = useState("ALL TEAM MEMBER");
  const [frequency, setFrequency] = useState("DOESN'T REPEAT");
  const [description, setDescription] = useState("");
  const [blockDay, setBlockDay] = useState(false);

  if (!isOpen) return null;

  // Generate time slots from 9AM to 10PM with 30min intervals
  const generateTimeSlots = () => {
    const times = [];
    let hour = 9; // Start at 9 AM
    let minute = 0;

    while (hour < 22 || (hour === 22 && minute === 0)) { // End at 10 PM
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      times.push(`${displayHour}:${minute.toString().padStart(2, "0")}${period}`);
      minute += 30;
      if (minute >= 60) {
        hour++;
        minute = 0;
      }
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  // Updated handleDateChange to toggle multiple individual dates
  const handleDateChange = (date) => {
    setSelectedDates((prev) =>
      prev.some((d) => d.toDateString() === date.toDateString())
        ? prev.filter((d) => d.toDateString() !== date.toDateString()) // Remove if already selected
        : [...prev, date] // Add if not selected
    );
  };

  const handleTimeToggle = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time]
    );
  };

  // Updated formatSelectedDates to handle multiple individual dates
  const formatSelectedDates = () => {
    if (!selectedDates || selectedDates.length === 0) return "Not Set";
    if (selectedDates.length === 1) {
      return format(selectedDates[0], "MMM do");
    }
    return selectedDates.map((date) => format(date, "MMM do")).join(", ");
  };

  const handleAddBlockTime = async () => {
    const newBlockedTime = {
      title: title || "Untitled",
      duration: blockDay ? "All Day" : "1 Hour",
      dates: selectedDates.map((date) => format(date, "yyyy-MM-dd")),
      times: blockDay ? ["All Day"] : selectedTimes,
      teamMember,
      frequency,
      description,
    };

    try {
      const response = await fetch("/api/blocked-times", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlockedTime),
      });

      if (response.ok) {
        onAdd(newBlockedTime);
        onClose();
      } else {
        console.error("Failed to save blocked time");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-md">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-primary3">Add blocked time</h2>
          <button onClick={onClose} className="text-black text-xl">×</button>
        </div>

        <p className="text-sm text-gray-500 mb-4">Select dates and times to block off</p>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Calendar
              onChange={handleDateChange}
              value={null} // No single "value" since we manage multiple dates manually
              className="border-none text-sm w-full"
              tileClassName={({ date }) =>
                selectedDates.some((d) => d.toDateString() === date.toDateString())
                  ? "bg-primary3 text-white rounded-full"
                  : "hover:bg-gray-200 rounded-full"
              }
            />

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time(s)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeToggle(time)}
                    disabled={blockDay}
                    className={`p-2 rounded-lg border text-sm ${
                      selectedTimes.includes(time) && !blockDay
                        ? "bg-primary3 text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    } ${blockDay ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                checked={blockDay}
                onChange={() => setBlockDay(!blockDay)}
                className="mr-2"
                id="blockDay"
              />
              <label htmlFor="blockDay" className="text-sm text-gray-600">
                Block the day
              </label>
            </div>
          </div>

          <div className="flex-1 space-y-10">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="teamMember" className="block text-sm font-medium text-gray-700 mb-1">
                Team Member
              </label>
              <select
                id="teamMember"
                value={teamMember}
                onChange={(e) => setTeamMember(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option>ALL TEAM MEMBER</option>
                <option>Team Member 1</option>
                <option>Team Member 2</option>
              </select>
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option>DOESN'T REPEAT</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-lg h-24"
              />
            </div>

            <button
              onClick={handleAddBlockTime}
              className="w-full bg-primary3 text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Add Block Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedTimeModal;