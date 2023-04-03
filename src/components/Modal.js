import { useNavigate } from 'react-router-dom';
import './App.css';

function Modal({ children }) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('/resources');
  }

  return (
    <>
      <div className="backdrop" onClick={closeHandler} />
      <dialog open className="modal">
        {children}
      </dialog>
    </>
  );
}

export default Modal;