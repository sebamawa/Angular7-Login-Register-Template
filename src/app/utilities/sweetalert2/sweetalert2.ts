import Swal, {SweetAlertType} from 'sweetalert2'; // libreria para alerts js

export class SweetAlert2 {
  public static showModalSweetAlert(title: string, text: string, type: SweetAlertType) {
    Swal({
      title: title,
      text: text,
      type: type
    });
  }
}
