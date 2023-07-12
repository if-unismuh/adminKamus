import Swal from "sweetalert2";

export const Question = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    icon : "question",
    showCancelButton : true,
    cancelButtonText : "Tidak",
    confirmButtonText : "Iya",
    title : "Peringatan"
})

export const Loading = Swal.mixin({
    title : "Tunggu Sebentar...",
    icon : "info",
    allowEscapeKey : false,
    allowOutsideClick : false,
    showConfirmButton : false,
    didOpen : () => {
        Swal.showLoading()
    }
})