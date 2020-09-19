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
import useAdReffers from "../../hooks/useAdReffers";

const cookies = new Cookies();

export default function List() {
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    const {user, userError}  = useUser()
    const {adreffers, adreffersError } = useAdReffers()


    console.log(adreffers, adreffersError)

    let adreffersCards = adreffers?.map(adreffer => (
        <Col grid='sm-12 md-12 lg-4 xl-4' key={adreffer.id}>
            <Link href={'/adreffer/'+adreffer.id}>
                <div className={styles.funnelCard} style={{marginBottom:16}}>
                    <a className={styles.title} style={{marginBottom:0}}>
                        {adreffer.name}
                    </a>
                    <a className={styles.description}>
                        Цена за лида: {adreffer.price}
                    </a>
                </div>
            </Link>

        </Col>
    ))

    //
    // funnelCards?.push(
    //     <Col grid={'4'}>
    //         <Link href={'/funnels/new'} >
    //             <div className={styles.funnelCard} style={{marginBottom:16,alignItems:'center', justifyContent:'center'}}>
    //                 <Icon.Plus size={48} color={'#555555'} />
    //             </div>
    //         </Link>
    //     </Col>
    // )

    return (
        <div>
            <Head>
                <title>Список рефералок</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header style={{marginBottom:32}} />
            <Container >
                <Row>
                    <Col grid='sm-12 md-12 lg-4 xl-4'>
                        <Menu />
                    </Col>
                    <Col grid='sm-12 md-12 lg-8 xl-8' >
                        <Row>
                            {adreffersCards}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
