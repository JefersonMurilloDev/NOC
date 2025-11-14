import { EmailService } from "@/presentation/email/email-service";
import { LogRepository } from "@/domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "@/domain/entities/log.entity";

interface SendEmailLogsUseCase {
    execute(to: string | string[]): Promise<boolean>;
}


export class SendEmailLogs implements SendEmailLogsUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ){}
    
    async execute(to: string | string[]) {

        try {
            const result = await this.emailService.sendEmailWithFileSystemLogs(to);
            
            if(!result){
                throw new Error('error sending email');
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'email sent successfully',
                origin: 'send-email-logs.ts'
            });

            this.logRepository.saveLog(log);

            return true;

        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'error sending email',
                origin: 'send-email-logs.ts'
            });
            this.logRepository.saveLog(log);
            throw error;
        }
        
        
    }
    
}
