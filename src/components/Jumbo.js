import React, { useState, useEffect } from 'react';
import { useTransition, animated, AnimatedProps } from '@react-spring/web';

import styles from './jumbo.css';

function Jumbo() {
    const [jobs, setJobs] = useState([]);
    const [index, setIndex] = useState(0);

    const onClick = () => setIndex((state) => (state + 1) % 3);

    const transitions = useTransition(index, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    });

    useEffect(() => {
        async function getJobs() {
            try {
                const res = await fetch('http://localhost:5000/api/jobs');
                const data = await res.json();
                setJobs(data.data);
            } catch (error) {
                console.log('Error fetching jobs:', error);
            }
        }
        getJobs();
    }, []);


    const pages = [
        ({ style }) => (
            <animated.div style={{ ...style, background: 'lightpink' }}>{jobs[0]?.title}</animated.div>
        ),
        ({ style }) => (
            <animated.div style={{ ...style, background: 'lightblue' }}>{jobs[1]?.title}</animated.div>
        ),
        ({ style }) => (
            <animated.div style={{ ...style, background: 'lightgreen' }}>{jobs[2]?.title}</animated.div>
        ),
    ];

    return (
       <div >
           <div className="container">
                   <div  onClick={onClick}>
                       {transitions((style, i) => {
                           const Page = pages[i];
                           return <Page style={style} />;
                       })}
                   </div>
           </div>
       </div>

    );
}

export default Jumbo;
