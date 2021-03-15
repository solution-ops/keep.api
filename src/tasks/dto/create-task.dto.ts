import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly authorId: string;

  @IsString()
  readonly body: string;

  @IsString()
  readonly title: string;
}
