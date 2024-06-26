import * as yup from "yup";

export const schemaHome = yup.object({
  example: yup.string().required("Required"),
});
