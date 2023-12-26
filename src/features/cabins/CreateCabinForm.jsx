// Components
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
// React Hook Form
import { useForm } from "react-hook-form";
// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
// React Hot Toast
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";

//

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success(`Cabin Successfully Edited`);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  //
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(`New Cabin Successfully Created`);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    // console.log(data.image[0]);
    // console.log(data.image.length);

    const image = typeof data.image === "string" ? data?.image : data?.image[0];

    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image: image }, id: editId });
    } else {
      createCabin({ ...data, image: image });
    }
  };
  const onError = (errors) => {
    // console.log(errors);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={`Cabin name`} error={errors?.name?.message}>
        <Input
          {...register("name", { required: "This Field Is Req" })}
          type="text"
          id="name"
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={`Maximum capacity`} error={errors?.maxCapacity?.message}>
        <Input
          {...register("maxCapacity", {
            required: "This Field Is Req",
            min: { value: 1, message: "Capacity Should be at least 1" },
          })}
          type="number"
          id="maxCapacity"
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={`Regular price`} error={errors?.regularPrice?.message}>
        <Input
          {...register("regularPrice", {
            required: "This Field Is Req",
            min: { value: 1, message: "Capacity Should be at least 1" },
          })}
          type="number"
          id="regularPrice"
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={`Discount`} error={errors?.discount?.message}>
        <Input
          {...register("discount", {
            required: "This Field Is Req",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount must be less than regularPrice",
          })}
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label={`Description for website`}
        error={errors?.description?.message}
      >
        <Textarea
          {...register("description", { required: "This Field Is Req" })}
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={`Cabin photo`}>
        <FileInput
          {...register("image", {
            required: isEditSession ? false : "This Field Is Req",
          })}
          id="image"
          type="file"
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
