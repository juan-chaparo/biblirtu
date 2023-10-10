## Instalación
 Primero, instala todas las dependencias o librerias.
 
```bash
npm i
# or
yarn i
# or
npm install
```

 Segundo, ejecuta el esquema de prisma, recuerda tener la base de datos creada btp_crud y recuerda cambiar las variables de entorno en .env segun tus configuraciones del servidor, la base de datos esta en mysql

 ```bash
npx prisma db push
```

## Empezando

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre http://localhost:3000 en tu navegador para ver el resultado.
