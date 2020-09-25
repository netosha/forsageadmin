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
import {Button} from '../../blocks/'
import StudyModuleCard from "../../components/studymodulecard/";
import EntryVideoCard from "../../components/entryvideocard";
import Select from "../../blocks/Select";
const cookies = new Cookies();

export default function New() {
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })
    const {user, userError}  = useUser()
    const {query} = useRouter()
    const [name, setName] = React.useState('')
    const [studyModules, setStudyModules] = React.useState([])
    const [entryVideos, setEntryVideos] = React.useState([])
    const [mode, setMode] = React.useState(0)
    const [studyTime, setStudyTime] = React.useState(1)

    function createStudyModule(name, text){
        setStudyModules([...studyModules, {name, text}])
    }

    function editStudyModule(index, name, text){
        setStudyModules([...studyModules.slice(0, index),
            {
                name,
                text
            },
            ...studyModules.slice(index+1, studyModules.length)
        ])
    }

    function deleteStudyModule(index){
        setStudyModules([...studyModules.slice(0, index), ...studyModules.slice(index+1, studyModules.length)])
    }

    function editEntryVideos(index, url, title, description){
        setEntryVideos([...entryVideos.slice(0, index),
            {
                url,
                title,
                description,
            },
            ...entryVideos.slice(index+1, entryVideos.length)
        ])
    }

    async function createFunnel(){
        const funnel = await api.partner.createLeadFunnel(name, studyTime*3600*24, mode, entryVideos, 'business_offer', 1)
        console.log(funnel)
        const createdStudyModules = await Promise.all(studyModules.map(module => api.partner.createStudyModule(module.name, module.text)))
        const order = createdStudyModules.map(module => ({id:module.id}))
        await api.partner.setStudyModuleOrder(funnel.id, order)
        Router.push('/presets/list')
    }

    let studyModuleCards = studyModules.map((module, index) => (<Col grid={"3"} key={module.name}> <StudyModuleCard onDelete={deleteStudyModule} onSave={editStudyModule} id={index} name={module.name} text={module.text} /></Col>))
    studyModuleCards.push(<Col grid={"3"} key={'create'}> <StudyModuleCard create onSave={(name, text) => createStudyModule(name, text)}/></Col>)
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
                                <div className={styles.col}>
                                    <a className={styles.title}>Настройки воронки</a>
                                    <div></div>
                                    <Input
                                        name={'name'}
                                        type={'text'}
                                        placeholder={'Название воронки'}
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                    />
                                    <Select value={mode} onChange={e => setMode(e.target.value)} style={{marginTop:16, background:'white'}}>
                                        <option>
                                            Автоматическая
                                        </option>
                                        <option>
                                            Ручная
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
                            </Col>
                        </Row>


                        <Row>
                            <Col grid={'12'}>
                                {/* Prevent SSR of flawwwles modal (because it calls document on server) */}
                                {process.browser ?
                                    <div className={styles.col}>
                                        <a className={styles.title} style={{marginBottom:8}}>Обучающие видео</a>
                                        <Row>
                                            <Col grid='sm-12 md-12 lg-6 xl-6'>
                                                <EntryVideoCard
                                                    title={entryVideos?.[0]?.title}
                                                    description={entryVideos?.[0]?.description}
                                                    url={entryVideos?.[0]?.url}
                                                    onSave={(url,title,description) =>{editEntryVideos(0, url, title, description)}}
                                                />
                                            </Col>
                                            <Col grid='sm-12 md-12 lg-6 xl-6'>
                                                <EntryVideoCard
                                                    title={entryVideos?.[1]?.title}
                                                    description={entryVideos?.[1]?.description}
                                                    url={entryVideos?.[1]?.url}
                                                    onSave={(url,title,description) =>{editEntryVideos(1, url, title, description)}}
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
                                <div className={styles.col}>
                                    <a className={styles.title}>Обучающие модули</a>
                                    <Row>
                                        {/* Prevent SSR of flawwwles modal (because it calls document on server) */}
                                        {process.browser ? studyModuleCards : ''}
                                    </Row>
                                </div>
                            </Col>
                        </Row>


                        <Row>
                            <Col grid={"12"}>
                                {name.length && studyModules.length && entryVideos.length == 2 ?
                                    <Button onClick={() => createFunnel()}>
                                        Создать
                                    </Button>
                                    :
                                    ""
                                }

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
