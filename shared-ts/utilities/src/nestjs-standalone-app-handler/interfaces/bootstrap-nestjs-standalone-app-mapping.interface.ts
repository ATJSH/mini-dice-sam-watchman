import { APIGatewayProxyEvent, Context } from "aws-lambda";

export interface NestjsStandaloneAppService<AWSEvent> {
  handler: (event: AWSEvent, context: Context) => any | Promise<any>;
}

export type AppServiceClass<AWSEvent> = new (
  ...params: any[]
) => NestjsStandaloneAppService<AWSEvent>;

export interface BootstrapNestjsStandaloneAppMapping<
  AppModuleClass,
  AppServiceClass
> {
  appModuleClass: AppModuleClass;
  appServiceClass: AppServiceClass;
}
