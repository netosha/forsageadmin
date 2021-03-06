import Router, {useRouter} from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";
import {Container, Row, Col, Avatar, message, Modal} from "flwww";
import styles from '../../styles/Pages.module.scss'
import Menu from "../../components/menu";
import Head from "next/head";
import Header from "../../components/header";
import * as api from '../../api'
import useFunnel from "../../hooks/useFunnel";
import Input from "../../blocks/Input";
import {mutate} from 'swr'
import StudyModuleCard from "../../components/studymodulecard/";
import Table from "../../components/table/";
import {Button} from "../../blocks";
import * as pfns from "phone-fns";
import Select from "../../blocks/Select";
import React from "react";

const cookies = new Cookies();

export default function Funnel() {
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    const {user, userError}  = useUser()

    const {query} = useRouter()
    const {funnel, error, mutate:mutateFunnel} = useFunnel(query.id)
    console.log('funnel from', funnel)
    const [name, setName] = React.useState(funnel?.name)
    const [businessOffer, setBusinessOffer] = React.useState(funnel?.business_offer)
    const [closed, setClosed] = React.useState(undefined)

    React.useEffect(()=>{
        if(!name){
            setName(funnel?.name)
        }
        if(typeof closed === 'undefined'){
            console.log(funnel?.closed)
            setClosed(funnel?.closed)
        }

    }, [funnel])


    React.useEffect(() => {
        (async () => {
            if(name && closed ){
            console.log('funnel changed to', name, closed)
            await api.admin.editPartnerFunnel(
                query.id,
                name,
                closed
            )
            mutateFunnel({...funnel, name, closed})
        }
        })()
    }, [name, closed])

    async function updateStudyModule(id, name, text){
        const resp = await api.partner.updateStudyModule(id, name, text)
        mutateFunnel()
    }

    async function createStudyModule(name, text){
        const resp = await api.partner.createStudyModule(name, text)
        let order = funnel.study_modules.map(module => ({id:module.id}))
        order.push({id:resp.id})
        await api.partner.setStudyModuleOrder(query.id, order)
        mutateFunnel()

    }

    async function deleteStudyModule(id){
        const resp = await api.partner.deleteStudyModule(id)
        mutateFunnel()
    }

    async function deleteFunnel(){
        await api.admin.deletePartnerFunnel(query.id)
        mutate('/admin/partner/partner_funnel/list')
        Router.push('/funnels/list')
    }

    let studyModules = funnel?.study_modules?.map(module => (<Col grid='sm-6 md-6 lg-3 xl-3' key={module.id}> <StudyModuleCard onDelete={deleteStudyModule} onSave={(id, name, text) => updateStudyModule(id, name, text)} id={module.id} name={module.name} text={module.text} /></Col>))
    studyModules?.push(<Col grid='sm-6 md-6 lg-3 xl-3' key={'create'}> <StudyModuleCard create onSave={(name, text) => createStudyModule(name, text)}/></Col>)

    // Init table
    const columns = ['Имя', 'Фамилия','Телефон', 'Стадия']
    const rows = funnel?.partners?.map(partner => (
        {
            'Имя':partner.first_name,
            'Фамилия':partner.last_name,
            'Телефон':pfns.format('+N (NNN) NNN-NNNN', partner.phone),
            'Стадия':api.utils.currentStageName(partner.stage),
            active:partner.stage == -1,
            onClick:() => {Router.push('/partners/'+partner.id)}
        }
        )
    )
    return (
        <div>
            <Head>
                <title>Воронка funnel name</title>
            </Head>
            <Header style={{marginBottom:32}} />
            <Container >
                <Row>
                    <Col grid='sm-12 md-12 lg-4 xl-4'>
                        <Menu />
                    </Col>
                    <Col grid='sm-12 md-12 lg-8 xl-8'>
                        <Row>
                            <Col grid='12'>
                                {funnel ?
                                    <div className={styles.col}>
                                        <a className={styles.title}>Настройки курса</a>
                                        <Input
                                            placeholder={'Название курса'}
                                            name={'name'}
                                            type={'text'}
                                            onChange={e => setName(e.target.value)}
                                            value={name}
                                        />
                                        <Select value={closed} onChange={e => setClosed(e.target.value)} style={{marginTop:16, background:'white'}}>
                                            <option value={false}>
                                                Открытый
                                            </option>
                                            <option value={true}>
                                                Закрытый
                                            </option>
                                        </Select>
                                    </div>
                                    :
                                    "loading"
                                }
                            </Col>
                        </Row>

                        <Row>
                            <Col grid='12'>
                                {funnel?.study_modules ?
                                    <div className={styles.col}>
                                        <a className={styles.title}>Обучающие модули</a>
                                        <Row>
                                            {studyModules}
                                        </Row>
                                    </div>
                                    :
                                    "loading"
                                }
                            </Col>
                        </Row>

                        <Row>
                            <Col grid={"12"}>
                                {funnel ?
                                    <div className={styles.table} style={{marginBottom:24}}>
                                        <Table
                                            bordered
                                            columns={columns}
                                            rows={rows}
                                        />
                                    </div>
                                    :
                                    "loading"
                                }

                            </Col>
                        </Row>

                        <Row>
                            <Col grid={"12"}>
                                {funnel ?
                                    <Button style={{background:'tomato'}} onClick={deleteFunnel}>
                                        Удалить
                                    </Button>
                                    :
                                    "loading"
                                }

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
