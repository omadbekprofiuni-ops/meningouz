# MeningoUz — deploy sozlamalari
# ---------------------------------
# Bu faylni NUSXA olib `config.sh` deb saqlang, keyin qiymatlarni to'ldiring:
#   cp deploy/config.example.sh deploy/config.sh
# config.sh git'ga tushmaydi (.gitignore'da).

# Server manzili (IP yoki domen) va SSH foydalanuvchi
SSH_HOST="123.45.67.89"          # ← server IP manzilingiz
SSH_USER="root"                  # ← SSH foydalanuvchi (root yoki ubuntu va h.k.)
SSH_PORT="22"                    # ← SSH porti (odatda 22)

# Serverda loyiha joylashadigan jild
DEPLOY_DIR="/var/www/meningouz"

# Domen — nginx va bepul HTTPS sertifikati uchun.
# Domeningiz bo'lmasa bo'sh qoldiring (""), u holda sayt server IP orqali ochiladi.
DOMAIN="meningouz.uz"            # ← domeningiz yoki ""

# Node server ishlaydigan ichki port (nginx shu portga uzatadi). O'zgartirish shart emas.
APP_PORT="3000"

# HTTPS sertifikati uchun e-mail (Let's Encrypt ogohlantirishlari shu yerga keladi)
CERTBOT_EMAIL="omadbekprofiuni@gmail.com"
