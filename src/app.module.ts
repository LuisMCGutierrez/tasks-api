import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Define el motor de base de datos que vas a usar.
      type: 'postgres',

      // La dirección del servidor.
      // OJO: Si NestJS corre en tu PC, usas 'localhost'.
      // Si NestJS corre dentro de Docker, aquí deberías poner 'db' (el nombre del servicio).
      host: 'localhost',

      // El puerto donde escucha PostgreSQL. Debe coincidir con el del Docker Compose.
      port: 5432,

      // Credenciales: deben ser EXACTAMENTE las mismas que pusiste en 'environment' de Docker.
      username: 'nest',
      password: 'nest123',

      // El nombre de la base de datos a la que te conectarás.
      database: 'tasks_db',

      // Aquí listamos todas las ENTIDADES (clases con @Entity) que TypeORM debe mapear.
      // Es justo aquí donde te daba el error: 'User' debe ser una CLASE, no una interfaz.
      entities: [User],

      // Sincronización automática: Si agregas un campo a tu clase User,
      // TypeORM creará la columna en la tabla automáticamente.
      // ¡PELIGRO!: Solo úsalo en desarrollo. En producción puede borrar datos reales.
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
