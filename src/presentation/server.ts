import { CheckService } from "@/domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "@/infrastructure/datasources/file-system.datasources";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)

export class Server {
    
    public static start() {
        
        console.log("Server started...");

        CronService.createJob(
            '*/2 * * * * *',
            () => {

                const url = 'http://localhost:3000';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    (error) => console.log(`${url} is not ok: ${error}`)
                ).execute(url);
            }
        );

    }
}

