import { AuthLoggedInUserDto } from "apps/admin/src/api/models/auth.request";

export interface AppAuthState {
  access_token: string | null;
  user: AuthLoggedInUserDto | null;
}
