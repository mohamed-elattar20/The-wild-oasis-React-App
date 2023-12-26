import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    // console.error(error);
    throw new Error("Cabins Cant't be Loaded");
  }

  return data;
};
export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    // console.error(error);
    throw new Error("Cabins Cant't be Deleted");
  }

  return data;
};
export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //  Create / Edit Cabin
  let query = supabase.from("cabins");
  // Create
  if (!id) {
    query = query.from("cabins").insert([{ ...newCabin, image: imagePath }]);
  }
  // Edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    // console.error(error);
    throw new Error("Cabins Cant't be Created");
  }

  //  Upload Image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete The Cabin If there Was an error in Uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image Couldn't be uploaded ant the cabin was not created"
    );
  }
  return data;
};
