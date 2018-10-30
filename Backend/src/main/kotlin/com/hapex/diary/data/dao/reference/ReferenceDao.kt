package com.hapex.diary.data.dao.reference

import com.hapex.diary.data.model.EntityType
import com.hapex.diary.data.model.ReferenceEntity
import com.hapex.diary.util.exception.sql.NoRecordAffectedException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
@Transactional
class ReferenceDao(val jdbcTemplate: JdbcTemplate) {
    /**
     * Returns entities which are referencing specified entity (ReferencedIn)
     * @param targetEntityId Reference target
     * @return List of source entities
     */
    fun findReferenceSources(targetEntityId: Long): Collection<ReferenceEntity> {
        val sql = "SELECT * FROM ReferencedIn WHERE TargetId=?"
        return jdbcTemplate.query(sql, ReferencedInRowMapper(), targetEntityId)
    }

    /**
     * Returns entities which are referenced by specified entity (ReferencesTo)
     * @param sourceEntityId Reference source entity
     * @return List of targeted entities
     */
    fun findReferenceTargets(sourceEntityId: Long): Collection<ReferenceEntity> {
        val sql="SELECT * FROM ReferencesTo WHERE SourceId=?"
        return jdbcTemplate.query(sql, ReferencesToRowMapper(), sourceEntityId)
    }

    fun createReference(souceId: Long, targetId: Long) {
        val sql = "INSERT INTO Reference (ReferenceId, SourceId, TargetId) VALUES (NULL, ?, ?)"
        jdbcTemplate.update(sql, souceId, targetId)
    }

    /**
     * Removes single reference
     */
    fun removeReference(referenceId: Long) {
        val sql = "DELETE FROM Reference WHERE ReferenceId=?"
        if(jdbcTemplate.update(sql, referenceId) == 0)
            throw NoRecordAffectedException("Couldn't delete reference id=$referenceId!" +
                    "Is the ID correct?")
    }

    /**
     * Removes all references for specified entity (ItemId)
     */
    fun removeReferencesForEntity(entityId: Long) {
        val sql = "DELETE FROM Reference WHERE SourceId=? OR TargetId=?"
        jdbcTemplate.update(sql, entityId, entityId)
    }

    /**
     * Removes all references for whole entity type, for example for all Stories
     */
    fun removeReferencesForEntityType(type: EntityType) {
        val subQuery = "SELECT ItemId from Items where TypeCode=?"
        val sql = "DELETE FROM Reference WHERE SourceId IN ($subQuery) OR TargetId IN ($subQuery)"
        jdbcTemplate.update(sql, type.code)
    }
}