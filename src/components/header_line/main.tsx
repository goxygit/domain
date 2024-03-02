'use client'
import { usePathname, useParams } from 'next/navigation';
import s from './main.module.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { motion } from 'framer-motion';
const HeaderLine = () => {
    const pathname = usePathname();
    const id = useParams().id
    const isQuizRoute = pathname.startsWith('/quiz');
    const { loader } = useSelector((state: RootState) => state.data)
    if (!isQuizRoute) {
        // Не отображать хедер на других страницах
        return null;
    }
    const parsedId: number | null = id ? parseInt(id as string) : null;
    const textAnimation = {
        hidden: {
            x: -100,
            opacity: 0
        },
        //@ts-ignore
        visible: custom => ({
            x: 0,
            opacity: 1,
            transition: { delay: custom * 0.2 }
        })
    }
    return (
        <motion.div initial='hidden' whileInView='visible' variants={textAnimation}>
            {loader ?
                ''
                :
                <header className={s.header}>
                    <div className={s.numbers}><span className={s.first_number}>{id}</span>/ <span className={s.last_number}>5</span></div>
                    <div className={s.white_line}>
                        <div className={s.red_line} style={{ width: `${parsedId && parsedId / 5 * 100}%` }}> {/* Добавьте проверку на null и приведение типов */}
                        </div>
                    </div>
                </header>
            }

        </motion.div>

    );
};


export default HeaderLine