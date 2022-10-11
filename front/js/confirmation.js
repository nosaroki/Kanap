function launchId(){
    let idOrder = new URL(window.location.href).searchParams.get("id");
    const showId = document.getElementById("orderId");
    showId.innerText = idOrder;
}
launchId();