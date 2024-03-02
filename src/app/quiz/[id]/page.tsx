'use client'
import Question from "@/components/question/main";
import s from './page.module.scss'
import Options from "@/components/options/main";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { fetchData } from "@/store/data-slice";
import classNames from "classnames";
import Loader from "@/components/options/loader/main";
import arrow from '@/assets/img/arrow.png'
import { useRouter } from "next/navigation";
export default function QuizQuestionPage({ params }: { params: { id: string } }) {
    const [focusLanguage, setFocusLanguage] = useState(0)
    const { language, data, loader } = useSelector((state: RootState) => state.data)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const back = () => {
        const existingAnswersString = localStorage.getItem('quizAnswers');
        const existingAnswers = existingAnswersString ? JSON.parse(existingAnswersString) : []
        router.push((parseInt(id) - 1).toString())
        existingAnswers.pop()
        localStorage.setItem('quizAnswers', JSON.stringify(existingAnswers))
        console.log(existingAnswers)
    }
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    useEffect(() => {
        data.variants_of_questions?.forEach((n, i) => {
            if (n.language === language) {
                setFocusLanguage(i)
            }
        }
        )
        console.log(language)

    }, [language])
    const id = params.id
    // Здесь вы можете получить данные о вопросе с questionId 
    // или загрузить их из вашего источника данных

    const handleNextQuestion = () => {
    };

    return (
        <div className={classNames({ [s.container]: loader })}>
            {data.variants_of_questions && !loader ?
                <>
                    <Question variants_of_questions={data.variants_of_questions[focusLanguage]} progress={id} />
                    <Options variants_of_questions={data.variants_of_questions[focusLanguage].questions} progress={id} />
                    {parseInt(id) > 2 && parseInt(id) < 6 &&
                        <img onClick={back} className={s.img} src={arrow.src} alt="arrow" />
                    }
                </>
                : loader && <Loader />
            }

        </div>
    );
};
