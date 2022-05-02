import { TypeOrmModule } from "@nestjs/typeorm";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./tools/auth/auth.module";
import { JwtAuthGuard } from "./tools/auth/jwt-auth.guard";
import { UserModule } from "./modules/user/users.module";
import { User } from "./modules/user/entities/user.entity";
import { CompanyModule } from "./modules/company/company.module";
import { ContractModule } from "./modules/contract/contract.module";
import { EmployeeModule } from "./modules/employee/employee.module";
import { FormFieldModule } from "./modules/form-field/form-field.module";
import { DocumentsModule } from "./modules/document/document.module";
import { Company } from "./modules/company/entities/company.entity";
import { Contract } from "./modules/contract/entities/contract.entity";
import { Employee } from "./modules/employee/entities/employee.entity";
import { FormField } from "./modules/form-field/entities/form-field.entity";
import { Document } from "./modules/document/entities/document.entities";
import { EmployeeMovement } from "./modules/employee-movement/entities/employee-movement.entity";
import { TokenRefresherMiddleware } from "./tools/auth/auth.middleware";
import { Emails } from "./tools/emails/emails.service";
import { Auth } from "./tools/auth/entities/auth.entity";

@Module({
	imports: [
		AuthModule,
		UserModule,
		CompanyModule,
		ContractModule,
		EmployeeModule,
		FormFieldModule,
		DocumentsModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "",
			database: "test",
			entities: [User, Company, Contract, Employee, FormField, Document, EmployeeMovement, Auth],
			synchronize: true,
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		Emails,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(TokenRefresherMiddleware)
			.exclude("api/authentication/(.*)", "api/user/create")
			.forRoutes("/");
	}
}
