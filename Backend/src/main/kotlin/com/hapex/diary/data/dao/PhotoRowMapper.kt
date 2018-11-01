package com.hapex.diary.data.dao

import com.hapex.diary.data.dao.base.DaoHelper
import com.hapex.diary.data.model.Photo
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet


class PhotoRowMapper(private val daoHelper: DaoHelper) : RowMapper<Photo> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Photo? {

        val p = Photo(rs.getString("Title"),
                rs.getString("Filename"),
                rs.getString("Description"))

        daoHelper.fillBaseEntity(p, rs)
        return p
    }

}