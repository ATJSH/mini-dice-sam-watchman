import { NestFactory } from "@nestjs/core";
import { Context } from "aws-lambda";
import {
  AppServiceClass,
  BootstrapNestjsStandaloneAppMapping
} from "./interfaces/bootstrap-nestjs-standalone-app-mapping.interface";

export function getNestjsStandaloneAppLambdaHandler<AWSEevent>(
  mapping: BootstrapNestjsStandaloneAppMapping<any, AppServiceClass<AWSEevent>>
) {
  return async (event: AWSEevent, context: Context) => {
    const app = await NestFactory.createApplicationContext(
      mapping.appModuleClass
    );

    const appService = app.get(mapping.appServiceClass);

    return await appService.handler(event, context);
  };
}
