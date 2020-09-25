import Router from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../hooks/useUser";
import {Statistic, Container, Row, Col, Icon} from "flwww";
import Menu from "../components/menu";
import Head from "next/head";
import Header from "../components/header";
import styles from '../styles/Pages.module.scss'
import useStatistics from "../hooks/useStatistics";
import Statistics from "../components/statistics";
import React from "react";
import Select from "../blocks/Select";

const cookies = new Cookies();

export default function Dashboard({...props}) {
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    const [period, setPeriod] = React.useState(7)
    const {user, userError}  = useUser()
    const {data, dataError} = useStatistics(period)

    return (
        <div>
            <Head>
                <title>Главная</title>
            </Head>
            <Header style={{marginBottom:32}} />
            <Container >
                <Row>
                    <Col grid='sm-12 md-12 lg-4 xl-4'>
                        <Menu />
                    </Col>
                    <Col grid='sm-12 md-12 lg-8 xl-8'>
                        {data ?
                            <div>
                                <Row style={{marginBottom:16}}>
                                    <Col grid={'12'}>
                                        <Select value={period} onChange={e=>setPeriod(e.target.value)}>
                                            <option value={90}>90 дней</option>
                                            <option value={60}>60 дней</option>
                                            <option value={30}>30 дней</option>
                                            <option value={15}>15 дней</option>
                                            <option value={7}>7 дней</option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col grid='sm-12 md-12 lg-6 xl-6' >
                                        <div className={styles.col} style={{padding:24, alignItems:'center'}}>
                                            <Statistics
                                                title="Зарегестрировано лидов"
                                                currency={'чел.'}
                                                value={ data.users.current_period }
                                                prevValue={ data.users.previous_period }
                                            />
                                        </div>
                                    </Col>

                                    <Col grid='sm-12 md-12 lg-6 xl-6' >
                                        <div className={styles.col} style={{padding:24, alignItems:'center'}}>
                                            <Statistics
                                                title="Оплачено кабинетов"
                                                currency={'каб.'}
                                                value={ data.extended_cabinets.current_period }
                                                prevValue={ data.extended_cabinets.previous_period }
                                            />
                                        </div>
                                    </Col>

                                </Row>
                            </div>

                            :
                            'loading'
                        }
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

