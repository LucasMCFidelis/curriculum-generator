import { RefinementCtx } from "zod";

interface ValidateDatesZodProps {
  modelValidate: string;
  itemFinished?: boolean;
  itemStartDate?: Date;
  itemEndDate?: Date;
  ctx: RefinementCtx;
}

export function validateDatesZod({
  modelValidate,
  itemFinished,
  itemStartDate,
  itemEndDate,
  ctx,
}: ValidateDatesZodProps) {
  if (itemFinished && !itemEndDate) {
    ctx.addIssue({
      code: "custom",
      path: [`${modelValidate}EndDate`],
      message:
        `Data de término é obrigatória quando ${modelValidate} já foi finalizada.`,
    });
  }

  if (itemEndDate && itemStartDate) {
    const startDate = new Date(itemStartDate);
    const endDate = new Date(itemEndDate);

    if (startDate > endDate) {
      ctx.addIssue({
        code: "custom",
        path: [`${modelValidate}EndDate`],
        message: "Data de término não pode ser anterior à de início.",
      });
    }
  }
}
