package com.todo.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table

@Table("todo_items")
data class TodoItem(
    @Id @Column("id") var id: Long? = null,
    @Column("todo_item_name") val todoItemName: String,
    @Column("priority") val priority: Int,
)
