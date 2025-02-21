import '@/app/shared/styles/variables.css'
import '@/app/shared/styles/global.css'

import './page.css'
import styles from './layout.module.css'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const OPENGRAPH_URL = BASE_URL + "/imgs/opengraph";

const webName = process.env.NEXT_PUBLIC_WEB_NAME;
const webDescription = process.env.NEXT_PUBLIC_WEB_DESCRIPTION;

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
            }
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
            }
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