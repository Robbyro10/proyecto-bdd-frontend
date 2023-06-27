import Swal from "sweetalert2";

export const fireError = () => {
  Swal.fire("Error", "Ocurrio un error inesperado", "error");
};
