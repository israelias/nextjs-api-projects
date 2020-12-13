import utilStyles from "../styles/utils.module.css";
import styles from './github.module.css'
import Link from "next/link";
import Date from "./date";

function userInformationHTML(user) {
    return (
        <>
            <h2 className={utilStyles.headingLg}>
                {user.name}
                <span className={styles.smallName}>
                    (@
                    <a
                        href={user.html_url}
                        target="_blank">
                    {user.login}
                    </a>
                    )
                </span>
            </h2>
            <div className={styles.ghContent}>
                <div className={styles.avi}>
                    <a
                        href={user.html_url}
                        target="_blank">
                        <img src={user.avatar_url}
                             width="80"
                             height="80"
                             alt={user.login}
                        />
                    </a>
                </div>
                <p>
                    Followers: {user.followers} - Following {user.following}
                    <br />
                    Repos: {user.public_repos}
                </p>
            </div>
        </>
    )
}

function repoInformationHTML(repos) {
    if (repos.length === 0) {
        return (
            <div className={`${styles.repoList} ${utilStyles.clearFix}`}>
                No repos!
            </div>
        );
    }

    let reposList = []
    for (let i = 0; i < repos.length; i++) {
        var repoName = repos[2];
        var repoHTML = repos[6];
        reposList.push(
            {repoName: repos[i].name, repoLink: repos[i].html_url}
        )
    }

    let listItemsHTML = reposList.map(({repoName, repoLink}) => (
            <li className={utilStyles.listItem} key={id}>
                <a href={repoLink} target={`_blank`}>
                </a>
                <br/>
                <small className={utilStyles.lightText}>
                    {repoName}
                </small>
            </li>
        ))


    return (
        <div className={`${styles.repoList} ${utilStyles.clearFix}`}>
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    {listItemsHTML.join("\n")}
                </ul>
            </div>
    );
}

export var gitHubUserData = "";
export var gitHubRepoData = "";
export var gitDefaultValue = "israelias";

export function fetchGitHubInformation(event) {
    // let gitHubUserData = "";
    // let gitHubRepoData = "";

    let username = gitDefaultValue;
    if (!username) {
        gitHubUserData = (<h2>Please enter a GitHub username</h2>);
        return;
    }

    gitHubUserData = (
        <div id="loader">
            <img
                src="/public/loader.gif"
                alt="loading..."
            />
        </div>
    );

    let reqHeader = new Headers();
    reqHeader.append('Content-Type', 'text/json');

    let initObject = {
        method: 'GET', headers: reqHeader,
    };

    var userRequest = new Request(`https://api.github.com/users/${username}`, initObject);
    var repoRequest = new Request(`https://api.github.com/users/${username}/repos`, initObject);

    async function getInitialProps() {
        const responseUser = await fetch(userRequest)
        const responseRepo = await fetch(repoRequest)
        const userData = await responseUser.json()
        const repoData = await responseRepo.json()

        if (!userData) {
            return {
                notFound: true,
            }
        }

        gitHubUserData = userInformationHTML(userData);

        return {
            props: {
                gitHubUserData
            }, // will be passed to the page component as props
        }
    }

    // fetch(userRequest)
    //     .then(function (response) {
    //         if (!response.ok) {
    //             throw new Error('Network response was not OK');
    //         }
    //         response = response.json();
    //         return response;
    //     })
    //     .then(function (response) {
    //         let userData = response[0];
    //         gitHubUserData = userInformationHTML(userData);
    //     })
    //     .catch(function (err) {
    //         if (err.status === 404) {
    //             gitHubUserData = <h2>No info found for user {username}</h2>;
    //         } else if (err.status === 403) {
    //             let resetTime = new Date(err.getResponseHeader('X-RateLimit-Reset') * 1000);
    //             gitHubUserData = <h4>Too many requests, please wait until {resetTime.toLocaleTimeString()}</h4>;
    //         } else {
    //             console.log(err);
    //             gitHubUserData = <h2>Error: {err.message}</h2>;
    //         }
    //     });

    // fetch(repoRequest)
    //     .then(function (response) {
    //         if (!response.ok) {
    //             throw new Error('Network response was not OK');
    //         }
    //         response = response.json();
    //         return response;
    //     })
    //     .then(function (response) {
    //         let repoData = response[0];
    //         gitHubRepoData = repoInformationHTML(repoData);
    //     })
    //     .catch(function (err) {
    //         if (err.status === 404) {
    //             gitHubRepoData = <h6>No repos found for user {username}</h6>;
    //         } else if (err.status === 403) {
    //             gitHubRepoData = <h4>Too many requests</h4>;
    //         } else {
    //             console.log(err);
    //             gitHubRepoData = <h2>Error: {err.message}</h2>;
    //         }
    //     });


    // $.when(
    //     $.getJSON(`https://api.github.com/users/${username}`),
    //     $.getJSON(`https://api.github.com/users/${username}/repos`)
    // ).then(
    //     function (firstResponse, secondResponse) {
    //         var userData = firstResponse[0];
    //         var repoData = secondResponse[0];
    //         $("#gh-user-data").html(userInformationHTML(userData));
    //         $("#gh-repo-data").html(repoInformationHTML(repoData));
    //     },
    //     function (errorResponse) {
    //         if (errorResponse.status === 404) {
    //             $("#gh-user-data").html(
    //                 `<h2>No info found for user ${username}</h2>`);
    //         } else if (errorResponse.status === 403) {
    //             var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
    //             $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
    //         } else {
    //             console.log(errorResponse);
    //             $("#gh-user-data").html(
    //                 `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
    //         }
    //     });
}

// $(document).ready(fetchGitHubInformation);