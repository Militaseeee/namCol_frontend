export function showMessage({ text, className = "alert-message", parent = document.body, duration = 4000, color }) {
    const msg = document.createElement("div");
    msg.className = className;
    msg.innerText = text;

    if (color) {
        msg.style.backgroundColor = color;
    }

    parent.prepend(msg);

    setTimeout(() => {
        msg.remove();
    }, duration);
}
