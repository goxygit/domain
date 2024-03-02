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
    selectedCircleIndices: selectedElType[]
    setSelectedCircleIndices: any
    handleChange: (text: string, func: (any: any) => void, select: selectedElType[]) => void
}
export default ({ el, i, handleChange, selectedCircleIndices, setSelectedCircleIndices }: propsType) => {
    return (
        < li
            onClick={() => {
                if (selectedCircleIndices.findIndex(item => item.text === el.text) !== -1 || selectedCircleIndices.length !== 3)
                    handleChange((el as variants_type).text, setSelectedCircleIndices, selectedCircleIndices)

            }
            }
            key={i} className={classNames(s.li_type_circle, { [s.selectCircle]: selectedCircleIndices.findIndex(item => item.text === el.text) !== -1 })} >
            <div>
                {el.emoji}
            </div>{el.text}
        </li>
    )
}