import s from './main.module.scss'
const Question = () => {
    return (
        <div className={s.question_block}>
            <h1 >What gender do you identify with?</h1>
            <p>Please share how do you identify yourself</p>
        </div>
    )
}
export default Question