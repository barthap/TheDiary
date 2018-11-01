package com.hapex.diary.data.model

enum class EntityType(val code: Char, val tableName: String) {
    STORY('S', "Story"),
    DOCUMENT('D', "Documents"),
    FILE('F', "Files"),
    PHOTO('I', "Photos"),
    PERSON('P', "People");

    companion object {
        fun fromTypeLetter(letter: Char): EntityType = EntityType.values().first { it.code == letter }
        fun fromTableName(tableName: String): EntityType = EntityType.values().first { it.tableName == tableName }
    }
}

data class Type(
        val type: EntityType,
        val typeName: String
)