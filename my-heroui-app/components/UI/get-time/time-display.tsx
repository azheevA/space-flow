"use client";
import { useState, useEffect } from "react";

interface TimeDisplayProps {
  dateString?: string;
  format?: "date" | "datetime" | "relative";
}

export function TimeDisplay({ dateString, format = "date" }: TimeDisplayProps) {
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    if (!dateString) {
      setFormattedTime("Не указано");
      return;
    }

    const date = new Date(dateString);

    switch (format) {
      case "datetime":
        setFormattedTime(
          date.toLocaleString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
        break;
      case "relative":
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          setFormattedTime("Сегодня");
        } else if (diffDays === 1) {
          setFormattedTime("Вчера");
        } else if (diffDays < 7) {
          setFormattedTime(`${diffDays} дней назад`);
        } else if (diffDays < 30) {
          setFormattedTime(`${Math.floor(diffDays / 7)} недель назад`);
        } else {
          setFormattedTime(
            date.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          );
        }
        break;
      default:
        setFormattedTime(
          date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        );
    }
  }, [dateString, format]);

  return <span className="text-white">{formattedTime}</span>;
}
