import Swal from "sweetalert2";

export const fireError = (errorMessage?: string) => {
  Swal.fire("Error", 
  errorMessage || "Ocurrio un error inesperado", 
  "error");
};
