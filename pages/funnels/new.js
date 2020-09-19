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
const cookies = new Cookies();

export default function Lead() {
    const {user, userError}  = useUser()
    React.useEffect(() => {
        if(!cookies.get('token')){
            Router.push('/login')
        }
    })

    const {query} = useRouter()
    const [name, setName] = React.useState('')
    const [studyModules, setStudyModules] = React.useState([])

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

    async function createFunnel(){
        const funnel = await api.admin.createPartnerFunnel(name)
        const createdStudyModules = await Promise.all(studyModules.map(module => api.partner.createStudyModule(module.name, module.text)))
        const order = createdStudyModules.map(module => ({id:module.id}))
        api.partner.setStudyModuleOrder(funnel.id, order)

        Router.push('/funnels/list')
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
                        <Row style={{marginBottom:24}}>
                            <Col grid='12'>
                                <div className={styles.col}>
                                    <a className={styles.title}>Настройки воронки</a>
                                    <Input
                                        name={'name'}
                                        type={'text'}
                                        placeholder={'Название воронки'}
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row style={{marginBottom:24}}>
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
                                {name.length && studyModules.length ?
                                    <Button onClick={createFunnel}>
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
