'use client'
import { questions_type, variants_type } from '@/store/data-slice'
import s from './main.module.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
type propsType = { progress: string, variants_of_questions: questions_type[] }
const Options = ({ progress, variants_of_questions }: propsType) => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

    console.log(variants_of_questions)
    const type = variants_of_questions[parseInt(progress) - 1].type
    const handleCheckboxChange = (index: number) => {
        if (selectedIndices.includes(index)) {
            setSelectedIndices(selectedIndices.filter((i) => i !== index));
        } else {
            setSelectedIndices([...selectedIndices, index]);
        }
    };
    return (
        <div className={s.container}>
            <ul className={classNames(
                { [s.options_block_type_string]: type === "string" || type === "checkbox" },
                { [s.options_block_type_string_and_emoji]: type === "string_and_emoji" },
                { [s.options_block_type_circle]: type === "circle" },
            )}
            >
                {variants_of_questions[parseInt(progress) - 1].variants.map((el, i) => (
                    type === "string" ?
                        <li key={i} className={s.li_type_text}>{(el as variants_type).text}</li>
                        : type === "string_and_emoji" ?
                            <li key={i} className={s.li_type_string_and_emoji}>
                                <div>{(el as variants_type).emoji}</div>
                                <span>
                                    {(el as variants_type).text}
                                </span>
                            </li> :
                            type === "checkbox" ?
                                <li key={i} className={s.li_type_checkbox}>{(el as variants_type).text}
                                    <div>
                                        <input
                                            onChange={() => handleCheckboxChange(i)}
                                            checked={selectedIndices.includes(i)}
                                            type="checkbox" id={`myCheckbox -${i}`} />
                                        <label htmlFor={`myCheckbox -${i}`} className={classNames(s.input, { [s.checked_input]: selectedIndices.includes(i) })}>
                                            <div></div>
                                        </label>


                                    </div></li>
                                : type === "circle" ?
                                    <div key={i} className={s.circle_block}>
                                        {(el as variants_type[]).map((el, id) => (
                                            < li key={id} className={s.li_type_circle} > {el.text}</li>

                                        ))}
                                    </div>

                                    :
                                    ""
                ))
                }

            </ul>
            {
                (type === "checkbox" || type === "circle") &&

                <button disabled={selectedIndices.length === 0} className={classNames(s.btn, { [s.btn_disabled]: selectedIndices.length === 0 })}>Next</button>
            }

        </div >

    )
}
export default Options