'use client'
import { useForm } from 'react-hook-form';
import s from './main.module.scss'
import classNames from 'classnames';
const Email = () => {
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit
    } = useForm({
        mode: 'onChange'
    })
    const onSubmit = (data: any) => {
        const currentAnswer = {
            order: 6,
            title: 'Email',
            type: 'Email',
            answer: data.Email,
        };
        const existingAnswersString = localStorage.getItem('quizAnswers');
        const existingAnswers = existingAnswersString ? JSON.parse(existingAnswersString) : [];

        const isDuplicate = existingAnswers.some((answer: any) => {
            return (
                answer.order === currentAnswer.order &&
                answer.title === currentAnswer.title &&
                answer.type === currentAnswer.type
            );
        });

        if (!isDuplicate) {
            existingAnswers.push(currentAnswer);

            localStorage.setItem('quizAnswers', JSON.stringify(existingAnswers));
        } else {
            console.log('Этот ответ уже существует в localStorage.');
        }
        console.log(localStorage.getItem('quizAnswers'))
    }
    return (
        <div className={s.email_block}>
            <h1>Email</h1>
            <p>Enter your email to get full access</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Your email' {...register('Email', {
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                    },
                })} />
                <div>
                    {errors?.Email && errors?.Email?.message?.toString()}
                </div>
                <p>By continuing I agree with <a>Privacy policy</a> and <a>Terms of use</a></p>
                <input type='submit' className={classNames(s.btn, { [s.btn_disabled]: !isValid })} value={'Next'} />
            </form>
        </div>
    );
};


export default Email