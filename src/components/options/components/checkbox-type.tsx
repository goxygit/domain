'use client'
import { changeLanguage, variants_type } from "@/store/data-slice"
import { useAppDispatch } from "@/store/store"
import { useRouter } from "next/navigation"
import s from '../main.module.scss'
import classNames from "classnames"
import { selectedElType } from "../main"
type propsType = {
    el: variants_type
    i: number
    selectedIndices: selectedElType[]
    setSelectedIndices: any
    handleChange: (text: string, func: (any: any) => void, select: selectedElType[]) => void
}
export default ({ el, i, handleChange, selectedIndices, setSelectedIndices }: propsType) => {
    return (
        <li
            onClick={() => handleChange(el.text, setSelectedIndices, selectedIndices)}
            key={i} className={s.li_type_checkbox}>{el.text}
            <div>
                <div className={classNames(s.input, { [s.checked_input]: selectedIndices.some(item => item.text === el.text) })}></div>
            </div></li>
    )
}