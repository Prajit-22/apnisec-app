import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ApniSec - Your Cybersecurity Partner",
    description: "Comprehensive cybersecurity solutions including Cloud Security, Red Team Assessment, and VAPT services.",
    keywords: ["cybersecurity", "cloud security", "red team", "VAPT", "penetration testing", "security assessment"],
    authors: [{ name: "ApniSec" }],
    openGraph: {
        title: "ApniSec - Your Cybersecurity Partner",
        description: "Comprehensive cybersecurity solutions including Cloud Security, Red Team Assessment, and VAPT services.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
