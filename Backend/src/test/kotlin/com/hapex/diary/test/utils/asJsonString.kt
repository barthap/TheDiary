package com.hapex.diary.test.utils

import com.fasterxml.jackson.databind.ObjectMapper

fun asJsonString(o: Any): String {
    try {
        val mapper = ObjectMapper()
        return mapper.writeValueAsString(o)
    } catch (e: Exception) {
        throw RuntimeException(e)
    }

}