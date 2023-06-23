import Swal from "sweetalert2";

export const fireToast = (message: string) => {
    Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: message,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
};