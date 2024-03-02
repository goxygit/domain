'use client'
import { changeLanguage, variants_type } from "@/store/data-slice"
import { useAppDispatch } from "@/store/store"
import { useRouter } from "next/navigation"
import s from '../main.module.scss'
import { forwardRef } from "react"
import { motion } from "framer-motion"
type propsType = {
    el: variants_type
    progress: string
    setAnswer: (el: variants_type) => void
}
export const StringType = forwardRef(({ el, setAnswer, progress }: propsType, ref) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    return (
        <li
            //@ts-ignore
            ref={ref}
            onClick={() => {
                setAnswer(el)
                if (parseInt(progress) === 1) {
                    dispatch(changeLanguage(el.text))
                }
                router.push(`/quiz/${parseInt(progress) + 1}`)
            }}
            className={s.li_type_text}>{el.text}</li>
    )
})
export const MStringType = motion(StringType)