import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout, {siteTitle} from '../components/layout'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from "../components/search";
import { searchRepos } from '../services/githubService'
import RepoList from "../components/repo-list";
import { getRandomWord } from "../helpers/randomWord.helper";
import Navbar from "../components/navbar";
import styles from "./projects.module.scss"

const Projects = (props) => {
    const [searchText, setSearchText] = useState(props.searchText)
    const [language, setLanguage] = useState('')
    const [repos, setRepos] = useState(props.repos)
    const [loading, setLoading] = useState(false);

    // receives text and sets seerach text, loads repos
    const onSearchTextChange = (text) => {
        // has to calculate the argument text, not the search text function til load repos below
        setSearchText(text);
        // before loading repos, check if text is empty
        if (text) {
            loadRepos(text, language);
        }
    };

    const onLanguageChange = (language) => {
        // will take the closest language from the function arguments
        setLanguage(language);
        loadRepos(searchText, language);
    };

    const loadRepos = async (searchText, language) => {
        setLoading(true);
        const res = await searchRepos(searchText, language);

        // no value in res yet because of cancel helper... so
        // if there's a response, and there's data in the response, set loading to false and load repos
        if (res && res.data) {
            setLoading(false);
            setRepos(res.data.items);
        }
    }

    return (
        <div>
            <Head>
                <title>GitHub Repos</title>
            </Head>
            <Navbar />
            <div className={`${styles.page} ${styles.container}`}>
                <img className={styles.logo} src="/img/study.svg" />
                <Search
                    searchText={searchText}
                    language={language}
                    onSearchTextChange={onSearchTextChange}
                    onLanguageChange={onLanguageChange}
                />
                <RepoList loading={loading} repos={repos} />
            </div>
            <style jsx>{`
                .page {
                margin: 20px 15px 20px 15px;
            }
            `}</style>
        </div>
    );
};

export const getServerSideProps = async () => {
    const searchText = getRandomWord();
    const res = await searchRepos(searchText);
    return {
        props: {
            searchText: searchText,
            repos: res.data.items
        }
    };
};


export default Projects;