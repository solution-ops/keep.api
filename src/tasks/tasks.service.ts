import { Injectable } from '@nestjs/common';
import cuid from 'cuid';
import { PaginationQuery } from 'src/types/paginationQuery';
import { mockTasks } from './data/tasks';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = mockTasks;

  create(createTaskDto: CreateTaskDto) {
    const createdTask = {
      ...createTaskDto,
      id: cuid(),
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    this.tasks.push(createdTask);

    return createdTask;
  }

  findAll(paginationQuery: PaginationQuery) {
    const { limit = '10', offset = '0' } = paginationQuery;
    const pageSize = parseInt(limit);
    const pageNumber = parseInt(offset);
    return {
      total: this.tasks.length,
      results: this.tasks.slice(
        pageNumber * pageSize,
        pageNumber * pageSize + pageSize,
      ),
    };
  }

  findOne(id: string) {
    return this.tasks.find((item) => item.id === id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const existingPost = this.findOne(id);
    if (existingPost) {
      // Update the existing entity
    }
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}
