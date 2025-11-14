import { CheckServiceAlls } from "@/domain/use-cases/checks/check-service-alls";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "@/infrastructure/datasources/file-system.datasources";
//import { LogSeverityLevel } from "@/domain/entities/log.entity";
//import { EmailService } from "./email/email-service";
import { MongoLogDatasource } from "@/infrastructure/datasources/mongo-log.datasource";
//import { SendEmailLogs } from "@/domain/use-cases/email/send-email-logs";
import { PostgresLogDataSource } from "@/infrastructure/datasources/postgres-log.datasource";
//import { CheckService } from "@/domain/use-cases/checks/check-service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    //new MongoLogDatasource()
    //new PostgresLogDataSource()
);

const mongoLogRepository = new LogRepositoryImpl(
    //new FileSystemDatasource()
    new MongoLogDatasource()
    //new PostgresLogDataSource()
);

const postgresLogRepository = new LogRepositoryImpl(
    //new FileSystemDatasource()
    //new MongoLogDatasource()
    new PostgresLogDataSource()
);

//const emailService = new EmailService();

export class Server {
    
    public static async start() {
        
        console.log("Server started...");

        //Send email with logs
        //new SendEmailLogs(
        //    emailService,
        //    fileSystemLogRepository
        //).execute(['murillopalacioj@gmail.com', 'jefferdaniel2001@gmail.com']);

        //const logs = await logRepository.getLogs(LogSeverityLevel.high);
        //console.log(logs);

        CronService.createJob(
            '*/2 * * * * *',
            () => {

                const url = 'http://localhost:3000';
                new CheckServiceAlls(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok`),
                    (error) => console.log(`${url} is not ok: ${error}`)
                ).execute(url);
            }
        );

    }
}

