import React, {Component} from "react";
import * as Icon from "react-feather";
import {Modal, message} from "flwww";
import styled from "styled-components";

import ReactMde from "react-mde";
import * as Showdown from "showdown";
import {Button, Input} from "../../blocks/";
import 'showdown-youtube'

const converter = new Showdown.Converter({
    extensions: ['youtube'],
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
});

const Title = styled.p`
  font-size: 24px;
  letter-spacing: 0px;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 16px;
  font-style: normal;
`

const Wrapper = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  
  display: flex;
  flex-shrink: 0;
  padding: 12px;
  min-height: 100px;
  background: ${props => props.selected ? '#115544' : '#80D0C7'};
  border-radius: 8px;
  cursor: pointer;

  transition: 0.5s;
  &:hover{
    transition: 0.5s;
    background: ${props => props.selected ? '#115544' : '#80C0D0'};
  }
  
  @media (max-width: 768px){
    margin-bottom: 16px;
    
    &:nth-last-child(){
      margin-bottom: 0px;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  width:100%;
`

const CreateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  min-height: 100px;
  background: rgba(128, 128, 128, 0.5);
  border-radius: 8px;
  cursor: pointer;
  
  transition: 0.5s;
  &:hover{
    background: rgba(128, 128, 128, 0.3);
    transition: 0.5s;
  }
`


const Name = styled.p`
  color:white;
  font-family: "Montserrat", serif;
  font-size: 18px;
  letter-spacing: 0px;
  line-height: 1.2;
  font-weight: 600;
  font-style: normal;
`


export default class StudyModuleCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text:this.props.text ?? "",
            name:this.props.name ?? '',
            currentTab:'write',
            modalIsVisible: false,

            errors:{
                name:false,
                text:true
            }
        }

        this.saveChanges = this.saveChanges.bind(this)
        this.deleteModule = this.deleteModule.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)

        this.toggleModal = this.toggleModal.bind(this)
    }


    toggleModal = () => {
        this.setState(prevState => ({ modalIsVisible: !prevState.modalIsVisible }));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name:nextProps.name ?? "",
            text:nextProps.text ?? "",
            id:nextProps.id
        })
    }

    handleNameChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    handleTabChange(event){
        this.setState({currentTab: event})
    }

    handleTextChange(event){
        this.setState({text:event})
    }

    saveChanges(){
        if(!this.state.name.trim()){
            this.setState({errors: {name:true}})
            return message("Название не может быть пустым", 'error')
        }

        if(!this.state.text.trim()){
            return message("Текст обучающего модуля не может быть пустым", 'error')
        }

        this.toggleModal()
        if(this.props.create){
            this.props.onSave(this.state.name, this.state.text)
        }
        else{
            this.props.onSave(this.props.id, this.state.name, this.state.text)
        }
    }

    deleteModule(){
        this.props.onDelete(this.props.id)
        this.toggleModal()
    }

    render(){
        const { modalIsVisible } = this.state;
        const {onDelete} = this.props;

        return (
            <div>
                {!this.props.create ?
                    <Wrapper onClick={this.toggleModal}>
                        <Name>
                            {this.props.name.slice(0, 35)}
                        </Name>
                    </Wrapper>
                    :
                    <CreateWrapper onClick={this.toggleModal}>
                        <Icon.Plus color='gray' size={48} />
                    </CreateWrapper>
                }
                <Modal
                    isVisible={ modalIsVisible }
                    toggleModal={ this.toggleModal }
                >
                    <Title>Обучающий модуль</Title>
                    <Input
                        name={'name'}
                        style={{background:"#f0f0f0", width:'100%',marginBottom:8}}
                        onChange={this.handleNameChange}
                        value={this.state.name}
                        error={this.state.errors.name}
                        placeholder={'Название обучающего модуля'}
                    />
                    <ReactMde
                        value={this.state.text}
                        selectedTab={this.state.currentTab}
                        onChange={this.handleTextChange}
                        onTabChange={this.handleTabChange}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(converter.makeHtml(markdown))
                        }
                    />
                    <ButtonWrapper>
                        <Button style={{margin:'16px 16px 0px 0px'}} onClick={this.saveChanges}>Сохранить</Button>
                        {!this.props.create ?
                            <Button style={{marginTop:16,background:'tomato'}} onClick={this.deleteModule}>Удалить</Button>
                            :
                            ""
                        }
                    </ButtonWrapper>

                </Modal>
            </div>
        )
    }
}



function Editor({text}) {
    const [value, setValue] = React.useState(text);
    const [selectedTab, setSelectedTab] = React.useState('write')
    return (
        <div className="container">
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
        </div>
    );
}