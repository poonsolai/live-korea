import { useEffect, useState } from "react";
import './css/TimeComp.css'

const KoreaTime = () => {
  const [koreaTime, setKoreaTime] = useState({});
  const [localTime, setLocalTime] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      // =========================
      // Korea Time
      // =========================
      const koreaDate = new Date(
        now.toLocaleString("en-US", {
          timeZone: "Asia/Seoul",
        })
      );

      // =========================
      // User Local Time
      // =========================
      const userTimezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;

      const localDate = new Date(
        now.toLocaleString("en-US", {
          timeZone: userTimezone,
        })
      );

      // Reusable formatter
      const formatData = (dateObj) => {
        return {
          time: dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),

          fullDate: dateObj.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),

          day: dateObj.toLocaleDateString("en-US", {
            weekday: "long",
          }),

          month: dateObj.toLocaleDateString("en-US", {
            month: "long",
          }),

          year: dateObj.getFullYear(),
        };
      };

      setKoreaTime(formatData(koreaDate));

      setLocalTime({
        ...formatData(localDate),
        timezone: userTimezone,
      });
    };

    updateTimes();

    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-container">

      {/* Korea Time Card */}
      <div className="time-card korea-card">
        <h2>
          Korea Time 🇰🇷
        </h2>

        <h3>{koreaTime.time}</h3>

        <p>{koreaTime.fullDate}</p>

        <hr />

        <p>
          <strong>Day:</strong> {koreaTime.day}
        </p>

        <p>
          <strong>Month:</strong> {koreaTime.month}
        </p>

        <p>
          <strong>Year:</strong> {koreaTime.year}
        </p>

        <p>
          <strong>Timezone:</strong> KST (Korea Standard Time)
        </p>
      </div>

      {/* Local Time Card */}
      <div className="time-card local-card">
        <h2>
          Your Time 🌍
        </h2>

        <h3>{localTime.time}</h3>

        <p>{localTime.fullDate}</p>

        <hr />

        <p>
          <strong>Day:</strong> {localTime.day}
        </p>

        <p>
          <strong>Month:</strong> {localTime.month}
        </p>

        <p>
          <strong>Year:</strong> {localTime.year}
        </p>

        <p>
          <strong>Timezone:</strong> {localTime.timezone}
        </p>
      </div>

    </div>
  );
};

export default KoreaTime;