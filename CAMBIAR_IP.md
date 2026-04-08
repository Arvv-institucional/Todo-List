## 🔧 Cómo cambiar la IP si se desconecta

Si en algún momento la app deja de conectarse a la base de datos, sigue estos pasos:

### Paso 1: Obtén tu IP local
Abre PowerShell y ejecuta:
```powershell
ipconfig
```

Busca en el resultado la sección de **Wi-Fi** o conexión activa y copia el valor de **"IPv4 Address"**
Ejemplo: `10.10.151.195`

### Paso 2: Abre el archivo de configuración
Abre este archivo en VS Code:
```
Todo-List/config/api.ts
```

### Paso 3: Cambia la IP
Busca esta línea:
```typescript
const API_IP = '10.10.151.195'; // ✅ TU IP
```

Reemplaza el número por tu nueva IP:
```typescript
const API_IP = '10.10.XXX.XXX'; // Tu nueva IP aquí
```

### Paso 4: Guarda y listo
- Presiona Ctrl + S para guardar
- La app en mobile se recargará automáticamente
- Debería funcionar de nuevo 🎉

---

## ⚠️ Importante
- **NO cambies nada más del archivo**
- Solo modifica el valor dentro de las comillas de `API_IP`
- Tu PC y móvil deben estar en la **misma red Wi-Fi**
- El API debe estar corriendo con `npm start` en la otra terminal
