FROM node:20

WORKDIR /app

# COPY ../src/package*.json ./

# RUN npm install

COPY ../src ./



# RUN npm install -g create-vite

EXPOSE 3000

# CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]
COPY ./docker/entrypoint.sh /
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]