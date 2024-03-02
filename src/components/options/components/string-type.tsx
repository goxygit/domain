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
                setAnswer(el)
                if (parseInt(progress) === 1) {
                    dispatch(changeLanguage(el.text))
                }
                router.push(`/quiz/${parseInt(progress) + 1}`)
            }}
            key={i} className={s.li_type_text}>{el.text}</li>
    )
}