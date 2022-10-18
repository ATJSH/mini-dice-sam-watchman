# [mini-dice.com](https://mini-dice.com) SAM Watchman

AWS SAM(Serverless Application Model)을 사용하여 [mini-dice.com](https://mini-dice.com)의 서버 상태를 주기적으로 체크한다.

## 기능

### WatchAndAlertViaTelegram

서버의 헬스체크용 엔드포인트에서 서버 상태를 확인한다. 만약 서버 상태 정보에서 이슈가 확인되는 경우, 개발자의 Telegram 채팅방을 통해 이슈를 전파시킨다.

WatchAndAlertViaTelegram은 [NestJS 스탠드얼론 애플리케이션](https://docs.nestjs.com/standalone-applications#standalone-applications)이다.

WatchAndAlertViaTelegram은 Amazon EventBridge로 10분마다 실행 트리거가 동작하며, AWS Lambda 상에서 실행된다.
