'use client'
import classNames from 'classnames';
import s from './main.module.scss'
import ok from '@/assets/img/ok.png'
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { changeLoader } from '@/store/data-slice';
import Download from '../cvs/main';
import { motion } from 'framer-motion';
const Result = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
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
    const handleRetakeQuiz = () => {
        // Очистка localStorage при клике на кнопку
        if (typeof window !== 'undefined') {
            localStorage.setItem('quizAnswers', '');
            localStorage.setItem('language', '');
        }

        dispatch(changeLoader(false));

        setTimeout(() => {
            router.push(`/quiz/1`);
        }, 500);
    };

    return (
        <motion.div initial='hidden' whileInView='visible' className={s.container_result}>
            <motion.h1 variants={textAnimation} custom={1}>Thanks you</motion.h1>
            <motion.p variants={textAnimation} custom={2}>for supporting us and passing quiz</motion.p>
            <motion.img variants={textAnimation} custom={3} src={ok.src} alt="" />
            <motion.div variants={textAnimation} custom={4} className={s.bottom_elements}>
                {/* <Download /> */}
                <button onClick={handleRetakeQuiz} className={classNames(s.btn)}>Retake quiz</button>
            </motion.div>
        </motion.div>
    );
};


export default Result