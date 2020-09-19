import React, {Component} from "react";
import * as Icon from "react-feather";
import {Modal, message} from "flwww";
import styled from "styled-components";
import {Button} from "../../blocks";

const EmptyVideo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  border-radius: 8px;
  background: rgba(128, 128, 128, 0.5);
  transition: 0.5s;
  
  &:hover{
    background: #DDDDDD;
    transition: 0.5s;
    cursor: pointer;
  }
`

const Input = styled.input`
  height: 36px;
  background: #f0f0f0;
  color:gray;
  padding: 0px 16px;
  border-radius: 6px;
  font-size: 18px;
  letter-spacing: 0px;
  line-height: 1.2;
  font-weight: 500;
  font-style: normal;
  box-shadow: ${props => props.error ? 'inset 0 0 0 1px red !important' : ''};
  transition: 0.1s;
  
  &:focus{
    box-shadow: inset 0 0 0 1px#80d0c7 !important;
    transition: 0.1s;
  }
`

const TextArea = styled.textarea`
  height: 72px;
  background: #f0f0f0;
  color:gray;
  padding: 16px 16px;
  border-radius: 6px;
  font-size: 18px;
  letter-spacing: 0px;
  line-height: 1.2;
  font-weight: 500;
  font-style: normal;
  box-shadow: ${props => props.error ? 'inset 0 0 0 1px red !important' : ''};
  transition: 0.1s;
  
  &:focus{
    box-shadow: inset 0 0 0 1px#80d0c7 !important;
    transition: 0.1s;
  }
`

const CoveredVideo = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(https://img.youtube.com/vi/${props => props.videoId}/mqdefault.jpg);
  transition: 0.5s;
  background-size: cover;
  
  &:hover{
    opacity: 50%;
    transition: 0.5s;
    cursor: pointer;
  }
`

const ModalConent = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.p`
  font-size: 24px;
  letter-spacing: 0px;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 16px;
  font-style: normal;
`


class EntryVideoCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultState:null,
            modalIsVisible: false,
            id:NaN,
            url:props.url,
            title:props.title,
            description:props.description,
            saved:false,
            errors: {
                url:false,
                title:false,
                description:false,
            }
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.isFormValid = this.isFormValid.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const defaultState = {
            title:nextProps.title,
            url:nextProps.url,
            description:nextProps.description,
            id:nextProps.id
        }
        this.setState({
            defaultState:defaultState,
            title:nextProps.title,
            url:nextProps.url,
            description:nextProps.description,
            id:nextProps.id
        })
    }


    saveChanges(){
        const isValid = this.isFormValid()
        if(isValid){
            this.setState({saved:true})
            this.props.onSet(
                this.props.id,
                this.state.url,
                this.state.title,
                this.state.description,
            )
            this.toggleModal()
        }
    }

    isFormValid(){
        let errors =  {
            url:false,
            title:false,
            description:false,
        }
        this.setState({saved:false})


        if(!this.isUrlValid(this.state.url)){
            errors.url = true
        }


        if(!this.state.title.trim()){
            errors.title = true
        }
        this.setState({errors:errors})
        for(var val in errors){
            if(errors[val]){
                return false
            }
        }

        return true
    }

    isUrlValid(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    toggleModal = () => {
        if(this.state.modalIsVisible){
            const isValid = this.isFormValid()

            if(!isValid || !this.state.saved){
                this.setState({...this.state.defaultState})
            }
        }
        this.setState(prevState => ({ modalIsVisible: !prevState.modalIsVisible }));
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const { modalIsVisible } = this.state;
        return (
            <div>
                {!this.state.url ?
                    <EmptyVideo  onClick={ this.toggleModal }>
                        <Icon.Plus color='gray' size={48}/>
                        {this.state.youtubeLink}
                    </EmptyVideo>
                    :
                    <CoveredVideo videoId={this.isUrlValid(this.state.url)} onClick={ this.toggleModal }>
                        <Icon.Edit2 color='white' size={48}/>
                        {this.state.youtubeLink}
                    </CoveredVideo>
                }

                <Modal
                    isVisible={ modalIsVisible }
                    toggleModal={ this.toggleModal }
                >
                    <ModalConent>
                        <Title>Вступительный ролик</Title>
                        <Input style={{fontSize:'18px', marginBottom:16}}
                               placeholder='Ссылка на видео YouTube'
                               onChange={this.handleChange}
                               name='url'
                               error={this.state.errors.url}
                               value={this.state.url}
                        />
                        <Input style={{fontSize:'18px', marginBottom:16}}
                               placeholder='Заголовок видео'
                               onChange={this.handleChange}
                               name='title'
                               error={this.state.errors.title}
                               value={this.state.title}
                        />
                        <TextArea
                            name='description'
                            onChange={this.handleChange}
                            defaultValue={this.state.description}
                            style={{fontSize:'18px', resize:'none', height:'150px'}}
                            placeholder='Описание видео'
                        />
                        <Button
                            style={{marginTop:16}}
                            onClick={this.saveChanges}
                        >
                            Сохранить
                        </Button>
                    </ModalConent>
                </Modal>
            </div>
        )
    }
}

export default EntryVideoCard;
