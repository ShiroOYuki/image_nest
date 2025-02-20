import '@/app/shared/styles/variables.css'
import '@/app/shared/styles/global.css'

import './page.css'
import styles from './layout.module.css'

const BASE_URL = "https://image-nest-preview.vercel.app";
const OPENGRAPH_URL = BASE_URL + "/imgs/opengraph";

export const metadata = {
    title: 'Image Nest',
    description: 'Ciel\'s Dashboard',
    icons: {
        icon: "/imgs/favicon.ico"
    },
    openGraph: {
        title: "Image Nest",
        description: "Ciel\'s Dashboard",
        url: BASE_URL,
        siteName: "Image Nest",
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
        title: "Image Nest",
        description: "Ciel\'s Dashboard",
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