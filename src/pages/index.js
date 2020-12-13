import React from 'react'
import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import {fetchGitHubInformation, gitHubUserData, gitHubRepoData, gitDefaultValue} from "../components/github";
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from "../components/github.module.css";

import Search from "../components/search";
import {searchRepos} from '../services/githubService'

const Home = ({ allPostsData, profileData, repoData }) => {

    const [searchText, setSearchText] = useState('')
    const [language, setLanguage] = useState('')
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false);

    // receives text and sets seerach text, loads repos
    const onSearchTextChange = (text) => {
        // has to calculate the argument text, not the search text function til load repos below
        setSearchText(text);
        loadRepos(text, language);
    };

    const onLanguageChange = (language) => {
        // will take the closest language from the function arguments
        setLanguage(language);
        loadRepos(searchText, language);
    };

    const loadRepos = async (searchText, language) => {
        setLoading(true);
        const res = await searchRepos(searchText, language);
        setLoading(false);
        setRepos(res.data.items);
    }

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Hello, I'm <strong>Joem</strong>. I'm currently enrolled in a Full Stack Software Development
                    Diploma and
                    actively pursuing an entry into the tech industry. You can find some work samples on <a
                    href="https://github.com/israelias">my GitHub</a>.
                </p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({id, date, title}) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br/>
                            <small className={utilStyles.lightText}>
                                <Date dateString={date}/>
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>View My GitHub Projects</h2>
                <Link href={`/projects`} className={utilStyles.lightText}>Projects</Link>
                <div className={utilStyles.centerForm}>

                    <h2 className={utilStyles.headingLg}>
                        {profileData.name}
                        <span className={styles.smallName}>
                            (@
                            <a
                                href={profileData.html_url}
                                target="_blank">
                            {profileData.login}
                            </a>
                            )
                        </span>
                    </h2>
                    <div className={styles.ghContent}>
                        <div className={styles.avi}>
                            <a
                                href={profileData.html_url}
                                target="_blank">
                                <img src={profileData.avatar_url}
                                     width="80"
                                     height="80"
                                     alt={profileData.login}
                                />
                            </a>
                        </div>
                        <p>
                            Followers: {profileData.followers} - Following {profileData.following}
                            <br/>
                            Repos: {profileData.public_repos}
                        </p>
                        <ul className={utilStyles.list}>
                            <li className={utilStyles.listItem} key={repoData.id}>
                                <a href={repoData.repo_url} target={`_blank`}>
                                </a>
                                <br/>
                                <small className={utilStyles.lightText}>
                                    {repoData.name}
                                </small>
                            </li>
                            {/*{repoData.[name].map(({ repo }) => (*/}
                            {/*<li className={utilStyles.listItem} key={id}>*/}
                            {/*    <a href={repo.html_url} target={`_blank`}>*/}
                            {/*    </a>*/}
                            {/*    <br/>*/}
                            {/*    <small className={utilStyles.lightText}>*/}
                            {/*        {repo.name}*/}
                            {/*    </small>*/}
                            {/*</li>*/}
                            {/*))}*/}
                        </ul>
                    </div>
                    <div>
                        <Search
                            searchText={searchText}
                            language={language}
                            onSearchTextChange={onSearchTextChange}
                            onLanguageChange={onLanguageChange}
                        />
                        {loading ? 'Loading...' : <div>{JSON.stringify(repos, null, 2)}</div>}
                    </div>

                </div>
            </section>
            {/*<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>*/}
            {/*    <h2 className={utilStyles.headingLg}>View My GitHub Projects</h2>*/}
            {/*    <p className={utilStyles.lightText}>You can also search on other user profiles</p>*/}
            {/*    <div className={utilStyles.centerForm}>*/}
            {/*        <input type="text" id="ghUsername" defaultValue={gitDefaultValue} onInput={fetchGitHubInformation} />*/}
            {/*        <div id="ghUserData">{gitHubUserData}</div>*/}
            {/*        <div id="ghRepoData">{gitHubRepoData}</div>*/}
            {/*    </div>*/}
            {/*</section>*/}



        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    const res = await axios.get('https://api.github.com/users/israelias');
    const rep = await axios.get('https://api.github.com/users/israelias/repos');

    let repoData = []
    for (let i = 0; i < rep.length; i++) {
        repoData.push( {
            id: rep.data[i][0].id,
            name: rep.data[i].name,
            repo_url: rep.data[i].html_url
        })

        // reposList.push(
        //     {repoName: repos[i].name, repoLink: repos[i].html_url}
        // )
    }

    let profileData = {
        name: res.data.name,
        login: res.data.login,
        avatar_url: res.data.avatar_url,
        html_url: res.data.html_url,
        following: res.data.following,
        public_repos: res.data.public_repos,
        followers: res.data.followers,

    }

    return {
        props: {
            allPostsData,
            profileData,
            repoData
            // value: res.data.value
            // name: res.data.name
        }
    }
}

export default Home