import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import {fetcher} from "../libs/fetch";
import { Container, Row, Col } from "flwww";
import Menu from "../components/menu/Menu";

export default function Home() {
  const { data, error } = useSWR('/api/hello', fetcher)
  console.log(data, error)

  return (
    <div>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header style={{height:100}}>

        </header>
        <main>
            <Container >
                <Row>
                    <Col grid='4'>
                        <Menu />
                    </Col>
                </Row>
            </Container>
        </main>

    </div>
  )
}
