import express, {Request, Response} from "express";
import SimulateLoan from "../../../../application/usecase/SimulateLoan";
import { loanInputValidation, ErrorSimulateLoanRequest } from "../../validations/loan.validation";
import RepositoryMemoryFactory from "../../../factory/RepositoryMemoryFactory";
import LogDecorator from "../../../../application/decorator/LogDecorator";
import RequestLoan from "../../../../application/usecase/RequestLoan";
import GetLoan from "../../../../application/usecase/GetLoan";
import ListLoans from "../../../../application/usecase/ListLoans";

export const loanRoute = express.Router();

loanRoute.post('/simulate', async (req: Request, res: Response) => {    
	const errorValidation = loanInputValidation(req.body)

	if(errorValidation) {
		return res.status(400).send({error: errorValidation.message})
	}

    const simulateLoan = new SimulateLoan();
	const input = {
		code: crypto.randomUUID(),
		purchasePrice: req.body.purchasePrice,
		downPayment: req.body.downPayment,
		salary: req.body.downPayment,
		period: req.body.period,
		type: req.body.type
	}
    const output = await simulateLoan.execute(input);
    return res.status(200).send(output)
})

loanRoute.post('/requestLoan', async (req: Request, res: Response) => {
	const errorValidation = loanInputValidation(req.body)

	if(errorValidation) {
		return res.status(400).send({error: errorValidation.message})
	}

	try {
		const repositoryFactory = new RepositoryMemoryFactory();
		const requestLoan = new LogDecorator(new RequestLoan(repositoryFactory));
		const id = crypto.randomUUID()
		const inputRequestLoan = {
			code: id,
			purchasePrice: req.body.purchasePrice,
			downPayment: req.body.downPayment,
			salary: req.body.downPayment,
			period:  req.body.period,
			type:  req.body.type,
		}
		await requestLoan.execute(inputRequestLoan);
		return res.status(200).send({loanId: id})		
	} catch(error: any) {
		return res.status(500).send(error.message)	
	}


})

loanRoute.get('/requestLoan/:id', async (req: Request, res: Response) => {
	const id = req.params.id
	const repositoryFactory = new RepositoryMemoryFactory();
	const getLoan = new LogDecorator(new GetLoan(repositoryFactory));
	const inputGetLoan = {
		code: id
	};
	const output = await getLoan.execute(inputGetLoan);
	return res.status(200).send(output)
})

loanRoute.get('/', async (req: Request, res: Response) => {
	const repositoryFactory = new RepositoryMemoryFactory();
	const listLoans = new LogDecorator(new ListLoans(repositoryFactory));
	const output = await listLoans.execute('list');
	return res.status(200).send(output)
})
