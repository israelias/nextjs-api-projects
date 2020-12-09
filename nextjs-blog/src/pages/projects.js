import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout, {siteTitle} from '../components/layout'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from "../components/search";
import { searchRepos } from '../services/githubService'

const Projects = (props) => {
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
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div>
                <Search
                    searchText={searchText}
                    language={language}
                    onSearchTextChange={onSearchTextChange}
                    onLanguageChange={onLanguageChange}
                />
                {loading ? 'Loading...' : <div>{JSON.stringify(repos, null, 2)}</div>}
            </div>
        </Layout>
    );
};

export const getServerSideProps = async () => {
    const res = await axios.get('https://api.chucknorris.io/jokes/random');
    return {
        props: {
            value: res.data.value
        }
    };
};


export default Projects