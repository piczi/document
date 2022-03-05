import '../styles/globals.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }: any) {
  return <ConfigProvider locale={zhCN}>
    <title>奔波尔霸</title>
    <Component {...pageProps} />
  </ConfigProvider>
}

export default MyApp
