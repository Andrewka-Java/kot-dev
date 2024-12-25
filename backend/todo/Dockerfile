FROM gradle:8.12.0-jdk21-alpine AS build
WORKDIR /backend
COPY build.gradle.kts settings.gradle.kts ./
COPY src ./src
RUN gradle build -x test

FROM openjdk:21-jdk-slim
WORKDIR /backend
COPY --from=build /backend/build/libs/*jar backend.jar
EXPOSE 8090
CMD ["java", "-jar", "backend.jar"]