'use client'
import { changeLanguage, variants_type } from "@/store/data-slice"
import s from '../main.module.scss'
import classNames from "classnames"
import { selectedElType } from "../main"
import { motion } from "framer-motion"
import { forwardRef } from "react"
type propsType = {
    el: variants_type
    selectedIndices: selectedElType[]
    setSelectedIndices: any
    handleChange: any
}
export const CheckboxType = forwardRef(({ el, handleChange, selectedIndices, setSelectedIndices }: propsType, ref) => {
    return (
        <li
            //@ts-ignore
            ref={ref}
            onClick={() => handleChange((el as variants_type).text, setSelectedIndices, selectedIndices)}
            className={s.li_type_checkbox}>{(el as variants_type).text}
            <div>
                <div className={classNames(s.input, { [s.checked_input]: selectedIndices.some(item => item.text === (el as variants_type).text) })}></div>
            </div></li>
    )
})
export const MCheckboxType = motion(CheckboxType)