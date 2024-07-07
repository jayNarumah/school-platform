import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthLoginRequestDto, AuthLoginResponseDto, UpdatePasswordDto, ForgotPasswordDto } from "apps/admin/src/api/models/auth.request";
import { environment } from "apps/admin/src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthEndpoint {
  baseUrl = `${environment.apiUrl}/student/auth`;

  constructor(private readonly httpClient: HttpClient) { }

  login(payload: AuthLoginRequestDto): Observable<{ data: AuthLoginResponseDto }> {
    return this.httpClient.post<{ data: AuthLoginResponseDto }>(`${this.baseUrl}/login`, payload);
  }

  updatePassword(payload: UpdatePasswordDto) {
    return this.httpClient.patch<UpdatePasswordDto>(`${this.baseUrl}/update-password`, payload)
  }

  forgotPassword(payload: ForgotPasswordDto) {
    return this.httpClient.patch<ForgotPasswordDto>(`${this.baseUrl}/forgot-password`, payload)
  }

  logout() {
    return this.httpClient.post(`${this.baseUrl}/logout`, {});
  }
}
