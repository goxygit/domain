'use client'
import { changeLanguage, variants_type } from "@/store/data-slice"
import { useAppDispatch } from "@/store/store"
import { useRouter } from "next/navigation"
import s from '../main.module.scss'
import { motion } from "framer-motion"
import { forwardRef } from "react"
type propsType = {
    el: variants_type
    progress: string
    setAnswer: (el: variants_type) => void
}
export const StringAndEmoji = forwardRef(({ el, setAnswer, progress }: propsType, ref) => {
    const router = useRouter()
    return (
        <li
            //@ts-ignore
            ref={ref}
            onClick={() => {
                setAnswer((el as variants_type))
                router.push(`/quiz/${parseInt(progress) + 1}`)
                // localStorage.setItem('quizAnswers', '');
            }}
            className={s.li_type_string_and_emoji}>
            <div>{el.emoji}</div>
            <span>
                {el.text}
            </span>
        </li>
    )
})
export const MStringAndEmoji = motion(StringAndEmoji)