import { defineConfig } from "cypress"

export default defineConfig({
    video: true,
    modifyObstructiveCode: false,
    e2e: {
        // NGINX listens on this port, on local env use localhost:4000 or paq-front:4000
        baseUrl: "http://localhost:5173",
    },
})
