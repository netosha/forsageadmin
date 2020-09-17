import Router from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../hooks/useUser";
import { Container, Row, Col } from "flwww";
import Menu from "../components/menu";
import Head from "next/head";
import Header from "../components/header";

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
                    <Col grid='sm-12 md-12 lg-8 xl-8' style={{background:'#f0f0f0'}}>
                        <div>
                            {user ? user.username : 'loading'}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

