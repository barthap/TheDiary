package com.hapex.diary.data.dao

import com.hapex.diary.data.dao.base.AbstractJdbcDao
import com.hapex.diary.data.dao.base.DaoHelper
import com.hapex.diary.data.dao.reference.ReferenceDao
import com.hapex.diary.data.model.EntityType
import com.hapex.diary.data.model.Photo
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
@Transactional
class PhotoDaoImpl(jdbcTemplate: JdbcTemplate,
                   namedJdbc: NamedParameterJdbcTemplate,
                   daoHelper: DaoHelper,
                   refDao: ReferenceDao)
    : AbstractJdbcDao<Photo, Long>(
        "Photos",
        "PhotoView",
        "PhotoId",
        PhotoRowMapper(daoHelper),
        jdbcTemplate, namedJdbc, daoHelper, refDao), PhotoDao {

    override fun save(entity: Photo): Photo {
        if(entity.id > 0)
            updatePhoto(entity)
        else
            createPhoto(entity)

        return entity
    }

    private fun createPhoto(photo: Photo) {
        val base = daoHelper.createEntityBase(EntityType.PHOTO)
        photo.updateBase(base)

        val query = "insert into Photos (PhotoId, Filename, Title, Description) values (:id, :filename, :title, :description)"

        namedJdbc.update(query, getParams(photo))
    }

    private fun updatePhoto(photo: Photo) {

        val sql = "update Photos SET Filename=:filename, Title=:title, Description=:description WHERE PhotoId=:id"

        namedJdbc.update(sql, getParams(photo))
    }

    private fun getParams(photo: Photo): MapSqlParameterSource {
        return MapSqlParameterSource()
                .addValue("id", photo.id)
                .addValue("filename", photo.filename)
                .addValue("title", photo.title)
                .addValue("description", photo.description)
    }
}