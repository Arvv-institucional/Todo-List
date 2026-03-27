# 🐳 Comandos Esenciales de Docker Compose

Guía rápida para la gestión de contenedores y servicios.

| Comando | Descripción |
| :--- | :--- |
| `docker-compose up -d` | **El más importante.** Descarga la imagen, crea el contenedor y lo inicia en segundo plano (*detached*). |
| `docker-compose ps`    | Muestra el estado de los contenedores (si están `Up` o detenidos por error). |
| `docker-compose stop`  | Apaga los servicios (la base de datos, etc.) sin borrar nada. Úsalo al terminar de programar. |
| `docker-compose start` | Vuelve a encender los contenedores que habías detenido con `stop`. |
| `docker-compose down`  | **Cuidado:** Apaga y **borra** el contenedor (si configuraste volúmenes, tus datos están a salvo). |

---

### 🛠️ Diagnóstico y Logs

Si la base de datos no conecta o quieres ver qué está pasando internamente, usa:

```bash
docker-compose logs -f [nombre_del_servicio]