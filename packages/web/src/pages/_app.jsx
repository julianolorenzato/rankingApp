import { ThemeProvider } from 'styled-components'

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={{}}>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
