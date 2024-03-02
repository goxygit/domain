'use client'
import React from 'react'
import { changeLanguage, changeLoader, questions_type, variants_type } from '@/store/data-slice'
import s from './main.module.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/store'
import { MStringType } from './components/string-type'
import { MStringAndEmoji } from './components/sting-and-emoji'
import { MCheckboxType } from './components/checkbox-type'
import { MCircleType } from './components/circle-type'
import { motion } from 'framer-motion'
type propsType = { progress: string, variants_of_questions: questions_type[] }
export type selectedElType = {
    text: string
    id: number
}
export type answerType = {
    order: string,
    title: string,
    type: string,
    answer: string | variants_type[],
}
const Options = ({ progress, variants_of_questions }: propsType) => {
    const [selectedIndices, setSelectedIndices] = useState<selectedElType[]>([]);
    const [selectedCircleIndices, setSelectedCircleIndices] = useState<selectedElType[]>([]);
    const router = useRouter()
    const dispatch = useAppDispatch()

    const type = variants_of_questions[parseInt(progress) - 1].type
    const variants = variants_of_questions[parseInt(progress) - 1]

    useEffect(() => {
        const existingAnswersString = localStorage.getItem('language');
        const existingAnswers = existingAnswersString ? JSON.parse(existingAnswersString) : []
        dispatch(changeLanguage(existingAnswers))
    }, [])


    const handleChange = (text: string, func: (any: any) => void, select: selectedElType[]) => {
        const selectedIndex = select.findIndex(item => item.text === text);
        if (selectedIndex !== -1) {
            // Удаляем элемент из массива, если он уже существует
            func(select.filter((item, index) => index !== selectedIndex));
        } else {
            // Добавляем элемент в массив, если его нет
            const selectedElement = {
                text: text,
            };
            func([...select, selectedElement]);
        }
    };

    const setAnswer = (el: variants_type | variants_type[]) => {
        console.log(el)
        const currentAnswer: answerType = {
            order: progress, // Порядковый номер вопроса
            title: variants.question, // Заголовок вопроса
            type: variants.type, // Тип вопроса (например, multiple_choice, true_false и т. д.)
            answer: Array.isArray(el) ? el : el.text, // Ответ пользователя
        };
        const existingAnswersString = localStorage.getItem('quizAnswers');
        const existingAnswers = existingAnswersString ? JSON.parse(existingAnswersString) : [];

        const isDuplicate = existingAnswers.some((answer: any) => {
            return (
                answer.order === currentAnswer.order ||
                answer.title === currentAnswer.title
            );
        });

        if (!isDuplicate) {
            // Если элемента нет, добавьте текущий ответ в массив
            existingAnswers.push(currentAnswer);

            // Сохраните обновленный массив ответов в localStorage
            localStorage.setItem('quizAnswers', JSON.stringify(existingAnswers));
        } else {
            console.log('Этот ответ уже существует в localStorage.');
        }
        console.log(localStorage.getItem('quizAnswers'))
    }
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
        <motion.div initial='hidden' whileInView='visible' className={s.container}>
            <motion.ul variants={textAnimation} className={classNames(
                { [s.options_block_type_string]: type === "string" || type === "checkbox" },
                { [s.options_block_type_string_and_emoji]: type === "string_and_emoji" },
                { [s.options_block_type_circle]: type === "circle" },
            )}
            >
                {variants.variants.map((el, i) => (
                    type === "string" ?
                        <React.Fragment key={i}>
                            <MStringType variants={textAnimation} custom={i} setAnswer={setAnswer} el={el as variants_type} progress={progress} />

                        </React.Fragment>
                        : type === "string_and_emoji" ?
                            <React.Fragment key={i}>
                                <MStringAndEmoji custom={i} variants={textAnimation} setAnswer={setAnswer} el={el as variants_type} progress={progress} />

                            </React.Fragment> :
                            type === "checkbox" ?
                                <React.Fragment key={i}>
                                    <MCheckboxType custom={i} variants={textAnimation} el={(el as variants_type)} selectedIndices={selectedIndices} setSelectedIndices={setSelectedIndices} handleChange={handleChange} />

                                </React.Fragment>
                                : type === "circle" ?
                                    <div key={i} className={s.circle_block}>
                                        {(el as variants_type[]).map((el, id) => (
                                            <React.Fragment key={id}>
                                                <MCircleType variants={textAnimation} custom={id} el={el} handleChange={handleChange} selectedCircleIndices={selectedCircleIndices} setSelectedCircleIndices={setSelectedCircleIndices} />
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    :
                                    ""
                ))
                }

            </motion.ul>
            {
                (type === "checkbox") &&

                <button onClick={() => {
                    setAnswer(selectedIndices)
                    router.push(`/quiz/${parseInt(progress) + 1}`)
                }} disabled={selectedIndices.length === 0} className={classNames(s.btn, { [s.btn_disabled]: selectedIndices.length === 0 })}>Next</button>
            }
            {
                type === "circle" &&
                <button
                    onClick={() => {
                        setAnswer(selectedCircleIndices)
                        dispatch(changeLoader(true))

                    }} disabled={selectedCircleIndices.length === 0} className={classNames(s.btn, { [s.btn_disabled]: selectedCircleIndices.length === 0 })}>Next</button>
            }
        </motion.div >

    )
}
export default Options