import React, { useEffect, useState } from 'react';

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem', marginRight: '20px', letterSpacing: '1px' }}>
            {time.toLocaleTimeString()}
        </div>
    );
} 