import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export const useLogin = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //   console.log(data);
      queryClient.setQueryData(["user"], user.user);
      navigate(`/dashboard`, { replace: true });
    },
    onError: (err) => {
      //   console.log("ERROR", err);
      toast.error("Provided Email Or password are incorrect");
    },
  });
  return { login, isLogging };
};
