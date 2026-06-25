import { useEffect, useState } from "react";
import { Log } from "../middleware/Logger";

const API = import.meta.env.VITE_NOTIFICATION_API;
const TOKEN = import.meta.env.VITE_TOKEN;

function Display() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    Log("frontend", "info", "component", "Opening notification page");

    try {
      const response = await fetch(API, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch notifications");
      }

      const data = await response.json();

      Log("frontend", "info", "api", "Notifications fetched");

      const priority = {
        Placement: 3,
        Result: 2,
        Event: 1,
      };

      const sortedNotifications = data.notifications
        .sort((a, b) => {
          if (priority[a.Type] !== priority[b.Type]) {
            return priority[b.Type] - priority[a.Type];
          }

          return new Date(b.Timestamp) - new Date(a.Timestamp);
        })
        .slice(0, 10);

      setNotifications(sortedNotifications);

      Log("frontend", "info", "state", "Notifications displayed");
    } catch (error) {
      console.log(error);
      Log("frontend", "error", "api", error.message);
    }
  };

  return (
  <div
    style={{
      padding: "10px",
      background: "#1e1e1e",
      color: "white",
      borderRadius: "5px",
    }}
  >
    <h3 style={{ marginBottom: "10px" }}>Top 10 Notifications</h3>

    {notifications.length === 0 ? (
      <p>No notifications found.</p>
    ) : (
      notifications.map((item, index) => (
        <div
          key={item.ID}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 0",
            borderBottom: "1px solid #444",
            fontSize: "14px",
            flexWrap: "wrap",
          }}
        >
          <span>
            <b>{index + 1}.</b>
          </span>

          <span>
            <b>{item.Type}</b>
          </span>

          <span style={{ flex: 1 }}>
            {item.Message}
          </span>

          <span style={{ color: "#bbb", fontSize: "12px" }}>
            {item.Timestamp}
          </span>
        </div>
      ))
    )}
  </div>
);
}

export default Display;