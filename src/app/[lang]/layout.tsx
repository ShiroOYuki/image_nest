import '@/app/shared/styles/variables.css'
import '@/app/shared/styles/global.css'

import './page.css'
import styles from './page.module.css'
import mixinStyles from '@/app/shared/styles/mixin.module.css'

import { dir } from 'i18next'

const languages = ["en", "zh-Hant"];

export async function generateStaticParams() {
    const params = languages.map((lang) => ({ lang }));
    console.log("Generated static params:", params);
}

export default function RootLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: {lang: string}
}) {
    const lang = params.lang;

    return (
        <html lang={lang} dir={dir(lang)}>
            <body>
                <div className={`${styles.container} ${mixinStyles.rounded} ${mixinStyles.shadow}`}>
                    {children}
                </div>
            </body>
        </html>
    )
}