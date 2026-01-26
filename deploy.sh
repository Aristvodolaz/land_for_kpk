#!/bin/bash

# ============================================
# Скрипт автоматического деплоя на сервер
# ============================================
#
# Использование:
# 1. Сделайте файл исполняемым: chmod +x deploy.sh
# 2. Настройте переменные ниже
# 3. Запустите: ./deploy.sh

# ============================================
# НАСТРОЙКИ (ИЗМЕНИТЕ НА СВОИ)
# ============================================

# SSH данные сервера
SERVER_USER="your_username"
SERVER_HOST="your-server.com"
SERVER_PORT="22"

# Путь к проекту на сервере
SERVER_PATH="/var/www/landing"

# Локальная директория проекта
LOCAL_PATH="."

# Исключения (не копировать)
EXCLUDE=(
    ".git"
    ".gitignore"
    "node_modules"
    ".DS_Store"
    "*.md"
    "deploy.sh"
    "nginx.conf"
)

# ============================================
# ЦВЕТА ДЛЯ ВЫВОДА
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================
# ФУНКЦИИ
# ============================================

function print_success {
    echo -e "${GREEN}✓ $1${NC}"
}

function print_error {
    echo -e "${RED}✗ $1${NC}"
}

function print_info {
    echo -e "${YELLOW}→ $1${NC}"
}

# ============================================
# ПРОВЕРКИ ПЕРЕД ДЕПЛОЕМ
# ============================================

print_info "Начинаем деплой..."

# Проверка SSH подключения
print_info "Проверка подключения к серверу..."
if ! ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST "exit" 2>/dev/null; then
    print_error "Не удалось подключиться к серверу"
    exit 1
fi
print_success "Подключение к серверу успешно"

# Проверка существования директории на сервере
print_info "Проверка директории на сервере..."
if ! ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST "test -d $SERVER_PATH"; then
    print_error "Директория $SERVER_PATH не существует на сервере"
    print_info "Создаём директорию..."
    ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_PATH"
fi
print_success "Директория на сервере готова"

# ============================================
# СОЗДАНИЕ БЭКАПА
# ============================================

print_info "Создание бэкапа текущей версии..."
BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST "
    if [ -d $SERVER_PATH ] && [ \"\$(ls -A $SERVER_PATH)\" ]; then
        mkdir -p $SERVER_PATH/../backups
        cp -r $SERVER_PATH $SERVER_PATH/../backups/$BACKUP_NAME
        echo 'Бэкап создан: $BACKUP_NAME'
    fi
"
print_success "Бэкап создан"

# ============================================
# ЗАГРУЗКА ФАЙЛОВ
# ============================================

print_info "Загрузка файлов на сервер..."

# Формируем список исключений для rsync
EXCLUDE_ARGS=""
for item in "${EXCLUDE[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude='$item'"
done

# Используем rsync для синхронизации
eval rsync -avz --delete \
    -e "ssh -p $SERVER_PORT" \
    $EXCLUDE_ARGS \
    $LOCAL_PATH/ \
    $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

if [ $? -eq 0 ]; then
    print_success "Файлы успешно загружены"
else
    print_error "Ошибка при загрузке файлов"
    exit 1
fi

# ============================================
# НАСТРОЙКА ПРАВ
# ============================================

print_info "Настройка прав доступа..."
ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST "
    find $SERVER_PATH -type d -exec chmod 755 {} \;
    find $SERVER_PATH -type f -exec chmod 644 {} \;
"
print_success "Права доступа настроены"

# ============================================
# ПЕРЕЗАПУСК ВЕБ-СЕРВЕРА (опционально)
# ============================================

print_info "Перезапуск веб-сервера..."

# Раскомментируйте нужный вариант:

# Для Nginx:
# ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST "sudo systemctl reload nginx"

# Для Apache:
# ssh -p $SERVER_PORT $SERVER_USER@$SERVER_HOST "sudo systemctl reload apache2"

print_success "Веб-сервер перезапущен"

# ============================================
# ОЧИСТКА КЭША (опционально)
# ============================================

# Cloudflare
# print_info "Очистка кэша Cloudflare..."
# curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache" \
#      -H "Authorization: Bearer YOUR_API_TOKEN" \
#      -H "Content-Type: application/json" \
#      --data '{"purge_everything":true}'

# ============================================
# ЗАВЕРШЕНИЕ
# ============================================

echo ""
print_success "========================================="
print_success "Деплой успешно завершён!"
print_success "========================================="
echo ""
print_info "Детали деплоя:"
echo "  • Сервер: $SERVER_USER@$SERVER_HOST"
echo "  • Путь: $SERVER_PATH"
echo "  • Бэкап: $BACKUP_NAME"
echo "  • Время: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""
print_info "Проверьте сайт: http://$SERVER_HOST"

# ============================================
# ЛОГ ДЕПЛОЯ
# ============================================

# Сохранение лога
LOG_FILE="deploy_log.txt"
echo "=== Деплой $(date '+%Y-%m-%d %H:%M:%S') ===" >> $LOG_FILE
echo "Сервер: $SERVER_USER@$SERVER_HOST:$SERVER_PATH" >> $LOG_FILE
echo "Бэкап: $BACKUP_NAME" >> $LOG_FILE
echo "" >> $LOG_FILE
