import {
  VStack,
  Container,
  Fieldset,
  Stack,
  Heading,
  Field,
  Input,
  Button,
  Text,
  HStack,
  Span,
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import NavbarPage from "./NavbarPage";
import type { UserFullDetails } from "../types/User";
import { Toaster } from "../components/ui/toaster";

import useRequest from "../hooks/useRequest";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
type UserFormDetails = UserFullDetails & {
  confirmPassword: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormDetails>();
  const { mutateAsync } = useRequest();
  const { setUser } = useAuth();
  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch("password");
  const onSubmit: SubmitHandler<UserFormDetails> = (data) => {
    const promise = mutateAsync({
      url: "https://full-stack-note-app-1-czf8.onrender.com/auth/signup",
      method: "POST",
      data,
    });

    toaster.promise(promise, {
      success: {
        title: "Successfully logged in.",
      },
      error: {
        title: "Failed to Sign in.",
      },
      loading: { title: "Signing in..." },
    });

    promise.then((response) => {
      if (response?.status !== 200) {
        throw new Error("Sign in failed");
      }

      setUser!(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    });
  };
  return (
    <>
      <Toaster />
      <NavbarPage />
      <Container
        maxWidth={"xl"}
        h="80vh"
        justifyContent={"center"}
        centerContent
      >
        <VStack w="full" as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root size="lg">
            <Stack>
              <Heading fontSize={"3xl"} fontWeight={"black"}>
                Signup
              </Heading>
              <Fieldset.HelperText>
                Please provide your contact details below.
              </Fieldset.HelperText>
            </Stack>
            <Fieldset.Content>
              <HStack>
                <Field.Root invalid={!!errors.firstName} required>
                  <Field.Label>
                    First Name
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    {...register("firstName", {
                      required: "First name is required.",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters.",
                      },
                    })}
                    placeholder="First Name"
                  />
                  <Field.ErrorText>
                    <Field.ErrorIcon />
                    {errors.firstName?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.lastName} required>
                  <Field.Label>
                    Last Name <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    {...register("lastName", {
                      required: "Last name is required.",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters.",
                      },
                    })}
                    placeholder="Last Name"
                  />
                  <Field.ErrorText>
                    <Field.ErrorIcon />
                    {errors.lastName?.message}
                  </Field.ErrorText>
                </Field.Root>
              </HStack>
              <Field.Root invalid={!!errors.email} required>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address.",
                    },
                  })}
                  placeholder="Enter your email"
                />
                <Field.ErrorText>
                  <Field.ErrorIcon />
                  {errors.email?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.password} required>
                <Field.Label>
                  Password <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters.",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase, one lowercase, one number, and one special character.",
                    },
                  })}
                  placeholder="Enter your password"
                />
                <Field.ErrorText>
                  {" "}
                  <Field.ErrorIcon />
                  {errors.password?.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.confirmPassword} required>
                <Field.Label>
                  Confirm Password <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  {...register("confirmPassword", {
                    required: "Confirm password is required.",
                    validate: (value) =>
                      value === password || "Passwords do not match!",
                  })}
                  placeholder="Confirm your password"
                />
                <Field.ErrorText>
                  <Field.ErrorIcon />
                  {errors.confirmPassword?.message}
                </Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
            <Button type="submit" alignSelf="flex-start">
              Signup
            </Button>
          </Fieldset.Root>
          <HStack w={"full"} mt={"2"}>
            <Text as={"p"}>
              Already have an account?
              <Link to={"/login"}>
                <Span
                  color={"blue.500"}
                  textDecoration={"underline"}
                  fontWeight={"semibold"}
                  ml={"1"}
                >
                  Login
                </Span>
              </Link>
            </Text>
          </HStack>
        </VStack>
      </Container>
    </>
  );
};

export default Signup;
