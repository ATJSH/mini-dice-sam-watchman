import { HttpModule, HttpService } from "@nestjs/axios";
import { Injectable, Module } from "@nestjs/common";
import { NestjsStandaloneAppService } from "@shared/utilities";
import { APIGatewayProxyEvent, Context, ScheduledEvent } from "aws-lambda";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AppService implements NestjsStandaloneAppService<ScheduledEvent> {
  constructor(private httpService: HttpService) {}

  private async checkServer(): Promise<{
    isServerOk: boolean;
    detail?: string;
  }> {
    try {
      const result = await lastValueFrom(
        this.httpService.get(
          `https://beta-server.mini-dice.com/health/detail`,
          {
            timeout: 10000,
            validateStatus: () => true
          }
        )
      );

      if (result.data.status == "ok") {
        return { isServerOk: true };
      } else {
        console.log(`Server is not ok: ${JSON.stringify(result.data)}`);
        return { isServerOk: false, detail: JSON.stringify(result.data) };
      }
    } catch (error) {
      console.log(
        `Cannot check server status because a error is thrown; error: ${error}`
      );
      return { isServerOk: false, detail: JSON.stringify(error) };
    }
  }

  private async sendMessage() {
    const serverStatus = await this.checkServer();
    console.log(serverStatus.isServerOk ? "Server is ok" : "Server is not ok");

    if (serverStatus.isServerOk == false) {
      await lastValueFrom(
        this.httpService.post(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: process.env.TELEGRAM_BOT_CHAT_ID,
            text: `Server is down. Check the server immediately. Detail: ${
              serverStatus.detail ?? "(no detail)"
            }`
          }
        )
      );
    }
  }

  async handler(event: ScheduledEvent, context: Context) {
    await this.sendMessage();
  }
}

@Module({
  imports: [HttpModule],
  providers: [AppService]
})
export class AppModule {}
