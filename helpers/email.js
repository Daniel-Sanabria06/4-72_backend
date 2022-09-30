import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos
{/*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sanabria3210@gmail.com',
        pass: '200311dsS' // naturally, replace both with your real credentials or an application-specific password
      }
    });
    
    const mailOptions = {
      from: 'sanabria3210@gmail.com',
      to: email,
      subject: 'Invoices due',
      text: 'Dudes, we really need your money.'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
 */}
   const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      //Información del email

      const info = await transport.sendMail({
            from: '"Blog Devocionales y Sermones Cristianos" <cuentas@uptask.com>',
            to: email,
            subject: "Blog Devocionales y Sermones Cristianos - Confirma Tu Cuenta",
            text: "Comprueba Tu Cuenta en Blog Devocionales y Sermones Cristianos",
            html: `
                <p>Hola: ${nombre} Comprueba Tu Cuenta en UpTask</p>
                <p>Tu cuenta está casi lista, solo debes comprobarla en el siguiente enlace:</p>
                <a href=" ${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
                <p>Si no creaste esta cuenta, puedes ignorar este mensaje</p>
            `,
      })


}

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos

  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    //Información del email

    const info = await transport.sendMail({
          from: '"UpTask - Administrador De Proyectos" <cuentas@uptask.com>',
          to: email,
          subject: "UpTask - Reestablece tu Contraseña",
          text: "Reestablece tu Contraseña en UpTask",
          html: `
              <p>Hola: ${nombre} Has solicitado reestablecer tu contraseña</p>
              <p>Sigue el siguiente enlace para generar una nueva contraseña:</p>
              <a href=" ${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a>
              <p>Si no solicitaste este email, puedes ignorar este mensaje</p>
          `,
    })
}