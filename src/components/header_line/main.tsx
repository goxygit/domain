import s from './main.module.scss'
const HeaderLine = () => {
    return (
        <header className={s.header}>
            <div className={s.numbers}><span className={s.first_number}>2</span>/ <span className={s.last_number}>5</span></div>
            <div className={s.white_line}>
                <div className={s.red_line}>
                </div>
            </div>
        </header>
    )
}
export default HeaderLine