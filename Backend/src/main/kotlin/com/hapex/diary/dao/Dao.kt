package com.hapex.diary.dao

import com.hapex.diary.model.EntityBase

import java.io.Serializable

interface Dao<T : EntityBase, ID : Serializable> {
    fun save(entity: T): T
    fun countAll(): Int
    fun findAll(): Collection<T>
    fun findById(id: ID): T?
    fun deleteById(id: ID)
    fun deleteAll()
}
