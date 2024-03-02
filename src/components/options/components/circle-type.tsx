'use client'
import { changeLanguage, variants_type } from "@/store/data-slice"
import { useAppDispatch } from "@/store/store"
import { useRouter } from "next/navigation"
import s from '../main.module.scss'
import classNames from "classnames"
import { selectedElType } from "../main"
import { forwardRef } from "react"
import { motion } from "framer-motion"
type propsType = {
    el: variants_type
    selectedCircleIndices: selectedElType[]
    setSelectedCircleIndices: any
    handleChange: (text: string, func: (any: any) => void, select: selectedElType[]) => void
}
export const CircleType = forwardRef(({ el, handleChange, selectedCircleIndices, setSelectedCircleIndices }: propsType, ref) => {
    return (
        < li
            //@ts-ignore
            ref={ref}
            onClick={() => {
                if (selectedCircleIndices.findIndex(item => item.text === el.text) !== -1 || selectedCircleIndices.length !== 3)
                    handleChange((el as variants_type).text, setSelectedCircleIndices, selectedCircleIndices)

            }
            }
            className={classNames(s.li_type_circle, { [s.selectCircle]: selectedCircleIndices.findIndex(item => item.text === el.text) !== -1 })} >
            <div>
                {el.emoji}
            </div>{el.text}
        </li>
    )
})
export const MCircleType = motion(CircleType)