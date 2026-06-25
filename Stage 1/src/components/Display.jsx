import React, { useEffect, useState } from "react";
import { Log } from "../middlewear/Logger";

const API=import.meta.env.VITE_NOTIFICATION_API;
const TOKEN=import.meta.env.VITE_TOKEN;

const Display = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Log("frontend", "info", "component", "Display loaded");
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      Log("frontend", "info", "api", "Fetching notifications");

      const response = await fetch(API, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();

      Log("frontend", "info", "api", "Notifications received");

      const weight = {
        Placement: 3,
        Result: 2,
        Event: 1,
      };

      Log("frontend", "info", "component", "Sorting notifications");

      const top10 = data.notifications
        .sort((a, b) => {
          if (weight[a.Type] !== weight[b.Type]) {
            return weight[b.Type] - weight[a.Type];
          }

          return new Date(b.Timestamp) - new Date(a.Timestamp);
        })
        .slice(0, 10);

      setNotifications(top10);

      Log("frontend", "info", "state", "Top 10 notifications displayed");
    } catch (error) {
      Log("frontend", "error", "api", error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Top 10 Notifications</h2>

      {notifications.map((item, index) => (
        <div
          key={item.ID}
          style={{
            border: "1px solid #ddd",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>
            {index + 1}. {item.Type}
          </h3>

          <p>{item.Message}</p>

          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
};

export default Display;