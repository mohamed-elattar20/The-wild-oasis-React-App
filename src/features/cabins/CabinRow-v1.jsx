import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCretateCabin } from "./useCretateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  // const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { createCabin, isCreating } = useCretateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    image,
    regularPrice,
    discount,
    description,
  } = cabin;

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fit Up To {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Button onClick={handleDuplicate}>
            <HiSquare2Stack />
          </Button>

          <Modal>
            <Modal.Open opens={`edit`}>
              <Button>
                <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Window name={`edit`}>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Open opens={`delete`}>
              <Button>
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Window name={`delete`}>
              <ConfirmDelete
                onConfirm={() => deleteCabin(cabinId)}
                resourceName="cabins"
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>

          {/* <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack />}>
                Duplicate
              </Menus.Button>
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu> */}
        </div>
      </Table.Row>
      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
    </>
  );
};

export default CabinRow;
