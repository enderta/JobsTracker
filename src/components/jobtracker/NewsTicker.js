import React, {useEffect, useState} from 'react';
import './NewsTicker.css'; // Import the CSS file for styling

const newsHeadlines = [
    "Breaking News: New discovery in space!",
    "Economy grows by 3% in the last quarter.",
    "Health officials issue new COVID-19 guidelines.",
    // Add more news headlines here
];

const NewsTicker = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const tickerInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % newsHeadlines.length);
        }, 3000); // Change this value to adjust the ticker speed (in milliseconds)

        return () => {
            clearInterval(tickerInterval);
        };
    }, []);

    return (
        <div className="news-ticker-container">
            <div className="news-ticker">
                {newsHeadlines.map((headline, index) => (
                    <div
                        key={index}
                        className={`ticker-item ${index === currentIndex ? 'active' : ''}`}
                    >
                        {headline}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsTicker;
