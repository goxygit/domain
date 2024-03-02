'use client'
import { useForm, useController } from 'react-hook-form';
import s from './main.module.scss'
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const Email = () => {
    const router = useRouter()

    const {
        register,
        formState: {
            errors,
            isValid,

        },
        control,
        handleSubmit
    } = useForm({
        mode: 'onBlur'
    })

    const { field, fieldState } = useController({
        name: 'Email', // имя вашего инпута
        control,
    });
    const onSubmit = (data: any) => {
        const existingAnswersString = localStorage.getItem('quizAnswers');
        const existingAnswers = existingAnswersString ? JSON.parse(existingAnswersString) : [];
        const currentAnswer = {
            order: existingAnswers.length + 1,
            title: 'Email',
            type: 'Email',
            answer: data.Email,
        };


        const isDuplicate = existingAnswers.some((answer: any) => {
            return (
                answer.order === currentAnswer.order ||
                answer.title === currentAnswer.title ||
                answer.type === currentAnswer.type
            );
        });

        if (!isDuplicate) {
            existingAnswers.push(currentAnswer);

            localStorage.setItem('quizAnswers', JSON.stringify(existingAnswers));

        } else {
            console.log('Этот ответ уже существует в localStorage.');
        }
        setTimeout(() => {

            router.push('/result')
        }, 500)
    }
    return (
        <div className={s.email_block}>
            <h1>Email</h1>
            <p>Enter your email to get full access</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={classNames({ [s.invalid]: !isValid && fieldState.isTouched })} placeholder='Your email' {...register('Email', {
                        required: "required",
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address',
                        },
                    })} />
                <div>
                    {errors?.Email && errors?.Email?.message?.toString()}
                </div>
                <p>By continuing I agree with <a target="_blank" href='https://www.youtube.com/watch?v=mqw446NS7W8&ab_channel=Holdem'>Privacy policy</a> and <a target="_blank" href='https://www.youtube.com/watch?v=jfKfPfyJRdk&ab_channel=LofiGirl'>Terms of use</a></p>
                <input type='submit' className={classNames(s.btn, { [s.btn_disabled]: !isValid })} value={'Next'} />
            </form>
        </div>
    );
};


export default Email