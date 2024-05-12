import crypto from "crypto";
import LogDecorator from "../../src/application/decorator/LogDecorator";
import RequestLoan from "../../src/application/usecase/RequestLoan";
import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection";
import RepositoryDatabaseFactory from "../../src/infra/factory/RepositoryDatabaseFactory";
import RepositoryMemoryFactory from "../../src/infra/factory/RepositoryMemoryFactory";
import ListLoans from "../../src/application/usecase/ListLoans";


test("Deve listar todos os loans cadastrados no sistema", async function () {
	const code = crypto.randomUUID();
	const connection = new PgPromiseConnection();
	// const repositoryFactory = new RepositoryDatabaseFactory(connection);
	const repositoryFactory = new RepositoryMemoryFactory();
	const requestLoan = new LogDecorator(new RequestLoan(repositoryFactory));
	const inputRequestLoanPrice = {
		code,
		purchasePrice: 150000,
		downPayment: 40000,
		salary: 70000,
		period: 12,
		type: "price"
	}
	const inputRequestLoanSac = {
		code,
		purchasePrice: 150000,
		downPayment: 40000,
		salary: 70000,
		period: 12,
		type: "sac"
	}
    Promise.all([await requestLoan.execute(inputRequestLoanPrice), await requestLoan.execute(inputRequestLoanSac)])
    
	const listLoan = new LogDecorator(new ListLoans(repositoryFactory));

	const output = await listLoan.execute('list');
	expect(output).toHaveLength(2);
	connection.close();
});
