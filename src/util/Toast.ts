import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultToastOption: ToastOptions = {
  // 기타 옵션이 필요하면 추가하도록
  position: 'bottom-center', // 화면에 보여질 위치("top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left" 중에서 선택)
  autoClose: 3000, // 알림이 닫히는 시간
  closeOnClick: true, // 클릭시 닫히도록 함
  pauseOnHover: false, // 마우스를 알림 위에 올렸을 때 닫히는 것을 일시적으로 중지함
};

const Toast = {
  success: (message: any, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultToastOption, ...options });
  },
  error: (message: any, options: ToastOptions = {}) => {
    toast.error(message === 'Internal Server Error' ? '서버 에러가 발생했습니다.' : message, {
      ...defaultToastOption,
      ...options,
    });
  },
};

export default Toast;
