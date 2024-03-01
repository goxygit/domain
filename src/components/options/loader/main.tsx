import React, { useState, useEffect } from 'react';
import CircleLoader from './circle-loader/main';
import DotsLoader from './dots-loader/main';
import s from './main.module.scss'
import { useAppDispatch } from '@/store/store';
import { changeLoader } from '@/store/data-slice';
const Loader = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch(changeLoader(false))
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
