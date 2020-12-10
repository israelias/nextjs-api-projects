import '../styles/global.css'
import '../scss/styles.scss'

function App ({ Component, pageProps }) {
    return (
        <div>
            <Component {...pageProps} />
        </div>
    );
}

export default App;