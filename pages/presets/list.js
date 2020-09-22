import Router from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";
import {Container, Row, Col, TopLoader, message} from "flwww";
import * as Icon from 'react-feather'
import Menu from "../../components/menu";
import Head from "next/head";
import cn from 'classnames'
import Header from "../../components/header";
import styles from '../../styles/Pages.module.scss'
import useFunnels from "../../hooks/useFunnels";
import Link from "next/link";
import useLeadFunnels from "../../hooks/useLeadFunnels";

const cookies = new Cookies();

export default function List() {
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    const {user, userError}  = useUser()
    const {funnels, funnelsError } = useLeadFunnels()

    let funnelCards = funnels?.filter(fun => fun.preset).map(funnel => (
        <Col grid='sm-12 md-12 lg-4 xl-4' key={funnel.id}>
            <Link href={'/presets/'+funnel.id}>
                <div className={styles.funnelCard} style={{marginBottom:16}}>
                    <a className={styles.title} style={{marginBottom:0}}>
                        {funnel.name}
                    </a>
                    <a className={styles.description}>
                        Пресет
                    </a>
                </div>
            </Link>

        </Col>
    ))

    funnelCards?.push(
        <Col grid='sm-12 md-12 lg-4 xl-4'>
            <Link href={'/presets/new'} >
                <div className={styles.funnelCard} style={{marginBottom:16,alignItems:'center', justifyContent:'center'}}>
                    <Icon.Plus size={48} color={'#555555'} />
                </div>
            </Link>
        </Col>
    )

    return (
        <div>
            <Head>
                <title>Список воронок</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header style={{marginBottom:32}} />
            <Container >
                <Row>
                    <Col grid='sm-12 md-12 lg-4 xl-4'>
                        <Menu />
                    </Col>
                    <Col grid='sm-12 md-12 lg-8 xl-8'>
                        <Row>
                            {funnelCards}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
