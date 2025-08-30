function calculateExpiryDate() {
    const date = document.getElementById("mfgDate").value;
    const shelfLife = document.getElementById("shelfLife").value;

    const expiryDate = document.getElementById("expiryDate");
    const status = document.getElementById("status");
    const error = document.getElementById("error");

    expiryDate.textContent="";
    status.textContent="";
    error.innerHTML="";

    const mfgDate = date ? new Date(date):null;
    const shelfLifeNum=Number(shelfLife);

    if (!mfgDate || shelfLife <= 0) {
        error.innerHTML = `<p style:"color:red;">Please enter valid manufacturing date and shelf life.</p>`
        return;
    }

    const expiry=new Date(mfgDate)
    expiry.setDate(expiry.getDate()+shelfLifeNum)

    const today=new Date()
    today.setHours(0,0,0,0)

    const statusCheck = expiry<today ? "Expired" : "Valid";

    expiryDate.textContent=`Expiry Date: ${expiry.toLocaleDateString(undefined, { year: "numeric", month: "short", day:"2-digit"})}`;
    status.textContent=statusCheck;

}