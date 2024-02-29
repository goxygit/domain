'use client'
import { useRouter } from "next/router";
import HeaderLine from "@/components/header_line/main";
import Question from "@/components/question/main";
import Options from "@/components/options/main";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { fetchData } from "@/store/data-slice";

export default function QuizQuestionPage({ params }: { params: { id: string } }) {
    const [focusLanguage, setFocusLanguage] = useState(0)
    const { language, data } = useSelector((state: RootState) => state.data)
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
    }, [language])
    const id = params.id
    // Здесь вы можете получить данные о вопросе с questionId 
    // или загрузить их из вашего источника данных

    const handleNextQuestion = () => {
    };

    return (
        <div>
            {data.variants_of_questions ?
                <>
                    <HeaderLine progress={id} />
                    <Question variants_of_questions={data.variants_of_questions[focusLanguage]} progress={id} />
                    <Options variants_of_questions={data.variants_of_questions[focusLanguage].questions} progress={id} />
                </>
                : "lsad"
            }

        </div>
    );
};
