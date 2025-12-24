import { CanActivate, ExecutionContext } from "@nestjs/common";

export class RoleGuard implements CanActivate {

  private rolePass: string;
  constructor(role: string) {
    this.rolePass = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request: any = ctx.getRequest<Request>();
    return this.rolePass == request.user.role;

  }
}