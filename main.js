/**
 * Register service worker
 * @param {*} path
 * @param {*} scope
 */
function registerSW(path, scope) {
    if (navigator.serviceWorker) {
        navigator.serviceWorker
            .register(path, { scope })
            .then((reg) => {
                console.log('SW registered!:' + path, reg);
                
            })
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

async function getMsg() {
    // Notification.requestPermission().then(function (result) {
    //     if (result === 'granted') {
    //         randomNotification();
    //     }
    // });
}

const notifTitle = ['通知标题1', '通知标题2'];
const notifBody = ['通知内容1', '通知内容2'];

function randomNotification() {
    var randomItem = Math.floor(Math.random() * notifTitle.length);
    var notif = new Notification(notifTitle[randomItem], {
        body: notifBody[randomItem],
        // icon: notifImg[randomItem],
    });

    // setTimeout(randomNotification, Math.floor(Math.random() * 5 * 60 * 1000));
}
