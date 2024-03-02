'use client'
import { usePathname, useParams } from 'next/navigation';
import s from './main.module.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
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
    return (
        <div>
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

        </div>

    );
};


export default HeaderLine