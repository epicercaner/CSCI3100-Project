import { BiBorderRadius } from 'react-icons/bi';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

const themeColor = '#702082';

export const notify = {
  success: (msg) => toast.success(msg),
  
  error: (msg) => toast.error(msg || "An error occurred"),

  confirm: async (title, text, icon = 'warning') => {
    const result = await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: themeColor,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      allowOutsideClick: false 
    });
    return result.isConfirmed;
  }
};