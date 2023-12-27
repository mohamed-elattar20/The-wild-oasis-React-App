import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((prev) => !prev)}>
//         Add New Cabin{" "}
//       </Button>
//       {isOpenModal && (
//         <Modal setIsOpenModal={setIsOpenModal}>
//           <CreateCabinForm setIsOpenModal={setIsOpenModal} />
//         </Modal>
//       )}
//     </>
//   );
// };

export default AddCabin;
