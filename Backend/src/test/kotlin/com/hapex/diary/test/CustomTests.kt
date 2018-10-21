package com.hapex.diary.test

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort

@RunWith(MockitoJUnitRunner::class)
class CustomTests {

    @Test
    fun `generate order by`() {
        val selectAllQuery = "select * from table"
        val sort = Sort.by(Sort.Order.asc("prop1asc"), Sort.Order.desc("prop2desc"))

        val sql = sort
                .map { "${it.property} ${it.direction}" }
                .joinToString(
                        separator = ", ",
                        prefix = "$selectAllQuery order by ",
                        postfix = ";")

        System.out.println(sql)
        assertThat(sql).isEqualToIgnoringCase("select * from table order by prop1asc asc, prop2desc desc;")
    }

    @Test
    fun `generate order and limit`() {
        val selectAllQuery = "select * from table"
        val sort = Sort.by(Sort.Order.asc("prop1asc"), Sort.Order.desc("prop2desc"))
        val pageable = PageRequest.of(2, 10, sort)

        val size = pageable.pageSize
        val offset = pageable.pageNumber*size
        val limit = " LIMIT $size OFFSET $offset"
        val sql = pageable.sort
                .map { "${it.property} ${it.direction}" }
                .joinToString(
                        separator = ", ",
                        prefix = "$selectAllQuery order by ",
                        postfix = limit)

        System.out.println(sql)
        assertThat(sql).isEqualToIgnoringCase("select * from table order by prop1asc asc, prop2desc desc limit 10 offset 20")
    }
}