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
import { createCabin } from "../../services/apiCabins";
// React Hot Toast
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";

//

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success(`New Cabin Successfully Created`);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data) => {
    // console.log(data.image[0]);
    // console.log(data.image.length);
    mutate({ ...data, image: data.image[0] });
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label={`Cabin photo`}>
        <FileInput
          {...register("image", { required: "This Field Is Req" })}
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
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
