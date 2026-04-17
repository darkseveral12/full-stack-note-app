import {
  VStack,
  Container,
  Fieldset,
  Stack,
  Heading,
  Field,
  Input,
  InputGroup,
  Button,
  Text,
  HStack,
  Span,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa6";
import { IoKey } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import NavbarPage from "./NavbarPage";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { UserCredentials } from "../types/User";
import { Toaster, toaster } from "../components/ui/toaster";
import useRequest from "../hooks/useRequest";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentials>();
  const { mutateAsync } = useRequest();
  const { user, setUser } = useAuth();
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<UserCredentials> = async (data) => {
    const promise = mutateAsync({
      url: "https://full-stack-note-app-1-czf8.onrender.com/auth/login",
      method: "POST",
      data,
    });

    toaster.promise(promise, {
      success: {
        title: "Successfully logged in.",
      },
      error: {
        title: "Failed to log in.",
      },
      loading: { title: "Logging in..." },
    });

    promise
      .then((response) => {
        if (response?.status !== 200) {
          throw new Error("Login failed");
        }

        setUser!(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      })
      .catch((err) => {
        setError(
          err.response?.data?.error || "An error occurred during login.",
        );
      });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Toaster />
      <NavbarPage />
      <Container
        maxWidth={"xl"}
        h="90vh"
        justifyContent={"center"}
        centerContent
      >
        <VStack w="full" as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root size="lg">
            <Stack>
              <Heading fontSize={"3xl"} fontWeight={"black"}>
                Login
              </Heading>
              <Fieldset.HelperText>
                Please provide your contact details below.
              </Fieldset.HelperText>
            </Stack>
            <Fieldset.Content>
              <Field.Root
                invalid={!!errors.email || error?.includes("email")}
                required
              >
                <Field.Label>Email</Field.Label>
                <InputGroup startElement={<FaUser />}>
                  <Input
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address.",
                      },
                    })}
                    placeholder="Enter your email"
                  />
                </InputGroup>
                <Field.ErrorText>
                  {errors.email?.message}{" "}
                  {error?.includes("email") ? error : ""}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root
                invalid={!!errors.password || error?.includes("password")}
              >
                <Field.Label>Password</Field.Label>
                <InputGroup startElement={<IoKey />}>
                  <Input
                    {...register("password", {
                      required: "Password is required.",
                    })}
                    placeholder="Enter your password"
                  />
                </InputGroup>
                <Field.ErrorText>
                  {errors.password?.message}{" "}
                  {error?.includes("password") ? error : ""}
                </Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
            <Button type="submit" alignSelf="flex-start">
              Login
            </Button>
          </Fieldset.Root>
          <HStack w={"full"} mt={"2"}>
            <Text as={"p"}>
              Don't have an account?
              <Link to={"/signup"}>
                <Span
                  color={"blue.500"}
                  textDecoration={"underline"}
                  fontWeight={"semibold"}
                  ml={"1"}
                >
                  Signup
                </Span>
              </Link>
            </Text>
          </HStack>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
