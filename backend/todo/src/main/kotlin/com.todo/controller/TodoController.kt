@file:Suppress("ktlint:standard:no-wildcard-imports")

package com.todo.controller

import com.todo.model.TodoItem
import com.todo.service.TodoItemService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api")
class TodoController(
    private val todoItemService: TodoItemService,
) {
    @GetMapping("/items")
    fun getAllTodoItem() =
        ResponseEntity.ok(
            todoItemService.getAllTodoItems(),
        )

    @GetMapping("/items/{id}")
    fun getTodoItem(
        @PathVariable id: Long,
    ) = ResponseEntity.ok(
        todoItemService.getTodoItemById(id),
    )

    @PostMapping("/items")
    fun createTodoItem(
        @RequestBody todoItem: TodoItem,
    ) = todoItemService.save(todoItem).let {
        ResponseEntity
            .created(URI("/${todoItem.id}"))
            .body(it)
    }

    @PutMapping("/items/{id}")
    fun updateTodoItem(
        @PathVariable id: Long,
        @RequestBody todoItem: TodoItem,
    ) = when (todoItem.id) {
        id -> todoItem
        null -> todoItem.also { it.id = id }
        else -> null
    }?.let { item ->
        todoItemService.save(item)
        ResponseEntity.ok(item)
    } ?: ResponseEntity.badRequest()

    @DeleteMapping("/items/{id}")
    fun deleteTodoItem(
        @PathVariable id: Long,
    ) = todoItemService.delete(id)
}
