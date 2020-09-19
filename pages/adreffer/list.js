import Router from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";
import { Container, Row, Col, TopLoader, message } from "flwww";
import Menu from "../../components/menu";
import Head from "next/head";
import cn from 'classnames'
import Header from "../../components/header";
import styles from '../../styles/Pages.module.scss'
import Link from "next/link";
import useAdReffers from "../../hooks/useAdReffers";

const cookies = new Cookies();

export default function List() {
    const {user, userError}  = useUser()
    const {adreffers, funnelsError } = useAdReffers()

    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })
    console.log(adreffers)

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
                    <Col grid='sm-12 md-12 lg-8 xl-8' style={{padding:0}}>
                        <Row>

                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
