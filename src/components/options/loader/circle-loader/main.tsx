import { useState, useEffect } from 'react';
import s from './main.module.scss'; // Create this CSS file

const CircleLoader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Увеличиваем прогресс каждую секунду
            setProgress((prevProgress) => prevProgress + 0.5);
        }, 50);

        // Остановка интервала через 5 секунд
        setTimeout(() => {
            clearInterval(interval);
        }, 5000);
    }, []);

    // Рассчитываем длину окружности
    const circumference = 2 * Math.PI * 120; // Увеличили радиус круга на 10

    // Рассчитываем значение stroke-dashoffset
    const dashOffset = circumference - (progress / 100) * circumference;

    return (
        <svg width="300" height="300" > {/* Увеличили размеры круга */}
            {/* Белая окружность */}
            <circle
                cx="150"
                cy="150"
                r="120"
                fill="transparent"
                stroke="white"
                strokeWidth="10"
            />
            {/* Розовая окружность с анимацией */}
            <circle
                cx="150"
                cy="150"
                r="120"
                fill="transparent"
                stroke="#E4229C"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{
                    transition: 'stroke-dashoffset 0.05s ease-in-out',
                    transform: 'rotate(-90deg)', // Поворачиваем на -90 градусов
                    transformOrigin: 'center', // Центр вращения
                    strokeLinecap: 'round', // Скругленные края
                }}
            />
            <text
                x="154"
                y="160"
                textAnchor="middle"
                fill="white"
                fontSize="40"
                fontFamily='AlbertSans'
            >{progress} %</text>
        </svg>
    );
};


export default CircleLoader;