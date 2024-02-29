import { variants_of_questions_type } from '@/store/data-slice'
import s from './main.module.scss'
type propsType = { progress: string, variants_of_questions: variants_of_questions_type }
const Question = ({ progress, variants_of_questions }: propsType) => {
    const data = variants_of_questions.questions[parseInt(progress) - 1]

    return (
        <div className={s.question_block}>
            <h1 >{data.question}</h1>
            <p>{data.description}</p>
        </div>
    )
}
export default Question