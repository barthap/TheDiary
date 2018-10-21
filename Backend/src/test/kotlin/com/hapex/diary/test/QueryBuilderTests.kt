package com.hapex.diary.test

import com.hapex.diary.util.QueryBuilder
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class QueryBuilderTests {

    @Test
    fun `select all test`() {
        val result = QueryBuilder.select("table").build()

        assertThat(result).isEqualToIgnoringCase("select * from table")
    }

    @Test
    fun `select where test`() {
        val result = QueryBuilder.select("table")
                .where("age", 18, op = ">")
                .build()

        assertThat(result).isEqualToIgnoringCase("select * from table where age>18")
    }

    @Test
    fun `insert test`() {
        val result = QueryBuilder.insert("table")
                //.withParam("p2", "str") //THIS WILL GIVE UNDEFINED ORDER
                //.withParam("param1", 1)
                .withParams(mapOf(Pair("param1", 1), Pair("p2", "str")))
                .toString()

        assertThat(result).isEqualToIgnoringCase("insert into table (param1, p2) values (1, str)")
    }

    @Test
    fun `update test`() {
        val result = QueryBuilder.update("table")
                .set("param1", "val1")
                .set("p2", 2)
                .where("id", 1)
                .build()

        assertThat(result).isEqualToIgnoringCase("update table set p2=2, param1=val1 where id=1")
    }

    @Test
    fun `delete test`() {
        val result = QueryBuilder.delete("table")
                .where("id", 1)
                .build()

        assertThat(result).isEqualToIgnoringCase("delete from table where id=1")
    }

    @Test
    fun `delete all test`() {
        val result = QueryBuilder.delete("table").build()

        assertThat(result).isEqualToIgnoringCase("delete from table")
    }

    @Test
    fun `count test`() {
        val result = QueryBuilder.count("table").build()

        assertThat(result).isEqualToIgnoringCase("select COUNT(*) from table")
    }
}