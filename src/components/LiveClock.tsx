"use client";

import { useState, useEffect } from 'react';

export default function LiveClock() {
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) {
        return <span>--:--:--</span>;
    }

    return (
        <span suppressHydrationWarning>
            {time.toLocaleTimeString([], { hour12: false })}
        </span>
    );
}
