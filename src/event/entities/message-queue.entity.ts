import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'message_queue' })
export class MessageQueue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'datetime' })
  time: string;
}
