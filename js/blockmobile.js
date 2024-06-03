const isMobile = () => {
    Object.assign(document.body.style, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2vw',
        color: '#000',
        backgroundColor: '#fff',
        width: '100vw',
        height: '100vh'
    });

    document.body.innerHTML = `
        <h1>Incompatible screen size</h1>
    `;
}

const start = () => {
    if (window.innerWidth < 900) {
        isMobile();
    }
}

setTimeout(() => {
    start();
}, 1000);