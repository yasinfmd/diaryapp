import Swal from "sweetalert2";

export const msgBox = (type, message) => {
    let timerInterval
    Swal.fire({
        title: 'Bilgilendirme',
        text: message,
        icon: type,
        timer: 3000,
        confirmButtonText:"Tamam",
        focusConfirm:true,
        confirmButtonColor:"#639fff",
        timerProgressBar: true,
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        }
    })
}
