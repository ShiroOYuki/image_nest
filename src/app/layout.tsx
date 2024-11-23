import '@/app/shared/styles/variables.css'
import '@/app/shared/styles/global.css'

import './page.css'
import styles from './layout.module.css'

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body>
                <div className={`${styles.container}`}>
                    {children}
                </div>
            </body>
        </html>
    )
}