# PUC Schedule SMS
To build docker image
```
docker build --build-arg DATABASE_URL=<DATABASE_URL> -t puc-schedule-sms:latest .
```
To run
```
docker container run -d --rm --env-file=server/.env -p 3110:3110 puc-schedule-sms:latest
```