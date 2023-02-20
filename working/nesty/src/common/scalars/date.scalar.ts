import { Kind, ValueNode } from 'graphql';
import { CustomScalar, Scalar } from '@nestjs/graphql';

@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<number, Date | null> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): number {
    return value.getTime(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    return null;
  }
}
