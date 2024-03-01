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

export default function QuizQuestionPage({ params }: { params: { id: string } }) {
    const [focusLanguage, setFocusLanguage] = useState(0)
    const { language, data, loader } = useSelector((state: RootState) => state.data)
    const dispatch = useAppDispatch()

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
                </>
                : loader && <Loader />
            }

        </div>
    );
};
