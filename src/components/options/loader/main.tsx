import React, { useState, useEffect } from 'react';
import CircleLoader from './circle-loader/main';
import DotsLoader from './dots-loader/main';
import s from './main.module.scss'
import { useAppDispatch } from '@/store/store';
import { changeLoader } from '@/store/data-slice';
import { useRouter } from 'next/navigation';
const Loader = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push('/email')
            setTimeout(() => {
                dispatch(changeLoader(false))
            }, 500)
        }, 6000)
    }, [])
    return (
        <div className={s.loader}>
            <CircleLoader />
            <DotsLoader />
        </div>
    )
};

export default Loader;
