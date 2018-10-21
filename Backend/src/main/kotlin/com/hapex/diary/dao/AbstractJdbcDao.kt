package com.hapex.diary.dao

import com.hapex.diary.model.EntityBase
import com.hapex.diary.model.EntityType
import com.hapex.diary.util.QueryBuilder
import com.hapex.diary.util.exception.sql.NoRecordAffectedException
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.transaction.annotation.Transactional
import org.springframework.util.Assert
import java.io.Serializable

@Transactional
abstract class AbstractJdbcDao<T : EntityBase, ID : Serializable>
    (
            protected val tableName: String,
            protected val viewName: String,
            protected val idColumnName: String,
            protected val rowMapper: RowMapper<T>,
            protected val jdbcTemplate: JdbcTemplate,
            protected val namedJdbc: NamedParameterJdbcTemplate,
            protected val daoHelper: DaoHelper
    ) : PagingAndSortingDao<T,ID> {

    private val selectAllQuery = QueryBuilder.select(tableName).build()


    override fun countAll(): Int {
        //val query = "SELECT COUNT($idColumnName) FROM $tableName";
        val query = QueryBuilder.count(tableName).build()
        return jdbcTemplate.queryForObject(query, Int::class.java) ?: 0;
    }

    override fun findAll(): Collection<T> = jdbcTemplate.query(selectAllQuery, rowMapper)


    override fun findById(id: ID): T? {
        val query = "SELECT * FROM $viewName WHERE Id=?";
        val res: List<T> = jdbcTemplate.query(query, rowMapper, id);
        return res.firstOrNull()
    }

    override fun findAll(sort: Sort): Collection<T> {
        val sql = if(sort.any()) sort
                .map { "${it.property} ${it.direction}" }
                .joinToString(
                        separator = ", ",
                        prefix = "$selectAllQuery order by ",
                        postfix = "")
        else selectAllQuery

        return jdbcTemplate.query(sql, rowMapper)
    }

    override fun findAll(pageable: Pageable): Page<T> {

        val size = pageable.pageSize
        val offset = pageable.pageNumber*size
        val limit = " LIMIT $size OFFSET $offset"
        val sql = if(pageable.sort.any())
            pageable.sort
                .map { "${it.property} ${it.direction}" }
                .joinToString(
                        separator = ", ",
                        prefix = "$selectAllQuery order by ",
                        postfix = limit)
        else "$selectAllQuery $limit"

        return PageImpl<T>(
                jdbcTemplate.query(sql, rowMapper),
                pageable,
                countAll().toLong())
    }

    override fun deleteById(id: ID) {

        val entityQuery = QueryBuilder.delete(tableName).where(idColumnName, "?").build()
        val itemQuery = QueryBuilder.delete("Items").where("ItemId", "?").build()
        //val itemQuery = "delete from Items where ItemId=?"
        //val entityQuery = "delete from $tableName where $idColumnName=?"

        val rowsAffected = jdbcTemplate.update(entityQuery, id)

        //if couldn't delete from Entity table, dont delete from Item table
        if(rowsAffected > 0)
            jdbcTemplate.update(itemQuery, id)
        else    //TODO: Create Specific exception (non-runtime!)
            throw NoRecordAffectedException("No rows deleted in $tableName with id=$idColumnName!")
    }

    override fun deleteAll() {
        val type = EntityType.fromTableName(tableName).code

        val entityQuery = QueryBuilder.delete(tableName).build()
        val itemsQuery
                = QueryBuilder.delete("Items").where("TypeCode", type).build()
        //val entityQuery = "delete from $tableName"
        //val itemsQuery = "delete from Items where TypeCode=$type"

        val entityRows = jdbcTemplate.update(entityQuery)
        val itemRows = jdbcTemplate.update(itemsQuery)
        Assert.isTrue(itemRows.equals(entityRows),
                "deleteAll fail! Affected rows in $tableName: $entityRows vs $itemRows in Item")
    }
}


