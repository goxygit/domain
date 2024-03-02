'use client'
import classNames from 'classnames';
import s from './main.module.scss'
import ok from '@/assets/img/ok.png'
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { changeLoader } from '@/store/data-slice';
import Download from '../cvs/main';
const Result = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    return (
        <div className={s.container_result}>
            <h1>Thanks you</h1>
            <p>for supporting us and passing quiz</p>
            <img src={ok.src} alt="" />
            <div className={s.bottom_elements}>
                <Download />
                <button onClick={() => {
                    localStorage.setItem('quizAnswers', '');
                    localStorage.setItem('language', '');
                    dispatch(changeLoader(false))
                    setTimeout(() => {
                        router.push(`/quiz/1`)

                    }, 500)
                }} className={classNames(s.btn)}>Retake quiz</button>
            </div>
        </div>
    );
};


export default Result