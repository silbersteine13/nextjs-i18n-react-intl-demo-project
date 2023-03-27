import Head from 'next/head'
import { IntlProvider, FormattedMessage } from 'react-intl';
import Spanish from 'https://eric-anil-cdn.s3.us-east-2.amazonaws.com/es.json';
import Arabic from 'https://eric-anil-cdn.s3.us-east-2.amazonaws.com/ar.json';
import English from 'https://eric-anil-cdn.s3.us-east-2.amazonaws.com/en.json';
import React, { useState } from 'react';

const Context = React.createContext();
const locale = typeof window !== 'undefined' ? navigator.language : 'en';
let lang;

(async () => {
  const English = await fetch('https://eric-anil-cdn.s3.us-east-2.amazonaws.com/en.json')
  .then(response => response.json())
  const Spanish = await fetch('https://eric-anil-cdn.s3.us-east-2.amazonaws.com/es.json')
  .then(response => response.json())
  const Arabic = await fetch('https://eric-anil-cdn.s3.us-east-2.amazonaws.com/ar.json')
  .then(response => response.json())

  if (locale === 'ar') {
    lang = Arabic;
    } else if (locale === 'es') {
      lang = Spanish;
    } else {
      lang = English;
    }
})();
  

export default function Home() {
  const [locale, setLocale] = useState(lang);
  const [messages, setMessages] = useState(lang);
  function selectLanguage(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
    if (newLocale === 'en') {
      setMessages(English);
    } else {
      if (newLocale === 'es') {
        setMessages(Spanish);
      } else {
        setMessages(Arabic);
      }
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
    <IntlProvider locale={locale} messages={messages}>
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js</a> on{' '}
          <a href="https://gitpod.io/" style={{ color: '#FFB45B' }}>
            Gitpod!
          </a>
        </h1>
        <h1>
           <FormattedMessage id="key1" defaultMessage="Hello world" /> 
        </h1>
        <h2>
          <FormattedMessage id = "app.channel.plug" defaultMessage="Tutorial brought to you by {blogName}" values = {{blogName: "Lokalise"}} />
        </h2>
        <p>
        <FormattedMessage
   id = "app.header"
   defaultMessage="Edit the files and save to reload"
   values = {{fileName: 'src/App.js', code: (word)=> <code>{word}</code>}}
/>
        </p>
        <p>
        <select value={locale} onChange={selectLanguage}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="ar">Arabic</option>
            </select>
        </p>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>
      

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
            Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
            Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </IntlProvider>
    </Context.Provider>
  )
}
