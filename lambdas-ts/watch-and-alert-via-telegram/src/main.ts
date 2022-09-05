import { getNestjsStandaloneAppLambdaHandler } from "@shared/utilities";
import { AppModule, AppService } from "./app";

export const lambdaHandler = getNestjsStandaloneAppLambdaHandler({
  appModuleClass: AppModule,
  appServiceClass: AppService
});
