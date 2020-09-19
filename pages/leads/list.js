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
import {Select} from "../../blocks";

const cookies = new Cookies();

export default function List() {
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    const {user, userError}  = useUser()
    const {leads, leadsError } = useLeads()
    const [filter, setFilter] = React.useState('any')

    React.useEffect(()=>{console.log(leadsError)}, [leadsError])

    // Define columns of table
    const columns = [ "Имя", "Фамилия", "Телефон", "Прогресс"];
    const filteredLeads = filter === 'any' ? leads : leads.filter(lead => lead.stage == filter)

    const rows = filteredLeads?.map(lead => ({
        "Имя":lead.first_name,
        "Фамилия":lead.last_name,
        "Прогресс":api.utils.currentStageName(lead.stage),
        "Телефон":pfns.format('+N (NNN) NNN-NNNN', lead.phone),
        // Meta info
        id:lead.id,
        onClick:() => {Router.push('/leads/'+lead.id)},
        active:lead.stage == 6,
    }))

    return (
        <div>
            <Head>
                <title>Список лидов</title>
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
                            <Col grid={'12'} style={{marginBottom:16}}>
                                <Select
                                    value={filter}
                                    onChange={e => setFilter(e.target.value)}
                                >
                                    <option value={'any'}>Любая стадия</option>
                                    <option value={0}>{api.utils.currentStageName(0)}</option>
                                    <option value={1}>{api.utils.currentStageName(1)}</option>
                                    <option value={2}>{api.utils.currentStageName(2)}</option>
                                    <option value={3}>{api.utils.currentStageName(3)}</option>
                                    <option value={4}>{api.utils.currentStageName(4)}</option>
                                    <option value={5}>{api.utils.currentStageName(5)}</option>
                                    <option value={6}>{api.utils.currentStageName(6)}</option>
                                </Select>
                            </Col>
                        </Row>
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
