#!/usr/bin/env bash
# MeningoUz — TO'G'RIDAN-TO'G'RI SERVERDA ishga tushirish skripti.
# Repo serverga clone qilingan bo'lsa, shu skript hammasini qiladi:
#  1) Node.js o'rnatadi (yo'q bo'lsa)
#  2) npm install + build
#  3) systemd xizmati (doim ishlab turadi, qayta yoqilsa avtomatik ishga tushadi)
#  4) nginx (80/443) + domen
#  5) bepul HTTPS sertifikat (domen bo'lsa)
#
# Ishlatish (repo ichida, root yoki sudo bilan):
#   sudo DOMAIN=meningouz.uz CERTBOT_EMAIL=siz@mail.com bash deploy/server-run.sh
#
# Domeningiz bo'lmasa DOMAIN'ni bermang — sayt server IP orqali ochiladi:
#   sudo bash deploy/server-run.sh
set -euo pipefail

# Repo ildizini aniqlash (bu skript deploy/ ichida)
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOMAIN="${DOMAIN:-}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-}"
APP_PORT="${APP_PORT:-3000}"
SERVICE="meningouz"

echo "==> Loyiha jildi: $APP_DIR"
cd "$APP_DIR"

echo "==> 1/6  Tizim paketlari..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y

echo "==> 2/6  Node.js..."
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
echo "    Node: $(node -v)"

echo "==> 3/6  Bog'lamlar o'rnatilmoqda va build qilinmoqda..."
npm install
npm run build

echo "==> 4/6  systemd xizmati: ${SERVICE}.service"
NODE_BIN="$(command -v node)"
cat > "/etc/systemd/system/${SERVICE}.service" <<EOF
[Unit]
Description=MeningoUz SPA server
After=network.target

[Service]
Type=simple
Environment=PORT=${APP_PORT}
WorkingDirectory=${APP_DIR}
ExecStart=${NODE_BIN} ${APP_DIR}/server.mjs
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable "${SERVICE}" >/dev/null 2>&1 || true
systemctl restart "${SERVICE}"

echo "==> 5/6  nginx..."
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

echo "==> 6/6  HTTPS..."
if [ -n "$DOMAIN" ] && [ -n "$CERTBOT_EMAIL" ]; then
  command -v certbot >/dev/null 2>&1 || apt-get install -y certbot python3-certbot-nginx
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$CERTBOT_EMAIL" --redirect \
    || echo "    ! Sertifikat olinmadi — domen DNS'i server IP'ga yo'naltirilganini tekshiring."
else
  echo "    Domen/email berilmadi — HTTPS o'tkazib yuborildi (IP orqali ishlaydi)."
fi

echo ""
echo "============================================"
systemctl is-active "${SERVICE}" >/dev/null && echo "✅ Xizmat ishlayapti: ${SERVICE}"
if [ -n "$DOMAIN" ]; then
  echo "🌐 Sayt:  https://${DOMAIN}"
else
  IP="$(hostname -I | awk '{print $1}')"
  echo "🌐 Sayt:  http://${IP}"
fi
echo "============================================"
