import React, {useEffect, useState} from 'react';
import './NewsTicker.css';

const defulatNews = [

    {
        "source": {
            "id": "engadget",
            "name": "Engadget"
        },
        "author": null,
        "title": "Blink's Outdoor 4 security camera offers sharper video day and night - Engadget",
        "description": "It adds person detection to the wire-free model..",
        "url": "https://www.engadget.com/blinks-outdoor-4-security-camera-offers-sharper-video-day-and-night-140100728.html",
        "urlToImage": "https://s.yimg.com/uu/api/res/1.2/456.A.IkACMFr3LjqVZgSQ--~B/Zmk9ZmlsbDtoPTYzMDtweW9mZj0wO3c9MTIwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2023-08/705e91a0-40dd-11ee-92ff-ea725247a4d8.cf.jpg",
        "publishedAt": "2023-08-24T14:00:47Z",
        "content": "Blink is today announcing its latest external security camera, the Blink Outdoor 4, which boasts better image quality, improved low-light sensitivity and a wider field of view. For the quality claims… [+1383 chars]"
    },
    {
        "source": {
            "id": "the-verge",
            "name": "The Verge"
        },
        "author": "Tom Warren",
        "title": "As one Destiny 2 saga ends, Bungie prepares for the future - The Verge",
        "description": "Destiny 2: The Final Shape arrives in February to mark a closure of the light and darkness saga. Bungie is now looking at the future of Destiny.",
        "url": "https://www.theverge.com/23844068/destiny-2-the-final-shape-joe-blackburn-interview",
        "urlToImage": "https://cdn.vox-cdn.com/thumbor/nCbPVRPxiSUj5hf2zvPw61b9Ck0=/0x0:3840x2160/1200x628/filters:focal(1920x1080:1921x1081)/cdn.vox-cdn.com/uploads/chorus_asset/file/24870278/2023_Final_Shape_Reveal_Press_Kit_Standard_Key_Art_16x9.jpg",
        "publishedAt": "2023-08-24T14:00:01Z",
        "content": "As one Destiny 2 saga ends, Bungie prepares for the future As one Destiny 2 saga ends, Bungie prepares for the future\r\n / We sat down with game director Joe Blackburn to talk about the future of the… [+10244 chars]"
    }]


const fetchArticles = async () => {
    const response = await fetch('https://newsapi-fn68.onrender.com/news');
    const data = await response.json();
    if (data.articles.length === 0) return defulatNews;
    return data.articles;
};

const useNewsTicker = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles().then(articles => setArticles(articles));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(currentIndex => (currentIndex + 1) % articles.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [articles]);

    return {articles, currentIndex};
};

const NewsTicker = () => {
    const {articles, currentIndex} = useNewsTicker();

    return (
        <div className="news-ticker-container">
            <div className="news-ticker">
                {articles.map((headline, index) => (
                    <div
                        key={index}
                        className={`ticker-item ${index === currentIndex ? 'active' : ''}`}>
                        <a className="myLinkStyle" href={headline.url} target="_blank" rel="noreferrer">
                            {`${headline.source.name}: ${headline.title.replace(` - ${headline.source.name}`, '')}`}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsTicker;