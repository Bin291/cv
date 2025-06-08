import { Component } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService) {
  }

  onGoogleLogin() {
    this.authService.loginWithGoogle().subscribe({
      next: async (result: any) => {
        const user = result?.user;

        if (!user) {
          console.error('❌ Không có user sau đăng nhập');
          return;
        }

        try {
          const token = await user.getIdToken(); // 🔑 Lấy Firebase ID token
          localStorage.setItem('accessToken', token); // ✅ Lưu vào localStorage
          console.log('✅ Đăng nhập thành công. Token:', token);

          // ✅ Optional: bạn có thể lưu thêm tên hoặc email nếu cần
          localStorage.setItem('authData', JSON.stringify({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          }));

          // ✅ Điều hướng về Home hoặc nơi bạn muốn
          window.location.href = '/';
        } catch (err) {
          console.error('❌ Lỗi khi lấy token:', err);
        }
      },
      error: (err) => {
        console.error('❌ Lỗi khi đăng nhập với Google:', err);
      },
    });
  }
}
