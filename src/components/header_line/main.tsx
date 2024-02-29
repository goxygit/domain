import s from './main.module.scss'
const HeaderLine = ({ progress }: { progress: string }) => {
    return (
        <header className={s.header}>
            <div className={s.numbers}><span className={s.first_number}>{progress}</span>/ <span className={s.last_number}>5</span></div>
            <div className={s.white_line}>
                <div className={s.red_line} style={{ width: `${parseInt(progress) / 5 * 100}%` }}>
                </div>
            </div>
        </header>
    )
}
export default HeaderLine