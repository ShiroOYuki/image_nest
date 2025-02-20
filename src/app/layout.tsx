import '@/app/shared/styles/variables.css'
import '@/app/shared/styles/global.css'

import './page.css'
import styles from './layout.module.css'

const BASE_URL = "https://image-nest-pi.vercel.app";
const OPENGRAPH_URL = BASE_URL + "/imgs/opengraph";

const webName = 'Image Nest'
const webDescription = 'A minimalist dashboard that keeps you informed and inspired with time and weather at a glance.'

export const metadata = {
    title: webName,
    description: webDescription,
    icons: {
        icon: "/imgs/favicon.ico"
    },
    openGraph: {
        title: webName,
        description: webDescription,
        url: BASE_URL,
        siteName: "Ciel\'s Project",
        images: [
            {
                url: OPENGRAPH_URL + "/cover_small.jpg",
                width: 120,
                height: 120
            },
            // {
            //     url: OPENGRAPH_URL + "/cover.jpg",
            //     width: 2400,
            //     height: 1600
            // }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary",
        title: webName,
        description: webDescription,
        siteId: '1467726470533754880',
        creator: '@Ciel',
        creatorId: '1467726470533754880',
        images: [
            {
                url: OPENGRAPH_URL + "/cover_small.jpg",
                width: 120,
                height: 120
            },
            // {
            //     url: OPENGRAPH_URL + "/cover.jpg",
            //     width: 2400,
            //     height: 1600
            // }
        ],
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