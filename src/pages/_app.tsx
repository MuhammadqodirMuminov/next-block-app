import "src/styles/globals.css";
import type { AppProps } from "next/app";
import createEmotionCache from "src/helpers/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/helpers/theme";
import CssBaseline from "@mui/material/CssBaseline";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	);
}
