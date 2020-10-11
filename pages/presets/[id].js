import Router, {useRouter} from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";

import ReactMde from "react-mde";
import * as Showdown from "showdown";
import 'showdown-youtube'

import {Container, Icon,  Row, Col, Avatar, message, Modal} from "flwww";
import styles from '../../styles/Pages.module.scss'
import Menu from "../../components/menu";
import Head from "next/head";
import Header from "../../components/header";
import * as api from '../../api'
import Input from "../../blocks/Input";
import useAdReffers from "../../hooks/useAdReffers";
import useLeadFunnel from "../../hooks/useLeadFunnel";
import useLandings from "../../hooks/useLandings";
import LandingCard from "../../components/landingcard";
import EntryVideoCard from "../../components/entryvideocard/";
import {mutate} from "swr";
import StudyModuleCard from "../../components/studymodulecard";
import Select from "../../blocks/Select";
import {Button} from "../../blocks";
import React from "react";

const cookies = new Cookies();
const converter = new Showdown.Converter({
    extensions: ['youtube'],
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
});

export default function Funnel() {
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    const {query} = useRouter()
    const {user, userError}  = useUser()
    const [name, setName] = React.useState('')
    const [mode, setMode] = React.useState('')
    const [studyTime, setStudyTime] = React.useState(1)
    const [businessOffer, setBusinessOffer] = React.useState('')
    const [currentTab, setCurrentTab] = React.useState('write')

    const {funnel, mutate:mutateFunnel} = useLeadFunnel(query.id)
    React.useEffect(()=>{if(!name){setName(funnel?.name)}}, [funnel])
    React.useEffect(()=>{if(!mode){setMode(funnel?.mode)}}, [funnel])
    React.useEffect(()=>{setStudyTime(funnel?.study_time / 3600 / 24)}, [funnel])
    React.useEffect(()=>{if(!businessOffer){setBusinessOffer(funnel?.business_offer)}}, [funnel])


    React.useEffect(() => {
        if(name && businessOffer){
            api.partner.editLeadFunnel(
                funnel.id,
                name,
                studyTime*3600*24,
                mode,
                funnel.entryVideos,
                businessOffer,
                1,
            )
            mutateFunnel()
        }
    }, [name, mode, studyTime, businessOffer])



    async function updateEntryVideos(index, url, title, description){
        await api.partner.editLeadFunnel(
            funnel.id,
            funnel.name,
            studyTime*3600*24,
            funnel.mode,
            [...funnel.entryVideos.slice(0, index), {title,url,description}, ...funnel.entryVideos.slice(index+1, funnel.entryVideos.length)],
            funnel.business_offer,
            1,
        )
        mutateFunnel()
    }

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
        await api.partner.deleteLeadFunnel(query.id)
        mutate('/partner/funnel/list')
        Router.push('/presets/list')
    }


    let studyModules = funnel?.study_modules?.map(module => (<Col grid='sm-6 md-6 lg-3 xl-3' key={module.id}> <StudyModuleCard onDelete={deleteStudyModule} onSave={(id, name, text) => updateStudyModule(id, name, text)} id={module.id} name={module.name} text={module.text} /></Col>))
    studyModules?.push(<Col grid='sm-6 md-6 lg-3 xl-3' key={'create'}> <StudyModuleCard create onSave={(name, text) => createStudyModule(name, text)}/></Col>)


    return (
        <div>
            <Head>
                <title>Пресет {}</title>
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
                                        <a className={styles.title}>Настройки пресета</a>
                                        <Input
                                            placeholder={'Название воронки'}
                                            name={'name'}
                                            type={'text'}
                                            onChange={e => setName(e.target.value)}
                                            value={name}
                                        />
                                        <Select value={mode} onChange={e => setMode(e.target.value)} style={{marginTop:16, background:'white'}}>
                                            <option value={0}>
                                                Ручная
                                            </option>
                                            <option value={1}>
                                                Автоматическая
                                            </option>
                                        </Select>
                                        <Select value={studyTime} onChange={e => setStudyTime(e.target.value)} style={{marginTop:16, background:'white'}}>
                                            <option value={1}>
                                                1 сутки
                                            </option>
                                            <option value={2}>
                                                2 суток
                                            </option>
                                            <option value={3}>
                                                3 суток
                                            </option>
                                            <option value={4}>
                                                4 суток
                                            </option>
                                            <option value={5}>
                                                5 суток
                                            </option>
                                            <option value={6}>
                                                6 суток
                                            </option>
                                            <option value={7}>
                                                7 суток
                                            </option>
                                        </Select>
                                    </div>
                                    :
                                    "loading"
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col grid={'12'}>
                                {/* Prevent SSR of flawwwles modal (because it calls document on server) */}
                                {funnel && process.browser ?
                                    <div className={styles.col}>
                                        <a className={styles.title} style={{marginBottom:8}}>Обучающие видео</a>
                                        <Row>
                                            <Col grid='sm-12 md-12 lg-6 xl-6' >
                                                <EntryVideoCard
                                                    title={funnel.entryVideos[0].title}
                                                    description={funnel.entryVideos[0].description}
                                                    url={funnel.entryVideos[0].url}
                                                    onSave={(url,title,description) => updateEntryVideos(0, url, title, description)}
                                                />
                                            </Col>
                                            <Col grid='sm-12 md-12 lg-6 xl-6'>
                                                <EntryVideoCard
                                                    title={funnel.entryVideos[1].title}
                                                    description={funnel.entryVideos[1].description}
                                                    url={funnel.entryVideos[1].url}
                                                    onSave={(url,title,description) => updateEntryVideos(1, url, title, description)}

                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    :
                                    "loading funnel"
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
                            <Col grid={'12'} style={{marginBottom:24}}>
                                <ReactMde
                                    value={businessOffer}
                                    selectedTab={currentTab}
                                    onChange={setBusinessOffer}
                                    onTabChange={setCurrentTab}
                                    generateMarkdownPreview={markdown =>
                                        Promise.resolve(converter.makeHtml(markdown))
                                    }
                                />
                            </Col>
                        </Row>

                        <Row style={{marginBottom:24}}>
                            <Col grid='12'>
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
