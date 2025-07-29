# KBB服务器网站部署指南

## 目录
- [项目介绍](#项目介绍)
- [本地开发](#本地开发)
- [部署到个人服务器](#部署到个人服务器)
- [常见问题](#常见问题)

## 项目介绍
这是一个使用React 18、TypeScript和Tailwind CSS构建的Minecraft服务器网站，包含首页、公告、捐赠页面和管理员后台等功能。

## 本地开发

### 环境要求
- Node.js 16.x或更高版本
- pnpm包管理器

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```
项目将在 http://localhost:3000 启动

### 构建生产版本
```bash
pnpm build
```
构建后的文件将生成在 `dist` 目录中

## 部署到个人服务器

### 1. 准备工作
- 拥有一台运行Linux的服务器(推荐Ubuntu 20.04+)
- 服务器已安装Nginx
- 已通过SSH访问权限

### 2. 构建项目
在本地环境执行构建命令:
```bash
pnpm build
```

### 3. 上传文件到服务器
#### 方法1: 使用SCP命令
```bash
scp -r dist/* user@your-server-ip:/var/www/kbb-website
```

#### 方法2: 使用FTP工具
通过FileZilla等FTP工具将dist目录中的所有文件上传到服务器的`/var/www/kbb-website`目录

### 4. 配置Nginx
创建Nginx配置文件:
```bash
sudo nano /etc/nginx/sites-available/kbb-website
```

添加以下配置:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或服务器IP

    root /var/www/kbb-website;
    index index.html;

    # 支持React Router的客户端路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 设置缓存控制
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

启用站点配置:
```bash
sudo ln -s /etc/nginx/sites-available/kbb-website /etc/nginx/sites-enabled/
sudo nginx -t  # 测试配置是否有误
sudo systemctl restart nginx
```

### 5. 配置HTTPS (推荐)
使用Let's Encrypt获取免费SSL证书:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 常见问题

### Q: 刷新页面出现404错误怎么办?
A: 确保Nginx配置中包含了支持React Router的配置:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Q: 如何更新网站内容?
A: 重新构建项目并上传更新后的文件到服务器:
```bash
pnpm build
scp -r dist/* user@your-server-ip:/var/www/kbb-website
```

### Q: 服务器需要安装Node.js吗?
A: 不需要，这是一个静态网站，只需Nginx即可运行