package com.hapex.diary.test

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest
class DiaryApplicationTests {

    @Test   //empty test checks if Spring Boot context is loaded properly
    fun contextLoads() {
    }

}
