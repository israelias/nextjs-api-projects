import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

// Layout component to render this page
// use dangerouslysetinnnerhtml to render parsed .md

const Post = ({ postData }) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date}/>
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </Layout>
    )
}

// getStaticProps fetches necessary data for the post with id
// use getPostData inside getStaticProps to get the post data and return it as props
// use await when calling getpostdata, for remark

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

// getStaticPaths returns an array of possible values for id
// use getAllPostIds inside getStaticPaths to get an array of known paths.
// this includes the params defined by pages/posts/[id].js

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export default Post