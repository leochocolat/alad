import breakpoints from '../variables/breakpoints';

class MediaQueriesUtils {
    isWide() {
        return window.innerWidth > breakpoints.wide;
    }

    isRegular() {
        return window.innerWidth > breakpoints.regular;
    }

    isNarrow() {
        return window.innerWidth > breakpoints.narrow && window.innerWidth <= breakpoints.regular;
    }

    isExtraNarrow() {
        return window.innerWidth <= breakpoints.narrow;
    }
}

export default new MediaQueriesUtils();