import { Context } from "aws-lambda";

export interface NestjsStandaloneAppService<AWSEvent> {
  handler: (event: AWSEvent, context: Context) => any | Promise<any>;
}

export type NestjsStandaloneAppServiceClass<AWSEvent> = new (
  ...params: any[]
) => NestjsStandaloneAppService<AWSEvent>;

export interface BootstrapNestjsStandaloneAppMapping<
  AppModuleClass,
  AppServiceClass extends NestjsStandaloneAppServiceClass<any>
> {
  appModuleClass: AppModuleClass;
  appServiceClass: AppServiceClass;
}
