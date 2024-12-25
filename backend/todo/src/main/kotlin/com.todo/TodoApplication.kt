package com.todo

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories

@EnableJdbcRepositories
@SpringBootApplication
class TodoApplication

fun main(args: Array<String>) {
    SpringApplication.run(TodoApplication::class.java, *args)
}
