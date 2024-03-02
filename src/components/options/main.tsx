'use client'
import { changeLanguage, changeLoader, questions_type, variants_type } from '@/store/data-slice'
import s from './main.module.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/store'
import StringType from './components/string-type'
import CheckboxType from './components/checkbox-type'
import StringAndEmoji from './components/sting-and-emoji'
import CircleType from './components/circle-type'
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
                answer.order === currentAnswer.order &&
                answer.title === currentAnswer.title &&
                answer.type === currentAnswer.type
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
    return (
        <div className={s.container}>
            <ul className={classNames(
                { [s.options_block_type_string]: type === "string" || type === "checkbox" },
                { [s.options_block_type_string_and_emoji]: type === "string_and_emoji" },
                { [s.options_block_type_circle]: type === "circle" },
            )}
            >
                {variants.variants.map((el, i) => (
                    type === "string" ?
                        <StringType setAnswer={setAnswer} el={el as variants_type} progress={progress} i={i} />
                        : type === "string_and_emoji" ?
                            <StringAndEmoji setAnswer={setAnswer} el={el as variants_type} progress={progress} i={i} />
                            :
                            type === "checkbox" ?
                                <CheckboxType handleChange={handleChange} i={i} el={el as variants_type} selectedIndices={selectedIndices} setSelectedIndices={selectedCircleIndices} />
                                : type === "circle" ?
                                    <div key={i} className={s.circle_block}>
                                        {(el as variants_type[]).map((el, id) => (
                                            <CircleType
                                                handleChange={handleChange}
                                                i={i} el={el as variants_type}
                                                selectedCircleIndices={selectedCircleIndices}
                                                setSelectedCircleIndices={setSelectedCircleIndices} />

                                        ))}
                                    </div>
                                    :
                                    ""
                ))
                }

            </ul>
            {
                (type === "checkbox") &&

                <button onClick={() => {
                    setAnswer(selectedIndices)
                    router.push(`/quiz/${parseInt(progress) + 1}`)
                }} disabled={selectedIndices.length === 0} className={classNames(s.btn, { [s.btn_disabled]: selectedIndices.length === 0 })}>Next</button>
            }
            {
                type === "circle" &&
                <button onClick={() => {
                    setAnswer(selectedCircleIndices)
                    dispatch(changeLoader(true))

                }} disabled={selectedCircleIndices.length === 0} className={classNames(s.btn, { [s.btn_disabled]: selectedCircleIndices.length === 0 })}>Next</button>
            }
        </div >

    )
}
export default Options