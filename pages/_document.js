


import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html className='dark'>
                <Head>
                    {/* <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" /> */}
                    {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine" /> */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument