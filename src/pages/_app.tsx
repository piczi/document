import '../styles/globals.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }: any) {
  return <ConfigProvider locale={zhCN}>
    <Component {...pageProps} />
  </ConfigProvider>
}

export default MyApp
