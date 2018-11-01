package com.hapex.diary

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.web.config.EnableSpringDataWebSupport

@SpringBootApplication
@EnableSpringDataWebSupport
class DiaryApplication

fun main(args: Array<String>) {
    runApplication<DiaryApplication>(*args)
}
