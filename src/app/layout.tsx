import '@/app/shared/styles/variables.css'
import '@/app/shared/styles/global.css'

import './page.css'
import styles from './layout.module.css'

export const metadata = {
    title: 'Image Nest',
    description: 'Ciel\'s Dashboard',
    icons: {
        icon: "/imgs/favicon.ico"
    },
    openGraph: {
        title: "Image Nest",
        description: "Ciel\'s Dashboard",
        url: "https://image-nest-preview.vercel.app",
        siteName: "Image Nest",
        images: [
            {
                url: "https://image-nest-preview.vercel.app/favicon.ico",
                width: 256,
                height: 256
            }
        ],
        locale: "zh-tw",
        type: "website"
    }
};

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