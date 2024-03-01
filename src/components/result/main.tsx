'use client'
import classNames from 'classnames';
import s from './main.module.scss'
const Result = () => {

    return (
        <div className={s.container_result}>
            <h1>Thanks you</h1>
            <p>for supporting us and passing quiz</p>
            <img src="" alt="" />
            <div className={s.bottom_elements}>
                <div></div>
                <button className={classNames(s.btn)}>Retake quiz</button>
            </div>
        </div>
    );
};


export default Result