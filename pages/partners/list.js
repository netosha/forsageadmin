import Router from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";
import { Container, Row, Col, TopLoader, message } from "flwww";
import Menu from "../../components/menu";
import Table from "../../components/table";
import Head from "next/head";
import Header from "../../components/header";
import usePartners from "../../hooks/usePartners";
import * as pfns from 'phone-fns'
import styles from '../../styles/Pages.module.scss'


const cookies = new Cookies();

export default function List() {
    const {user, userError, isUserLoading}  = useUser()
    const {partners, partnersError, isPartnersLoading } = usePartners()

    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    // Define columns of table
    const columns = [ "Имя", "Фамилия", "Телефон", "Оплачено до"];
    const rows = partners?.map(partner => ({
        "Имя":partner.first_name,
        "Фамилия":partner.last_name,
        "Оплачено до":(() => {return new Date(partner.paid_until).toLocaleDateString()})(),
        "Телефон":pfns.format('+N (NNN) NNN-NNNN', partner.phone),

        // Meta info
        id:partner.id,
        onClick:() => {Router.push('/partners/'+partner.id)}
    }))

    return (
        <div>
            <Head>
                <title>Партнеры</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header style={{marginBottom:32}} />
            <Container >
                <Row>
                    <Col grid='sm-12 md-12 lg-4 xl-4'>
                        <Menu />
                    </Col>
                    <Col grid='sm-12 md-12 lg-8 xl-8' style={{padding:0}}>
                        <div className={styles.table}>
                            {partners ?
                                <Table
                                    bordered
                                    rows={rows}
                                    columns={columns}
                                />
                                :
                               'loading'
                            }

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
