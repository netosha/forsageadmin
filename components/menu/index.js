import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import * as Icon from 'react-feather';
import {useRouter} from "next/router";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  flex: 0 0 28.963%;
  flex-direction: column;
  margin: 0px 32px 0px 0px;
  gap: 24px 0px;
`

const PrimaryMenuItemBox = styled.a`
    color: black;
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 64px;
    background: ${props => props.active ? '#f0f0f0' : ''};
    border-radius: 8px;
    padding: 0px 24px;
    margin-bottom: 2px;
    transition: 0.3s;
    &:hover{
      background: #f0f0f0;
    }
`

const PrimaryMenuItemText = styled.a`
    margin: 0px 0px 0px 90px;
    font-size: 18px;
    font-weight: 700;
`


const SecondaryMenuItemBox = styled.a`
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 40px;
    color: #000;
    background: ${props => props.active ? '#f0f0f0' : ''};
    border-radius: 8px;
    padding: 0px 24px;
    margin: 4px 0px;
    transition: 0.3s;
    &:hover{
      background: #f0f0f0;
    }
`


const SecondaryMenuItemText = styled.p`
  margin: 0px 0px 0px 90px;
  font-size: 16px;;
  font-weight: 500;
`

function PartnerMenu({activeLocation, chat}){
    return(
        <Wrapper>
            <Link to='/'>
                <PrimaryMenuItemBox active={activeLocation.startsWith('main')}>
                    <Icon.Briefcase />
                    <PrimaryMenuItemText>
                        Кабинет
                    </PrimaryMenuItemText>
                </PrimaryMenuItemBox>
            </Link>

            <Link to='/way'>
                <SecondaryMenuItemBox active={activeLocation.startsWith('way') || activeLocation.startsWith('funnel') || activeLocation.startsWith('referal')}>
                    <Icon.TrendingUp />
                    <SecondaryMenuItemText>
                        Путь лида
                    </SecondaryMenuItemText>
                </SecondaryMenuItemBox>
            </Link>

            <Link to='/leads'>
                <SecondaryMenuItemBox active={activeLocation.startsWith('lead')}>
                    <Icon.Users />
                    <SecondaryMenuItemText>
                        Лиды
                    </SecondaryMenuItemText>
                </SecondaryMenuItemBox>
            </Link>

            <Link to='/education'>
                <SecondaryMenuItemBox active={activeLocation.startsWith('education')}>
                    <Icon.BookOpen />
                    <SecondaryMenuItemText>
                        Обучение
                    </SecondaryMenuItemText>
                </SecondaryMenuItemBox>
            </Link>

            <Link to='/settings' >
                <SecondaryMenuItemBox active={activeLocation.startsWith('settings')}>
                    <Icon.Settings />
                    <SecondaryMenuItemText>
                        Настройки
                    </SecondaryMenuItemText>
                </SecondaryMenuItemBox>
            </Link>

        </Wrapper>
    )
}

function UserMenu({activeLocation, user, chat}){
    console.log(chat)
    return(
            <Wrapper>
                <Link to='/' >
                    <PrimaryMenuItemBox active={['main', 'introduction','tasks', 'offer'].includes(activeLocation)}>
                        <Icon.BookOpen />
                        <PrimaryMenuItemText>
                            Обучение
                        </PrimaryMenuItemText>
                    </PrimaryMenuItemBox>
                </Link>

                <Link to={'/chat/'+user.connected_partner?.username} >
                    <SecondaryMenuItemBox active={activeLocation.startsWith('chat')}>
                        <Icon.MessageCircle />
                        <SecondaryMenuItemText>
                            Чат  {chat.unreaded ? <a>({chat.unreaded})</a> : ""}
                        </SecondaryMenuItemText>
                    </SecondaryMenuItemBox>
                </Link>

                <Link to='/settings' >
                    <SecondaryMenuItemBox  active={activeLocation.startsWith('settings')}>
                        <Icon.Settings />
                        <SecondaryMenuItemText>
                            Настройки
                        </SecondaryMenuItemText>
                    </SecondaryMenuItemBox>
                </Link>
            </Wrapper>
    )
}

 function Menu({user, chat}) {
    const userType = 'partner'
    const location = useRouter().pathname
    let activeLocation = location === '/' ? 'main' :location.split('/')[1]
    if(userType === 'lead'){
        return (<UserMenu chat={chat} user={user} activeLocation={activeLocation}/>)
    }
    if(userType === 'partner'){
        return (<PartnerMenu chat={chat} activeLocation={activeLocation}/>)
    }

}

export default Menu;