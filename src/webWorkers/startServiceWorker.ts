export function startServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register(new URL('./serviceWorker', import.meta.url))
                .then(registration => {
                    // eslint-disable-next-line no-console
                    console.log('ServiceWorker registration successful with scope: ', registration.scope)
                })
                .catch((error: string) => {
                    // eslint-disable-next-line no-console
                    console.log('ServiceWorker registration failed: ', error)
                })
        })
    }
}
