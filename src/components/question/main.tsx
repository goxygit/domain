import { variants_of_questions_type } from '@/store/data-slice'
import s from './main.module.scss'
import { motion } from 'framer-motion'
type propsType = { progress: string, variants_of_questions: variants_of_questions_type }
const Question = ({ progress, variants_of_questions }: propsType) => {
    const data = variants_of_questions.questions[parseInt(progress) - 1]
    const textAnimation = {
        hidden: {
            x: -100,
            opacity: 0
        },
        //@ts-ignore
        visible: custom => ({
            x: 0,
            opacity: 1,
            transition: { delay: custom * 0.2 }
        })
    }
    return (
        <motion.div initial='hidden' whileInView='visible' className={s.question_block}>
            <motion.h1 custom={1} variants={textAnimation}>{data.question}</motion.h1>
            <motion.p custom={2} variants={textAnimation}>{data.description}</motion.p>
        </ motion.div>
    )
}
export default Question