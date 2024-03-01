import React, { useState, useEffect } from 'react';
import s from './main.module.scss'
const DotsLoader = () => {
    const [dots, setDots] = useState('');
    const [showDots, setShowDots] = useState(true);

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
        }, 500);

        const clearDotsInterval = setTimeout(() => {
            clearInterval(dotsInterval);
            setShowDots(false);
        }, 6000);

        return () => {
            clearInterval(dotsInterval);
            clearTimeout(clearDotsInterval);
        };
    }, []);



    return <div className={s.dots}>Finding collections for you{showDots && dots}</div>;
};

export default DotsLoader;
