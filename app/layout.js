
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ContextProvider } from "@/context/ContextPovider";
import { SessionProviders } from "@/libs/SessionProvider";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "food frenzy",
  description: "food frenzy food delivery app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link href='https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <body className={` bg-gray-50 text-gray-900 ${poppins.className}`}>
        <SessionProviders>
          <ContextProvider>
            <div className="max-w-[1200px] mx-auto p-1">
              <Toaster />
              <Navbar />
              {children}
              <Footer />
            </div>
          </ContextProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
