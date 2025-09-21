export class ErrorHandler {
    static init() {
        // Handle unhandled errors
        window.addEventListener('error', (event) => {
            if (event.error && event.error.message &&
                (event.error.message.includes(':has-text') ||
                    event.error.message.includes('pseudo-class'))) {
                event.preventDefault();
                console.warn('External extension error suppressed:', event.error.message);
                return true;
            }
            return false;
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            if (event.reason && event.reason.message &&
                event.reason.message.includes('Failed to parse selector')) {
                event.preventDefault();
                console.warn('Promise rejection from external extension suppressed');
                return true;
            }
            return false;
        });
    }
}