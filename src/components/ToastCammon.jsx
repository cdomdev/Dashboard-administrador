import { Toast, ToastContainer } from "react-bootstrap";

export const ToastCammon = ({
  showToast,
  setShowToast,
  toastMessage,
  bgToast,
}) => {
  return (
    <div className="fixed z-10 top-20 right-10 flex ">
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={4000}
        bg={bgToast}
        animation
        autohide
        className="m-auto">
        <Toast.Body className="px-2 text-white flex items-center justify-between text-base">
          <p className="text-wrap">¡{toastMessage}!</p>{" "}
          <span onClick={() => setShowToast(false)} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x w-7 h-7 stroke-white"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </span>
        </Toast.Body>
      </Toast>
    </div>
  );
};
