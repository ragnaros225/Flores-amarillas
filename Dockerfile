# ─────────────────────────────────────────────────────────
#  Flores Amarillas · 21 de Marzo
#  Dockerfile: HTML/CSS/JS + Nginx Alpine
#  Imagen muy ligera (~22 MB), ideal para Render
# ─────────────────────────────────────────────────────────

FROM nginx:1.27-alpine

# Metadatos
LABEL maintainer="Flores Amarillas"
LABEL description="Landing page de flores amarillas - 21 de Marzo"

# Eliminar la configuración por defecto de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración de nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/

# Copiar el contenido estático del sitio
COPY src/ /usr/share/nginx/html/

# Permisos correctos
RUN chmod -R 755 /usr/share/nginx/html \
    && chown -R nginx:nginx /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Healthcheck básico
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Nginx se lanza en foreground (necesario para Docker)
CMD ["nginx", "-g", "daemon off;"]
