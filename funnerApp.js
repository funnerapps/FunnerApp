

const timeStamp = Date.now()
document.body.innerHTML += `<iframe id="funnerApp" src="https://www.pbd.co.il/apps/FunnerApp/index.html?timestamp=${timeStamp}" width="100%" height="100%"></iframe>`
const iframe = document.querySelector("#funnerApp");
iframe.addEventListener("load", () => {
    iframe.contentWindow.postMessage({ type: "onLoad", "userglobalid": window.parent.dataLayer[0].userglobalid }, '*');
    console.log('fromParent', window.parent.dataLayer[0].userglobalid)

})

window.addEventListener('message', function (e) {
    console.log('data in parent', e.data)
    // Get the sent data
    const data = e.data;
    if (data.type === 'onLoad') {
        iframe.contentWindow.postMessage({ type: "onLoad", "userglobalid": window.parent.dataLayer[0].userglobalid }, '*');
    } else if (data.type === 'FunnerOpenPopup') {
        window.parent.dispatchEvent(new CustomEvent("FunnerOpenPopup", { detail: { phone: data.phone, name: data.name } }));
    }


});
