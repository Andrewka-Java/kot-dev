package com.todo.repository

import com.todo.model.TodoItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface TodoItemRepository : CrudRepository<TodoItem, Long>
