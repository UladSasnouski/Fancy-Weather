export function UpdateImage() {
    alert('OK. Works');
    rotate.classList.add("rotate");
    let randomBg = Math.floor(Math.random() * (6 - 0 + 1)) + 0;

    let background = `url(./background/${randomBg}.jpg) no-repeat center center fixed`;

    setTimeout(function () {
        document.body.style.background = background;
        rotate.classList.remove("rotate");
    }, 1000);
}