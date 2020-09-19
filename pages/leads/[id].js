import Router, {useRouter} from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";
import { Container, Row, Col, Avatar, message } from "flwww";
import * as pfns from 'phone-fns'
import styles from '../../styles/Pages.module.scss'
import Menu from "../../components/menu";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/header";
import useLead from "../../hooks/useLead";
import {Button} from '../../blocks/'
import * as api from '../../api'
const cookies = new Cookies();

export default function Lead() {
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    const {user, userError}  = useUser()

    const {query} = useRouter()
    const {lead, error}  = useLead(query.id)


    // Make lead partner
    async function applyLeadToPartner(){
        const resp = api.admin.applyLeadToPartner(query.id).then(r => r.status == 'ok' ? Router.push('/partners/'+query.id) : Error(r)).catch(r => message(r?.data?.error, 'error'))
    }

    return (
        <div>
            <Head>
                <title>Профиль {lead?.email}</title>
            </Head>
            <Header style={{marginBottom:32}} />
            <Container >
                <Row>
                    <Col grid='sm-12 md-12 lg-4 xl-4'>
                        <Menu />
                    </Col>
                    <Col grid='sm-12 md-12 lg-8 xl-8'>
                        <Row style={{marginBottom:24}}>
                            <Col grid='sm-12 md-12 lg-6 xl-6'>
                                {lead && !error ?
                                    <div className={styles.col}>
                                        <a className={styles.title}>{lead.username}</a>
                                        <a>{lead.first_name}</a>
                                        <a>{lead.last_name}</a>
                                        <a>{lead.email}</a>
                                        <a>{pfns.format('+N (NNN) NNN-NNNN', lead.phone)}</a>
                                        {lead.instagram ? <Link href={`https://instagram.com/${lead.instagram}`}><a>https://instagram.com/{lead.instagram}</a></Link> : ''}
                                        {lead.telegram ? <Link href={`https://t.me/${lead.telegram}`}><a>https://t.me/{lead.telegram}</a></Link> : ''}
                                    </div>
                                    :
                                    'loading'
                                }
                            </Col>
                            <Col grid='sm-12 md-12 lg-6 xl-6'>
                                {lead && !error ?
                                    <Link href={'/partners/'+lead.connected_partner.id}>
                                        <a className={styles.col}>
                                            <a className={styles.title}>Партнер</a>
                                            <a >{lead.connected_partner.first_name} {lead.connected_partner.last_name}</a>
                                        </a>
                                    </Link>
                                    :
                                    'loading'
                                }
                            </Col>

                        </Row>
                        <Row>
                            <Col grid='sm-12 md-12 lg-6 xl-6'>
                                {lead && !error ?
                                    <div className={styles.col}>
                                        <a className={styles.title}>Обучение</a>
                                        <a style={{paddingBottom:8}}>{api.utils.currentStageName(lead.stage)}</a>
                                        {lead.stage == 6 ? <Button onClick={applyLeadToPartner}>Сделать партнером</Button> : ''}
                                        {/*{lead.stage == 3 ? <Button>Открыть обучение</Button> : ''}*/}
                                    </div>
                                    :
                                    'loading'
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
