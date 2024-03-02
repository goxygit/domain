'use client'
import { changeLanguage, variants_type } from "@/store/data-slice"
import { useAppDispatch } from "@/store/store"
import { useRouter } from "next/navigation"
import s from '../main.module.scss'
type propsType = {
    el: variants_type
    progress: string
    i: number
    setAnswer: (el: variants_type) => void
}
export default ({ el, setAnswer, i, progress }: propsType) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    return (
        <li
            onClick={() => {
                setAnswer((el as variants_type))
                router.push(`/quiz/${parseInt(progress) + 1}`)
                // localStorage.setItem('quizAnswers', '');
            }}
            key={i} className={s.li_type_string_and_emoji}>
            <div>{el.emoji}</div>
            <span>
                {el.text}
            </span>
        </li>
    )
}