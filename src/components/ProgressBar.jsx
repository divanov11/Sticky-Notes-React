import NProgress from 'nprogress';
import { useEffect, useMemo } from 'react';

export default function ProgressBar() {
    NProgress.configure({
        showSpinner: false,
    });

    useMemo(() => {
        NProgress.start();
    }, []);

    useEffect(() => {
        NProgress.done();
    }, []);

    return null;
}
