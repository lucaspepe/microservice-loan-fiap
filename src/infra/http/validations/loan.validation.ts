import * as yup from "yup";

export const loanInputValidation = (request: any): void | ErrorSimulateLoanRequest => {
  try {
    yup
      .object()
      .shape({
        purchasePrice: yup.number().required("purchasePrice is required"),
        downPayment: yup.number().required("downPayment is required"),
        salary: yup.number().required("salary is required"),
        period: yup.number().required("period is required"),
        type: yup.string().required("type is required"),
      })
      .validateSync(
        {
          purchasePrice: request.purchasePrice,
          downPayment: request.downPayment,
          salary: request.salary,
          period: request.period,
          type: request.type,
        },
        {
          abortEarly: false,
        }
      );

  } catch (error: any) {
    console.log(error)
    return new ErrorSimulateLoanRequest(error.errors)
  }
}

export class ErrorSimulateLoanRequest {
  message: string[]
  constructor(message: string[]) {
    this.message = message
  }
}
