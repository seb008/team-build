import ReactModal from "react-modal";
import "./modal.scss"

    const Modal = (props) => {
        const { title, content, isOpen, onClose } = props;
      
        return (
          <ReactModal isOpen={isOpen} onRequestClose={onClose}>
            <div className="modal-header">
              <h2>{title}</h2>
              <button onClick={onClose}>X</button>
            </div>
            <div className="modal-content">
              {content}
            </div>
          </ReactModal>
        );
      }


export default Modal