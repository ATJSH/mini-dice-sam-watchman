build-WatchAndAlertViaTelegram:
	yarn workspace @lambdas/watch-and-alert-via-telegram webpack:sambuild; cp lambdas-ts/watch-and-alert-via-telegram/dist/*.js "$(ARTIFACTS_DIR)"