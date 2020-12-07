import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Hello, I'm <strong>Joem</strong>. I'm currently enrolled in a Full Stack Software Development Diploma and
                    actively pursuing an entry into the tech industry. You can find some work samples on <a
                    href="https://github.com/israelias">my GitHub</a>.
                </p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
        </Layout>
    )
}