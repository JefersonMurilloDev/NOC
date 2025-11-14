import { LogDatasource } from "@/domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "@/domain/entities/log.entity";
import { PrismaClient, severityLevel } from "@prisma/client";


const prisma = new PrismaClient();

const severityEnum = {
    low: severityLevel.LOW,
    medium: severityLevel.MEDIUM,
    high: severityLevel.HIGH,
}


export class PostgresLogDataSource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];
        
        const newLog =  await prisma.logModel.create({
            data: {
                ...log,
                level,
            },
        });

        console.log('Log saved', newLog.id);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await prisma.logModel.findMany({
            where: {
                level: severityEnum[severityLevel],
            },
        });
        
        return logs.map(LogEntity.fromObject);
    }
    
}
