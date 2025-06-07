import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../components/ui/button";

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
