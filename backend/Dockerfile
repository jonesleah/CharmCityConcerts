FROM ghcr.io/puppeteer/puppeteer:22.12.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN apt-get update
RUN apt-get install -y \
  xvfb \
  libgtk-3-0 \
  libx11-xcb1 \
  libnss3 \
  libasound2
RUN rm -rf /var/lib/apt/lists/*

EXPOSE 8080

CMD ["xvfb-run", "--server-args='-screen 0 1024x768x24'", "node", "server.js"]
