import { LogEntity, LogSeverityLevel } from "@/domain/entities/log.entity";
import { LogRepository } from "@/domain/repository/log.repository";

interface CheckServiceAllsUseCase {

    execute( url: string ): Promise<boolean>;

}

type SuccessCallback = ( () => void ) | undefined;
type ErrorCallback = ( ( error: string ) => void ) | undefined;

export class CheckServiceAlls implements CheckServiceAllsUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {};

    private callLogsRepository( log: LogEntity ) {
        this.logRepository.forEach( logRepository => logRepository.saveLog( log ) );
    }

    public async execute( url: string ): Promise<boolean> {

        try {
            
            const req = await fetch( url );
            
            if ( !req.ok ) {
                throw new Error( `Error on check service: ${ url }` );
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Check service: ${ url } is ok`,
                origin: 'check-service'
            });
            this.callLogsRepository( log );
            this.successCallback && this.successCallback();

            return true;

        } catch (error) {

            const errorMessage = `${error}`;

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `Error on check service: ${ url } - ${ errorMessage }`,
                origin: 'check-service'
            });
            this.callLogsRepository( log );

            this.errorCallback && this.errorCallback( errorMessage );
            return false;
            
        }

        
    }

}

