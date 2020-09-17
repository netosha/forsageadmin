
import Router from 'next/router'
import React from "react";
import Head from "next/head";
import {Col, Container, Row} from "flwww";
import Menu from "../components/menu";
import useUser from "../hooks/useUser";
import Header from "../components/header";

export default function Profile() {
    const [name, setName] = React.useState()
    const { user, error, isValidating, mutate }  = useUser()

    React.useEffect(() => {
        if(!user){
            Router.replace('/')
        }
    }, user);

    return (
        <div>
            <Head>
                <title>Партнеры</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
