import Router from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../hooks/useUser";
import { Statistic, Container, Row, Col } from "flwww";
import Menu from "../components/menu";
import Head from "next/head";
import Header from "../components/header";
import styles from '../styles/Pages.module.scss'

const cookies = new Cookies();

export default function Dashboard({...props}) {
    const {user, userError}  = useUser()
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })
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
                        {user ?
                            <Row>
                                <Col grid='sm-12 md-12 lg-6 xl-6' >
                                    <div className={styles.col} style={{padding:24, alignItems:'center'}}>
                                        <Statistic
                                            title="Всего пользоваетелей"
                                            value={ 1523 }
                                            prevValue={ 358 }
                                            currency="чел." />
                                    </div>
                                </Col>

                                <Col grid='sm-12 md-12 lg-6 xl-6' >
                                    <div className={styles.col} style={{padding:24, alignItems:'center'}}>
                                        <Statistic
                                            title="Оплаченный кабинет "
                                            value={ 141 }
                                            prevValue={ 12 }
                                            currency="чел." />
                                    </div>
                                </Col>

                            </Row>
                            :
                            'loading'
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

