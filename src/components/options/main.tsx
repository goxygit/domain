'use client'
import { changeLanguage, changeLoader, questions_type, variants_type } from '@/store/data-slice'
import s from './main.module.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/store'
type propsType = { progress: string, variants_of_questions: questions_type[] }
type selectedElType = {
    text: string
    id: number
}
const Options = ({ progress, variants_of_questions }: propsType) => {
    const [selectedIndices, setSelectedIndices] = useState<selectedElType[]>([]);
    const [selectedCircleIndices, setSelectedCircleIndices] = useState<selectedElType[]>([]);
    const router = useRouter()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const existingAnswersString = localStorage.getItem('language');
        const existingAnswers = existingAnswersString ? JSON.parse(existingAnswersString) : []
        dispatch(changeLanguage(existingAnswers))
    }, [])
    const type = variants_of_questions[parseInt(progress) - 1].type
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
        const currentAnswer = {
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
    const variants = variants_of_questions[parseInt(progress) - 1]
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
                        <li
                            onClick={() => {
                                // setAnswer((el as variants_type))
                                // if (parseInt(progress) === 1) {
                                //     dispatch(changeLanguage((el as variants_type).text))
                                // }
                                // router.push(`/quiz/${parseInt(progress) + 1}`)

                                // localStorage.setItem('quizAnswers', '');
                                // localStorage.setItem('language', '');
                            }}
                            key={i} className={s.li_type_text}>{(el as variants_type).text}</li>
                        : type === "string_and_emoji" ?
                            <li
                                onClick={() => {
                                    setAnswer((el as variants_type))
                                    router.push(`/quiz/${parseInt(progress) + 1}`)
                                    // localStorage.setItem('quizAnswers', '');
                                }}
                                key={i} className={s.li_type_string_and_emoji}>
                                <div>{(el as variants_type).emoji}</div>
                                <span>
                                    {(el as variants_type).text}
                                </span>
                            </li> :
                            type === "checkbox" ?
                                <li
                                    onClick={() => handleChange((el as variants_type).text, setSelectedIndices, selectedIndices)}
                                    key={i} className={s.li_type_checkbox}>{(el as variants_type).text}
                                    <div>
                                        <div className={classNames(s.input, { [s.checked_input]: selectedIndices.some(item => item.text === (el as variants_type).text) })}></div>


                                    </div></li>
                                : type === "circle" ?
                                    <div key={i} className={s.circle_block}>
                                        {(el as variants_type[]).map((el, id) => (
                                            < li
                                                onClick={() => {
                                                    if (selectedCircleIndices.findIndex(item => item.text === el.text) !== -1 || selectedCircleIndices.length !== 3)
                                                        handleChange((el as variants_type).text, setSelectedCircleIndices, selectedCircleIndices)

                                                }
                                                }
                                                key={id} className={classNames(s.li_type_circle, { [s.selectCircle]: selectedCircleIndices.findIndex(item => item.text === el.text) !== -1 })} >
                                                <div>
                                                    {el.emoji}
                                                </div>{el.text}
                                            </li>

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
                    // setAnswer(selectedCircleIndices)
                    dispatch(changeLoader(true))
                    // router.push(`/email`)

                    // localStorage.setItem('quizAnswers', '');
                    // localStorage.setItem('language', '');
                }} disabled={selectedCircleIndices.length === 0} className={classNames(s.btn, { [s.btn_disabled]: selectedCircleIndices.length === 0 })}>Next</button>
            }
        </div >

    )
}
export default Options