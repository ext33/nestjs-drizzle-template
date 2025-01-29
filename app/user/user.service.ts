import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DrizzleAsyncProvider, schema } from '../common/db/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { users } from './user.models';
import { eq, like, or } from 'drizzle-orm';
import { UserPublicDto, UserPrivateDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>
  ) {}

  async create(userInsert: CreateUserDto): Promise<UserPublicDto> {
    const hashedPassword = await bcrypt.hash(userInsert.password, 10);

    const userData = {
      ...userInsert,
      password: hashedPassword,
    };

    const [user] = await this.db.insert(users).values(userData).onConflictDoNothing().returning({
      id: users.id,
      email: users.email,
      name: users.name,
      avatar: users.avatar,
      role: users.role,
      active: users.active,
    });

    return user;
  }

  async findAll(search?: string): Promise<UserPublicDto[]> {
    return this.db.query.users.findMany({
      where: search
        ? or(like(users.email, `%${search}%`), like(users.name, `%${search}%`))
        : undefined,
      columns: {
        password: false,
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
      },
    });
  }

  async findOne(email: string): Promise<UserPrivateDto | undefined> {
    return this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async findOneById(id: string): Promise<UserPrivateDto | undefined> {
    return this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async findOnePublic(email: string): Promise<UserPublicDto | undefined> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        password: false,
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByIdPublic(id: string): Promise<UserPublicDto | undefined> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        password: false,
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updatePassword(id: string, password: string): Promise<{ id: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [row] = await this.db
      .update(users)
      .set({ password: hashedPassword, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
      });

    return row;
  }

  async update(id: string, user: UpdateUserDto): Promise<{ id: string }> {
    const userRow = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!userRow) {
      throw new NotFoundException('User not found');
    }

    const [row] = await this.db
      .update(users)
      .set({ ...user, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
      });

    return row;
  }

  async remove(id: string): Promise<{ id: string }> {
    const userRow = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!userRow) {
      throw new NotFoundException('User not found');
    }

    const [row] = await this.db
      .update(users)
      .set({ deletedAt: new Date(), active: false })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
      });

    return row;
  }
}
