package com.hapex.diary.util

import org.omg.CORBA.Object

class QueryBuilder {

    companion object {
        fun select(tableName: String) = SelectQueryBuilder(tableName)
        fun insert(tableName: String) = InsertQueryBuilder(tableName)
        fun update(tableName: String) = UpdateQueryBuilder(tableName)
        fun delete(tableName: String) = DeleteQueryBuilder(tableName)
        fun count(tableName: String) = CountQueryBuilder(tableName)
    }

    class SelectQueryBuilder internal constructor(tableName: String)
        : AbstractQueryBuilder("SELECT * FROM $tableName") {


        fun where(name: String, value: Any, op: String = "=") = where("$name$op$value")

        fun where(condition: String) = this.apply {
            this.builder.append(" WHERE $condition")
        }
    }

    class CountQueryBuilder internal constructor(tableName: String)
        : AbstractQueryBuilder("SELECT COUNT(*) FROM $tableName") {

        fun where(name: String, value: Any, op: String = "=") = where("$name$op$value")

        fun where(condition: String) = this.apply {
            this.builder.append(" WHERE $condition")
        }
    }

    class InsertQueryBuilder internal constructor(tableName: String)
        : AbstractQueryBuilder("INSERT INTO $tableName") {

        private val params = HashMap<String, Any>()

        fun withParam(name: String, value: Any) = this.apply {
            this.params[name] = value
        }

        fun withParams(map: Map<String, Any>) = this.apply {
            this.params.putAll(map)
        }

        override fun build(): String {

            builder.append(params.keys.joinToString(
                    separator = ", ",
                    prefix = " (",
                    postfix = ")"
            )).append(params.values.joinToString(
                    separator = ", ",
                    prefix = " VALUES (",
                    postfix = ")"))

            return builder.toString()
        }
    }

    class UpdateQueryBuilder internal constructor(tableName: String)
        : AbstractQueryBuilder("UPDATE $tableName"){

        private val params = HashMap<String, Any>()

        fun set(name: String, value: Any) = this.apply {
            this.params[name] = value
        }

        fun setAll(map: Map<String, Any>) = this.apply {
            this.params.putAll(map)
        }

        fun where(name: String, value: Any, op: String = "=") = where("$name$op$value")

        fun where(condition: String)  = this.apply {
            this.builder.append(
                    this.params.map { "${it.key}=${it.value}" }
                            .joinToString(
                                    prefix = " SET ",
                                    separator = ", "
                            )
            ).append(" WHERE $condition")
        }
    }

    class DeleteQueryBuilder internal constructor(tableName: String)
        : AbstractQueryBuilder("DELETE FROM $tableName"){

        fun where(name: String, value: Any, op: String = "=") = where("$name$op$value")

        fun where(condition: String) = this.apply {
            this.builder.append(" WHERE $condition")
        }
    }

    abstract class AbstractQueryBuilder(baseQuery: String) {
        protected val builder = StringBuffer(baseQuery)

        open fun build() = builder.toString()

        override fun toString() = build()
    }
}
