A continuación tendras una devolución de mi parte sobre los aspectos que se toman en cuenta durante la corrección

> Te dejaré a continuación el significado de la simbología que empleo  
> |Significado|Simbolo empleado|
> |--:|:--|
> |¡Excelente!                           |💯|
> |¡Muy bien!. Se puede optimizar/mejorar|✅|
> |Está mal... pero no tan mal           |❎|
> |Falta / No se cumple                  |❌|

-----------------------Desafío 05---------------------------  

_Consigna_

- Ajustar nuestro servidor principal para trabajar con un sistema de login

_Aspectos a incluir_

- Deberá contar con todas las vistas realizadas en el **hands on lab**, así tambien como las rutas de router para procesar el resgistro y el login. ✅

> `Las vistas existen y doy fe de que están presentes... mas no funcionan del todo bien`

- Una vez completado el login, realizar la redirección directamente a la vista de productos 💯

> `Está haciendo correctamente una redirección, pero no hacia la vista de los productos.`

- Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario 💯

> `Excelente. redirige correctamente a la pagina y hay bienvenida.`

- Agregar un sistema de roles, de manrea que si colocamos en el login como correo *adminCoder@codoer.com*, y la contraseña adminCod3r123, el usuario de la sesión además tenga un campo **role = admin** _(se que esta ultimas 3 palabras no las decía, pero yo las consideré "logica" por contexto.)_  
- Todos los usuarios que no sean admin deberán contar con un rol _"usuario"_  ✅

> `La logica se encuentra correcta si al crear un usuario con los parametros enunciados, este toma un rol de admin, de lo contrario es un usuario común. Sin embargo, por fallas de las vistas, no lo pude corroborar con las vistas, si por otros medios.`

- Implementar botón de _"logout"_ para destruir la sesión y redirigir a la vista de login. ❎

> `Al logout le falta la logica de ejecución de funcion. Solo el script en el que borre la sesión..`

__Extra__

> `Para el logout, solo tienes que invocar en un script la ruta que tienes de logout. No debería ser mas complicado que eso. Obivamente, tienes que hacer el borrado de la sesion en tu base. es decir, el sessio destroy. Etc.`
  
  __Aviso:__

> `Ante cualquier duda o consulta, sabes que me puedes encontrar en el chat de la plataforma. Sin mas que añadir. Muchos exitos`