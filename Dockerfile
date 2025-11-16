# ---------- Build Stage ----------
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
# Try ci first; fall back to install for lockfile mismatches
RUN npm ci || npm install
COPY . .
RUN npm run build

# ---------- Serve Stage ----------
FROM nginx:alpine

# SPA fallback so /route URLs work
RUN printf 'server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files $uri /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf

# Accept a build dir argument: dist (Vite) or build (CRA)
ARG BUILD_DIR=dist
# Copy Vite output if present; otherwise fall back to CRA's build/
# (If neither exists, the copy will fail — which is what we want)
COPY --from=build /app/${BUILD_DIR} /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

