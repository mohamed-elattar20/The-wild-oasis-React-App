import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    error,
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSettings } = useUpdateSettings();

  const handleUpdate = (e, fieldName) => {
    // console.log(e.target);
    const { value } = e.target;
    // console.log(value);
    if (!value) return;
    updateSettings({ [fieldName]: value });
  };

  if (isLoading) return <Spinner />;
  if (error) return <h1>Error</h1>;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
