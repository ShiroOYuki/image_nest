import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh-Hant"]; // 支援的語言列表

function getLocale(request: NextRequest) {
    return "en"; // 預設語言
}

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    console.log(pathname);

    // 檢查 URL 中是否已包含語言代碼
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return NextResponse.next();

    // 若無語言代碼，則進行重定向
    const locale = getLocale(request);
    const url = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(url);
}

// 設定 config 以限制中介軟體的應用範圍
export const config = {
    matcher: [
        // 應用於所有非 _next 開頭的路徑，避免靜態資源和 API 路徑
        '/((?!_next|api|favicon.ico).*)',
    ],
};
