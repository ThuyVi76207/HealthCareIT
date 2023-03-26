import "./loading.scss";
import logoLoading from 'assets/Loading/loading-logo.webp'

export default function Loading({ loading }) {
    if (!loading) return '';

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[100000] flex items-center justify-center h-screen w-full bg-black bg-opacity-30">
            <img
                alt="loading"
                className="rounded-full animate-bounce h-12 w-12"
                src={logoLoading}
            ></img>
            <img
                alt="loading"
                className="rounded-full animate-bounce animation-delay-200 h-12 w-12"
                src={logoLoading}
            ></img>
            <img
                alt="loading"
                className="rounded-full animate-bounce animation-delay-400 h-12 w-12"
                src={logoLoading}
            ></img>
        </div>
    );
}