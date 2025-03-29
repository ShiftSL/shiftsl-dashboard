// This hook is to dynamically calculate where the event should be positioned.
// The calculated top overrides ScheduleX's default top position.

import { useEffect } from "react";

const adjustEventPositions = () => {
    const eventElements = document.querySelectorAll(".sx__time-grid-event");

    eventElements.forEach((event: any) => {
        const timeText = event.querySelector(".sx__time-grid-event-time")?.textContent;

        if (timeText) {
            // Extract start time (e.g., "7:00 AM – 1:00 PM")
            const startTime = timeText.split("–")[0].trim();

            // Custom function to calculate top offset
            const newTop = calculateCustomTop(startTime);
            event.style.setProperty("--custom-event-top", newTop);
            // Apply new top position
            event.style.top = newTop;
        }
    });
};

// Function to determine custom top position based on time
const calculateCustomTop = (startTime: string): string => {
    const timeMappings: Record<string, string> = {
        "7:00 AM": "0%",  // Example new positions
        "1:00 PM": "33.5%",
        "7:00 PM": "67%"
    };

    return timeMappings[startTime] || "0%"; // Default if time is not mapped
};

const useEventPositionAdjustment = () => {
    useEffect(() => {
        // Observe changes to ScheduleX events
        const observer = new MutationObserver(adjustEventPositions);
        observer.observe(document.body, { childList: true, subtree: true });

        // Initial adjustment
        adjustEventPositions();

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, []);
};

export default useEventPositionAdjustment;
