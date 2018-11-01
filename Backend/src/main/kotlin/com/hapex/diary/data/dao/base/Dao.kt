package com.hapex.diary.data.dao.base

import com.hapex.diary.data.model.EntityBase

import java.io.Serializable

interface Dao<T : EntityBase, ID : Serializable> {
    fun save(entity: T): T
    fun countAll(): Int
    fun findAll(): Collection<T>
    fun findById(id: ID): T?
    fun deleteById(id: ID)
    fun deleteAll()
    fun existsById(id: ID): Boolean
}
