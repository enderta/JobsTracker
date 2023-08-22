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
    const [newsHeadlines, setNewsHeadlines] = useState([])

    const getNewsHeadlines = async () => {
        const response = await fetch('https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=895b50e9e60744729f4308b9e8ff9aae');
        const data = await response.json();
        const headlines = data.articles;
        setNewsHeadlines(headlines);
    }
    console.log(newsHeadlines)


    useEffect(() => {
        getNewsHeadlines();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(currentIndex => (currentIndex + 1) % newsHeadlines.length);
        }, 8000);  // Displays next news after 6 seconds
        return () => clearInterval(interval);
    }, [newsHeadlines.length]);


    return (
        <div className="news-ticker-container">
            <div className="news-ticker">
                {newsHeadlines.map((headline, index) => (
                    <div
                        key={index}
                        className={`ticker-item ${index === currentIndex ? 'active' : ''}`}
                    >
                        <a className="myLinkStyle" href={headline.url} target="_blank" rel="noreferrer">
                            {`${headline.source.Name}: ${headline.title.replace(` - ${headline.source.Name}`, '')}`}
                        </a>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsTicker;