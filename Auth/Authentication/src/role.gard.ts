import { CanActivate, ExecutionContext, Injectable, mixin } from "@nestjs/common";

export function RoleGuard(role: string) {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      return request.user && request.user.role === role;
    }
  }
  return mixin(RoleGuardMixin);
}
