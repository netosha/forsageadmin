import styles from './Select.module.scss'
import cn from 'classnames'
export default function Select({...props}){
    return(
        <select className={cn(styles.Select, {[styles.error]:props.error})} {...props}>
            {props.children}
        </select>
    )
}