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
                url: "https://image-nest-preview.vercel.app/imgs/backgrounds/weather/clear.jpg",
                width: 2400,
                height: 1600
            }
        ],
        locale: "en_US",
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