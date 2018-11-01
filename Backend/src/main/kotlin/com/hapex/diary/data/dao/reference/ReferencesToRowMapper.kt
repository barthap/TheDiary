package com.hapex.diary.data.dao.reference

import com.hapex.diary.data.model.EntityType
import com.hapex.diary.data.model.ReferenceEntity
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class ReferencesToRowMapper : RowMapper<ReferenceEntity> {
    override fun mapRow(rs: ResultSet, rowNum: Int) = ReferenceEntity(
            referenceId = rs.getLong("ReferenceId"),
            sourceId = rs.getLong("SourceId"),
            targetId = rs.getLong("Id"),    //In referencesTo the ID represents target
            type = EntityType.fromTypeLetter(rs.getString("Type")[0]),
            storyDateTime = rs.getString("StoryDateTime"),
            storyHeader = rs.getString("StoryHeader"),
            fileTitle = rs.getString("FileTitle"),
            personName = rs.getString("PersonName"),
            documentTitle = rs.getString("DocumentTitle"),
            photoTitle = rs.getString("PhotoTitle")
    )
}