import Router, {useRouter} from 'next/router'
import { Cookies } from 'react-cookie';
import useUser from "../../hooks/useUser";
import {Container, Row, Col, Avatar, message, Modal} from "flwww";
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
const cookies = new Cookies();

export default function AdReffer() {
    // Redirect to login page if user unauthorized
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })


    const {query} = useRouter()
    const {user, userError}  = useUser()
    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [studyTime, setStudyTime] = React.useState('')

    const {adreffers, adreffersError} = useAdReffers()
    const {landings, landingsError} = useLandings()

    const adreffer = adreffers?.find(x => x.id == query.id)
    const {funnel, funnelError, mutate:mutateFunnel} = useLeadFunnel(adreffer?.default_funnel.id)

    React.useEffect(()=>{setName(adreffer?.name)}, [adreffer])
    React.useEffect(()=>{setPrice(adreffer?.price)}, [adreffer])
    React.useEffect(()=>{setStudyTime(funnel?.study_time / 3600 / 24)}, [funnel])

    React.useEffect(() => {
        if(name && price){
            api.admin.editLandingReffer(query.id, adreffer.landing.id, name, price, adreffer.default_funnel.id)
        }
    }, [name, price])
    
    React.useEffect(() => {if(funnel){updateStudyTime()}}, [studyTime])

    async function updateEntryVideos(index, url, title, description){
        await api.partner.editLeadFunnel(
            funnel.id,
            funnel.name,
            funnel.study_time,
            funnel.mode,
            [...funnel.entryVideos.slice(0, index), {title,url,description}, ...funnel.entryVideos.slice(index+1, funnel.entryVideos.length)],
            funnel.business_offer,
            0
        )
        mutateFunnel()
    }

    async function updateStudyTime(){
        await api.partner.editLeadFunnel(
            funnel.id,
            funnel.name,
            studyTime * 3600 * 24,
            funnel.mode,
            funnel.entryVideos,
            funnel.business_offer,
            0
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
        await api.partner.setStudyModuleOrder(adreffer.default_funnel.id, order)
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

    async function applyPartner(partner_id){
        await api.admin.applyPartnerToNextStage(query.id, partner_id)
        mutateFunnel()
    }
    console.log(funnel)
    let studyModules = funnel?.study_modules?.map(module => (<Col grid='sm-6 md-6 lg-3 xl-3' key={module.id}> <StudyModuleCard onDelete={deleteStudyModule} onSave={(id, name, text) => updateStudyModule(id, name, text)} id={module.id} name={module.name} text={module.text} /></Col>))
    studyModules?.push(<Col grid='sm-6 md-6 lg-3 xl-3' key={'create'}> <StudyModuleCard create onSave={(name, text) => createStudyModule(name, text)}/></Col>)


    return (
        <div>
            <Head>
                <title>Рефералка {}</title>
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
                                {adreffer ?
                                    <div className={styles.col}>
                                        <a className={styles.title}>Настройки рефералки</a>
                                        <Input
                                            placeholder={'Название рефералки'}
                                            name={'name'}
                                            type={'text'}
                                            onChange={e => setName(e.target.value)}
                                            value={name}
                                            style={{marginBottom:16}}
                                        />
                                        <Input
                                            placeholder={'Цена лида'}
                                            name={'price'}
                                            type={'number'}
                                            onChange={e => setPrice(e.target.value)}
                                            value={price}
                                            style={{marginBottom:16}}

                                        />
                                        <Select value={studyTime} onChange={e => setStudyTime(e.target.value)} style={{backgroundColor:'white'}}>
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
                        <Row style={{marginBottom:16}}>
                            <Col grid={'12'}>
                                {adreffer ?
                                    <div style={{display:'flex',flexDirection: 'column'}}>
                                        <a className={styles.title}>Лендинг</a>
                                        <LandingCard active name={adreffer.landing.name} id={adreffer.landing.id} />
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
                                            <Col grid='sm-12 md-12 lg-6 xl-6'>
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

                        <Row style={{marginBottom:24}}>
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
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
