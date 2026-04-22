import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

// Este decorador le dice a TypeORM que esta clase representa una tabla en la DB.
// 'users' es el nombre que tendrá la tabla físicamente.
@Entity('users')
export class User {
  // Define la llave primaria de la tabla.
  // 'increment' hará que el ID sea 1, 2, 3... automáticamente.
  @PrimaryGeneratedColumn()
  id: number;

  // Una columna simple de tipo texto (varchar) para el nombre.
  @Column()
  name: string;

  // Columna para el email.
  // { unique: true } crea un índice de unicidad: no puede haber dos usuarios con el mismo correo.
  @Column({ unique: true })
  email: string;

  // Decorador especial que llena la fecha automáticamente
  // en el momento exacto en que se crea el registro.
  @CreateDateColumn()
  createdAt: Date;

  // Decorador que actualiza la fecha automáticamente
  // cada vez que modificas cualquier campo de este usuario.
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
}
