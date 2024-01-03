import supabase, { supabaseUrl } from "./supabase";

export const signup = async ({ fullName, email, password }) => {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  // console.log(data);
  return data;
};
export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
};

export const getCurrentUser = async () => {
  let { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  // console.log(data);

  if (error) throw new Error(error.message);

  return data.user;
};

export const logout = async () => {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  //  1. update Password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  let { data, error } = await supabase.auth.updateUser(updateData);

  if (!avatar) return data;
  if (error) throw new Error(error.message);

  //  2. Upload the avatar image

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Upload avatar in the user

  const { data: updatedUser, error: updateUserAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateUserAvatarError) throw new Error(updateUserAvatarError.message);

  return updatedUser;
};
