import Router from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";
import { Container, Row, Col, TopLoader, message } from "flwww";
import Menu from "../../components/menu";
import Table from "../../components/table";
import * as api from '../../api'
import Head from "next/head";
import Header from "../../components/header";
import useLeads from "../../hooks/useLeads";
import * as pfns from 'phone-fns'
import styles from '../../styles/Pages.module.scss'
import {Input} from "../../blocks";

const cookies = new Cookies();

export default function List() {
    const {user, userError, isUserLoading}  = useUser()
    const {leads, leadsError } = useLeads()

    const [leadPrice, setLeadPrice] = React.useState(250)

    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    // Define columns of table
    const columns = [ "Имя", "Фамилия", "Телефон", "Прогресс"];
    const rows = leads?.map(lead => ({
        "Имя":lead.first_name,
        "Фамилия":lead.last_name,
        "Прогресс":api.utils.currentStageName(lead.stage),
        "Телефон":pfns.format('+N (NNN) NNN-NNNN', lead.phone),
        // Meta info
        id:lead.id,
        onClick:() => {Router.push('/lead/'+lead.id)}
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
                        <Row>
                            <Col grid={'12'}>
                                <div>
                                    {leads ?
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
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
