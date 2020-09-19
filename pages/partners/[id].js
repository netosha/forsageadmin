import Router, {useRouter} from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";
import { Container, Row, Col, Avatar } from "flwww";
import * as pfns from 'phone-fns'
import styles from '../../styles/Pages.module.scss'
import Menu from "../../components/menu";
import Table from "../../components/table";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/header";
import usePartner from "../../hooks/usePartner";
import * as api from '../../api'
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
    const rows = partner?.leads.map(lead => ({
        "Имя":lead.first_name,
        "Фамилия":lead.last_name,
        "Прогресс":api.utils.currentStageName(lead.stage),
        "Телефон":pfns.format('+N (NNN) NNN-NNNN', lead.phone),
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
                                        <a className={styles.title}>{partner.username}</a>
                                        <a>{partner.first_name}</a>
                                        <a>{partner.last_name}</a>
                                        <a>{partner.email}</a>
                                        {partner.instagram ? <Link href={`https://instagram.com/${partner.instagram}`}><a>https://instagram.com/{partner.instagram}</a></Link> : ''}
                                        {partner.telegram ? <Link href={`https://t.me/${partner.telegram}`}><a>https://t.me/{partner.telegram}</a></Link> : ''}
                                        <a>{pfns.format('+N (NNN) NNN-NNNN', partner.phone)}</a>
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
                        </Row>
                        <Row>
                            <Col grid={'12'}>
                                {partner?.leads ?
                                    <div className={styles.table}>
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
