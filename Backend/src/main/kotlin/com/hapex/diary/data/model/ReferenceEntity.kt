package com.hapex.diary.data.model

import com.hapex.diary.data.model.EntityType

data class ReferenceEntity(
        val referenceId: Long,
        val sourceId: Long, //referencedIn --- as id
        val targetId: Long, //referencesTo --- as id
        val type: EntityType,
        val storyDateTime: String?,
        val storyHeader: String?,
        val fileTitle: String?,
        val personName: String?,
        val documentTitle: String?,
        val photoTitle: String?
)