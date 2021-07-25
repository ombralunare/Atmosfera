window.addEventListener("load", function()
{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "~/Music");
    xhr.addEventListener("loadend", function()
    {
        let rsl = JSON.parse(this.response);
        console.log(rsl);
    });

    xhr.send();
});
