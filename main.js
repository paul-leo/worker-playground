/**
 * Register service worker
 * @param {*} path
 * @param {*} scope
 */
function registerSW(path, scope) {
    if (navigator.serviceWorker) {
        navigator.serviceWorker
            .register(path, { scope })
            .then((reg) => console.log('SW registered!:' + path, reg))
            .catch((err) => console.log('SW register error:' + path, err));
    } else {
        alert('No SW support');
    }
}
/**
 * get all register service worker
 * @param {*} path
 */
function getAllRegister() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then((regs) => {
            console.log('All register SW:', regs);
        });
    }
}

/**
 * get controller
 * @param {*} path
 */
function getController() {
    if (navigator.serviceWorker) {
        console.log('Controller:', navigator.serviceWorker.controller);
    }
}

/**
 * unregister service worker
 * @param {*} path
 */
function unregisterSW(path) {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration(path).then((reg) => {
            if (reg) {
                reg.unregister().then(() => {
                    console.log('Unregister SW:', path);
                });
            }
        });
    }
}

function ungisterAll() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then((regs) => {
            regs.forEach((reg) => {
                reg.unregister().then(() => {
                    console.log('Unregister SW:', reg);
                });
            });
        });
    }
}

async function sendMessageToSW() {
    const sws = await getAllActiveSW();
    sws.forEach((sw) => {
        sw.postMessage('Hello from main.js');
    });
}

async function getAllActiveSW() {
    if (navigator.serviceWorker) {
        const regs = await navigator.serviceWorker.getRegistrations();
        console.log('All active SW:', regs);
        return regs.map((reg) => reg.active);
    }
    return [];
}