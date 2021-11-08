import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import MainWrapper from '../src/components/ui/MainWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainWrapper>
      <Component {...pageProps} />
    </MainWrapper>
  );
}

export default MyApp;
