import * as TypeGraphQL from '@nestjs/graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { User } from '../../generated-graphql/models/User';
import { Workspace } from '../../generated-graphql/models/Workspace';
import { WorkspaceMember } from '../../generated-graphql/models/WorkspaceMember';
import { PrismaClient } from '@prisma/client';

@TypeGraphQL.Resolver(() => WorkspaceMember)
export class WorkspaceMemberRelationsResolver {
  constructor(private readonly prismaClient: PrismaClient) {}

  @TypeGraphQL.ResolveField(() => User, {
    nullable: false,
  })
  async user(
    @TypeGraphQL.Parent() workspaceMember: WorkspaceMember,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<User> {
    return this.prismaClient.workspaceMember
      .findUniqueOrThrow({
        where: {
          id: workspaceMember.id,
        },
      })
      .user({});
  }

  @TypeGraphQL.ResolveField((_type) => Workspace, {
    nullable: false,
  })
  async workspace(
    @TypeGraphQL.Parent() workspaceMember: WorkspaceMember,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<Workspace> {
    return this.prismaClient.workspaceMember
      .findUniqueOrThrow({
        where: {
          id: workspaceMember.id,
        },
      })
      .workspace({});
  }
}