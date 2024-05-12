import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory";
import InstallmentRepository from "../repository/InstallmentRepository";
import LoanRepository from "../repository/LoanRepository";
import Usecase from "./Usecase";

export default class ListLoans implements Usecase {
	loanRepository: LoanRepository;
	installmentRepository: InstallmentRepository;

	constructor (
		readonly repositoryFactory: RepositoryAbstractFactory
	) {
		this.loanRepository = repositoryFactory.createLoanRepository();
		this.installmentRepository = repositoryFactory.createInstallmentRepository();
	}

	async execute (): Promise<Output[]> {
		const loans = await this.loanRepository.list();
		return loans.map(loan => ({loanId: loan.code}))
	}
}

type Output = {
	loanId: string;
}
