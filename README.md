# [mini-dice.com](https://mini-dice.com) SAM Watchman

AWS SAM(Serverless Application Model)을 사용하여 [mini-dice.com](https://mini-dice.com)의 서버 상태를 주기적으로 체크합니다.

## 기능

mini-dice-sam-watchman은 [NestJS 스탠드얼론 애플리케이션](https://docs.nestjs.com/standalone-applications#standalone-applications) 기능을 사용하여 애플리케이션을 부트스트래핑한다.

부트스트랩된 애플리케이션은 AWS Lambda 상에서 실행되며, Amazon EventBridge를 통해 애플리케이션을 주기적으로 실행한다.
함수 호출 주기에 대한 설정은 [template.yaml](./template.yaml)에 정의되어 있다.
