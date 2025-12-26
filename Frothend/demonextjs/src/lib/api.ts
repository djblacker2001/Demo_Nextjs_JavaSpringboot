import axios, { AxiosInstance } from 'axios';
import { ApiResponse, User, LoginForm, RegisterForm, AuthResponse } from '@/types';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor để thêm token
        this.client.interceptors.request.use(
            (config) => {
                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('token');
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor để xử lý lỗi
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Token hết hạn, xóa token và redirect
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    // Login
    async login(credentials: LoginForm): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await this.client.post('/auth/login', credentials);
            
            return {
                success: true,
                data: response.data,
                message: 'Đăng nhập thành công',
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Đăng nhập thất bại',
            };
        }
    }

    // Register
    async register(data: RegisterForm): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await this.client.post('/auth/register', data);
            
            return {
                success: true,
                data: response.data,
                message: 'Đăng ký thành công',
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Đăng ký thất bại',
            };
        }
    }

    // Logout
    async logout(): Promise<void> {
        try {
            await this.client.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }

    // Get current user
    async getCurrentUser(): Promise<ApiResponse<User>> {
        try {
            const response = await this.client.get('/auth/me');
            
            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Không thể lấy thông tin người dùng',
            };
        }
    }
}

// Create and export singleton instance
const apiClient = new ApiClient();
export default apiClient;