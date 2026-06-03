#!/usr/bin/env bash
# MeningoUz — serverni BIR MARTA sozlash skripti.
# Bu skript SERVERDA ishga tushadi (deploy.sh uni o'zi yuboradi va chaqiradi).
# Vazifasi: Node.js + nginx o'rnatish, systemd xizmati va nginx konfiguratsiyasini
# yaratish, (domen bo'lsa) bepul HTTPS sertifikatini olish.
#
# Qo'lda ham ishlatsa bo'ladi:
#   sudo DEPLOY_DIR=/var/www/meningouz DOMAIN=meningouz.uz APP_PORT=3000 \
#        CERTBOT_EMAIL=you@mail.com bash server-setup.sh
set -euo pipefail

DEPLOY_DIR="${DEPLOY_DIR:-/var/www/meningouz}"
DOMAIN="${DOMAIN:-}"
APP_PORT="${APP_PORT:-3000}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-}"
SERVICE="meningouz"

echo "==> 1/5  Tizim paketlari yangilanmoqda..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y

echo "==> 2/5  Node.js (LTS) o'rnatilmoqda (agar yo'q bo'lsa)..."
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
echo "    Node: $(node -v)"

echo "==> 3/5  systemd xizmati yaratilmoqda: ${SERVICE}.service"
NODE_BIN="$(command -v node)"
mkdir -p "$DEPLOY_DIR"
cat > "/etc/systemd/system/${SERVICE}.service" <<EOF
[Unit]
Description=MeningoUz SPA server
After=network.target

[Service]
Type=simple
Environment=PORT=${APP_PORT}
WorkingDirectory=${DEPLOY_DIR}
ExecStart=${NODE_BIN} ${DEPLOY_DIR}/server.mjs
Restart=always
RestartSec=3
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
EOF

chown -R www-data:www-data "$DEPLOY_DIR"
systemctl daemon-reload
systemctl enable "${SERVICE}" >/dev/null 2>&1 || true
systemctl restart "${SERVICE}" || true

echo "==> 4/5  nginx o'rnatilmoqda va sozlanmoqda..."
if ! command -v nginx >/dev/null 2>&1; then
  apt-get install -y nginx
fi

SERVER_NAME="${DOMAIN:-_}"
cat > "/etc/nginx/sites-available/${SERVICE}" <<EOF
server {
    listen 80;
    server_name ${SERVER_NAME};

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

ln -sf "/etc/nginx/sites-available/${SERVICE}" "/etc/nginx/sites-enabled/${SERVICE}"
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> 5/5  HTTPS sertifikati..."
if [ -n "$DOMAIN" ] && [ -n "$CERTBOT_EMAIL" ]; then
  if ! command -v certbot >/dev/null 2>&1; then
    apt-get install -y certbot python3-certbot-nginx
  fi
  # Domen serverga yo'naltirilgan bo'lsa (A-record), sertifikat olinadi.
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos \
          -m "$CERTBOT_EMAIL" --redirect || \
    echo "    ! Sertifikat olinmadi — domen DNS'i serverga yo'naltirilganini tekshiring."
else
  echo "    Domen kiritilmagan — HTTPS o'tkazib yuborildi. Sayt IP orqali ochiladi."
fi

echo ""
echo "==> Sozlash tugadi."
systemctl --no-pager status "${SERVICE}" | head -5 || true
