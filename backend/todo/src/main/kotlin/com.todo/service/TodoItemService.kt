package com.todo.service

import com.todo.model.TodoItem
import com.todo.repository.TodoItemRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class TodoItemService(
    private val todoItemRepository: TodoItemRepository,
) {
    fun getAllTodoItems(): List<TodoItem> = todoItemRepository.findAll().toList()

    fun getTodoItemById(id: Long): TodoItem? = todoItemRepository.findByIdOrNull(id)

    fun save(todoItem: TodoItem): TodoItem = todoItemRepository.save(todoItem)

    fun delete(id: Long): Unit = todoItemRepository.deleteById(id)
}
