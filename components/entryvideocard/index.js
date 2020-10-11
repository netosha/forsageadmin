import React from 'react'
import cn from 'classnames'
import {Modal} from 'flwww'
import * as Icon from 'react-feather'
import {message} from "flwww";
import styles from './EntryVideoCard.module.scss'
import {Input, TextArea, Button} from "../../blocks";
import {error} from "next/dist/build/output/log";

export default function EntryVideoCard({...props}){
    const [isModalVisible, setModalVisible] = React.useState(false)
    const [title, setTitle] = React.useState(props.title ?? '')
    const [url, setUrl] = React.useState(props.url ?? '')
    const [errors, setErrors] = React.useState({title:false, url:false})
    const [description, setDescription] = React.useState(props.description ?? '')

    function videoId(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url?.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }



    function saveChanges(){
        if(!videoId(url)){
            setErrors({...errors, url:true})
            return message('Ссылка на ролик неверная', 'error')
        }
        if(!title.trim()){
            setErrors({...errors, title:true})
            return message('Название не может быть пустым', 'error')
        }
        setModalVisible(!isModalVisible)
        props.onSave(url, title, description)
    }

    function closeModal(){
        setTitle(props.title)
        setUrl(props.url)
        setDescription(props.description)
        setErrors({title:false, url:false})
        setModalVisible(!isModalVisible)
    }
    return(
        <div>
            <div
                className={styles.EntryVideoCard}
                onClick={() => setModalVisible(!isModalVisible)}
                style={{background: `url(https://img.youtube.com/vi/${videoId(url)}/mqdefault.jpg)`,backgroundSize:'cover'}}
            >
                {videoId(url) ?  <Icon.Edit3 size={48} color={'white'} /> : <Icon.Plus size={48} color={'gray'} /> }
            </div>
            <Modal isVisible={isModalVisible} toggleModal={isModalVisible ? closeModal : () => setModalVisible(!isModalVisible)}>
                <div className={styles.Modal}>
                    <a className={styles.title}>
                        Вступительный ролик
                    </a>
                    <Input
                        value={url}
                        name={'url'}
                        type={'text'}
                        error={errors.url}
                        onChange={e => {setUrl(e.target.value); setErrors({...errors, url:false})}}
                        placeholder={'Ссылка на видео'}
                        style={{marginBottom:16}}
                    />
                    <Input
                        value={title}
                        name={'title'}
                        type={'text'}
                        error={errors.title}
                        onChange={e => {setTitle(e.target.value); setErrors({...errors, title:false})}}
                        placeholder={'Название'}
                        style={{marginBottom:16}}
                    />

                    <TextArea
                        value={description}
                        name={'description'}
                        type={'text'}
                        styl
                        onChange={e => setDescription(e.target.value)}
                        placeholder={'Описание'}
                        style={{marginBottom:16}}
                    />

                    <Button
                        onClick={saveChanges}
                    >
                        Сохранить
                    </Button>
                </div>
            </Modal>
        </div>

    )
}