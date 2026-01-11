import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const sessionInfo = createParamDecorator(
  (_, ctx: ExecutionContext): unknown =>
    ctx.switchToHttp().getRequest().session,
);
