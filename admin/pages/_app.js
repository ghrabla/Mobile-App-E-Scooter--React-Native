import "@/styles/globals.css";
import Sidebar from "../components/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const showSidebar = router.pathname !== "/login";
  return (
    <>
      {showSidebar ? (
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      ) : (
        <Component {...pageProps} />
      )}

      <ToastContainer />
    </>
  );
}
