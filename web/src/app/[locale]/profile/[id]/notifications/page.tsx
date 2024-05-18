"use client";
import useUser from "@/shared/hooks/use-user";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
  sentAt: Date;
}

const Page = () => {
  const { user, loading } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [failedConnections, setFailedConnections] = useState(0);
  const [shouldFetchNotifications, setShouldFetchNotifications] =
    useState(true);

  useEffect(() => {
    if (!user?.id || !shouldFetchNotifications) return;

    const socket = io("notifications-api.titanproject.top", {
      auth: { userId: user.id },
    });
    // const socket = io("http://localhost:4005", {
    //   auth: { userId: user.id },
    // });

    socket.on("connect", () => {
      console.log("WebSocket connection established");
      setFailedConnections(0);
    });

    socket.on("connect_error", () => {
      setFailedConnections((prevCount) => prevCount + 1);
      if (failedConnections >= 2) {
        setShouldFetchNotifications(false);
      }
    });

    socket.on("notifications", (newNotifications) => {
      if (newNotifications.length !== notifications.length) {
        setNotifications(newNotifications);
      }
    });

    console.log(!notifications);

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("notifications");
    };
  }, [user, failedConnections, shouldFetchNotifications]);

  if (loading) {
    return "Loading...";
  }

  if (!user?.id) {
    return null;
  }

  return (
    <div className="overflow-y-auto w-full h-auto">
      <div>
        {!shouldFetchNotifications && (
          <p>
            Failed to connect to the server after 3 attempts. Notifications will
            not be fetched.
          </p>
        )}
        {notifications.length <= 0 && (
          <div className="w-full h-[calc(100vh_-_58px)] flex flex-col items-center justify-center gap-2 text-lg">
            <Bell width={50} height={50}/>
            <h1>Здесь будут ваши уведомления</h1>
          </div>
        )}
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <h3>{notification.title}</h3>
              <p>{notification.body}</p>
              <p>{notification.createdAt.toLocaleString()}</p>
              {notification.link && <a href={notification.link}>Link</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
