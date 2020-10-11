import Router, {useRouter} from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";
import {Container, Row, Col, Avatar} from "flwww";
import * as pfns from 'phone-fns'
import styles from '../../styles/Pages.module.scss'
import Menu from "../../components/menu";
import Table from "../../components/table";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/header";
import usePartner from "../../hooks/usePartner";
import * as api from '../../api'
import useFunnels from "../../hooks/useFunnels";
import * as Icon from 'react-feather'
import {formatPhoneNumberIntl} from "react-phone-number-input";
const cookies = new Cookies();

export default function Partner() {
    const {user, userError}  = useUser()
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    const {query} = useRouter()
    const {partner, error}  = usePartner(query.id)

    // Table of partner leads
    const columns = [ "Имя", "Фамилия", "Телефон", "Прогресс"];
    const {funnels, funnelsError, mutate:mutateFunnels} = useFunnels()

    const partner_funnels = partner ? funnels?.filter(fnl => fnl.partners.find(prtnr => prtnr.id == partner.id && prtnr.stage == -1)) : undefined
    const funnelCards = partner_funnels?.map(fun =>(<Col grid={'12'}><div onClick={() => applyPartner(fun.id)} className={styles.educationFunnnelCard}><a className={styles.text}>{fun.name}</a><Icon.Check size={16} className={styles.icon}/></div></Col>))

    async function applyPartner(funnel_id){
        await api.admin.applyPartnerToNextStage(funnel_id, query.id)
        mutateFunnels()
    }

    const rows = partner?.leads.map(lead => ({
        "Имя":lead.first_name,
        "Фамилия":lead.last_name,
        "Прогресс":api.utils.currentStageName(lead.stage),
        "Телефон":`${formatPhoneNumberIntl("+"+lead.phone)}`,
        // Meta info
        id:lead.id,
        onClick:() => {Router.push('/leads/'+lead.id)}
    }))
    return (
        <div>
            <Head>
                <title>Профиль {partner?.email}</title>
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
                                {partner && !error ?
                                    <div className={styles.col}>
                                        <a className={styles.title}>{partner.email}</a>
                                        <a>{partner.first_name} {partner.last_name}</a>
                                        {partner.instagram ? <Link href={partner.instagram}><a>{partner.instagram}</a></Link> : ''}
                                        {partner.telegram ? <Link href={partner.telegram}><a>{partner.telegram}</a></Link> : ''}
                                        <a>{formatPhoneNumberIntl("+"+partner.phone)}</a>
                                    </div>
                                    :
                                    'loading'
                                }
                            </Col>
                            <Col grid='sm-12 md-12 lg-6 xl-6'>
                                {partner && !error ?
                                    <div className={styles.col}>
                                        <a className={styles.title}>Платежи</a>
                                        <a>
                                            Кабинет акктивен до: {( () => {return new Date(partner.paid_until).toLocaleDateString()} )()}
                                        </a>
                                    </div>
                                    :
                                    'loading'
                                }
                            </Col>
                            <Col grid='sm-12 md-12 lg-6 xl-6'>
                                {partner_funnels?.length && !error ?
                                    <div className={styles.col}>
                                        <a className={styles.title}>Обучение</a>
                                        <Row className={styles.row}>
                                            {funnelCards}
                                        </Row>
                                    </div>
                                    :
                                    ''
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col grid={'12'}>
                                {partner?.leads ?
                                    <div>
                                        <a className={styles.title}>Лиды партнера</a>
                                        <Table
                                            bordered
                                            rows={rows}
                                            columns={columns}
                                        />
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
