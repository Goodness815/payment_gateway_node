export const sendResetMail = (code) => {
  return `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <title>JIME</title>
    </head>
    <body style="font-family: 'Outfit', sans-serif">
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
      </style>
      <div style="background-color: white">
        <div
          style="
            border-bottom: 1px solid rgba(102, 102, 102, 0.548);
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: start;
          "
        >
          <img
            src="https://ophir.netlify.app/assets/logo-55d5e60c.png"
            alt=""
            width="100"
          />
        </div>
        <div style="padding: 20px; background-color: #3e1e7e">
          <div style="font-size: 14px; color: white; font-weight: 400">
            <p style="margin-bottom: 5px" color: white; font-weight: 400">
              A<strong> password reset </strong>was just initiated on your
              <strong> Account.</strong>
            </p>
            <p style="color: white;">
              If you did not initiate this request kindly ignore or reach out to
              support.
            </p>
            <br />
            <br />
  
            <p>
              Use this link to reset your password: <a style="color: white; font-weight: 400" href=${
                process.env.BASE_URL + "/reset/" + code
              }>${process.env.BASE_URL + "/reset/" + code}</a>
            </p>
          </div>
          <div style="font-size: 14px; color: white; font-weight: 400">
            <br />
            <br />
            <p style="font-weight: 700">OPHIR Developement Team</p>
          </div>
        </div>
      </div>
      <div
        style="
          border-top: 1px solid rgba(102, 102, 102, 0.548);
          padding: 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          font-family: 'Outfit', sans-serif;
        "
      >
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
          "
        >
          <i class="fa-brands fa-square-facebook" style="color: black"></i>
          <i
            class="fa-brands fa-twitter"
            style="color: black; margin: 0px 10px"
          ></i>
          <i class="fa-brands fa-instagram" style="color: black"></i>
        </div>
        <p
          style="
            font-weight: 400;
            font-size: 12px;
            color: black;
            margin-bottom: 0px;
          "
        >
          2023 OPHIR INSTITUTE. All Rights Reserved
        </p>
      </div>
    </body>
  </html>
  
  `;
};
export const sendWithdrawlMail = (information) => {
  return `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <title>JIME</title>
    </head>
    <body style="font-family: 'Outfit', sans-serif">
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
      </style>
      <div style="background-color: white">
        <div
          style="
            border-bottom: 1px solid rgba(102, 102, 102, 0.548);
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: start;
          "
        >
          <img
            src="https://ophir.netlify.app/assets/logo-55d5e60c.png"
            alt=""
            width="100"
          />
        </div>
        <div style="padding: 20px; background-color: #3e1e7e">
          <div style="font-size: 14px; color: white; font-weight: 400">
            <p style="margin-bottom: 5px" color: white; font-weight: 400">
              A<strong> withdrawal request </strong>was just
              <strong> Initated.</strong>
            </p>
            <p style="color: white;">
             Full Name:${information.fullName}
            </p>
            <p style="color: white;">
            Account Number:${information.accountNumber}
            
            </p>
            <p style="color: white;">
            Account Name:${information.accountName}
            
            </p>
            <p style="color: white;">
            Bank Name:${information.bankName}
            </p>
            <br />
            <br />
  
      
          </div>
          <div style="font-size: 14px; color: white; font-weight: 400">
            <br />
            <br />
            <p style="font-weight: 700">OPHIR Developement Team</p>
          </div>
        </div>
      </div>
      <div
        style="
          border-top: 1px solid rgba(102, 102, 102, 0.548);
          padding: 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: start;
          font-family: 'Outfit', sans-serif;
        "
      >
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
          "
        >
          <i class="fa-brands fa-square-facebook" style="color: black"></i>
          <i
            class="fa-brands fa-twitter"
            style="color: black; margin: 0px 10px"
          ></i>
          <i class="fa-brands fa-instagram" style="color: black"></i>
        </div>
        <p
          style="
            font-weight: 400;
            font-size: 12px;
            color: black;
            margin-bottom: 0px;
          "
        >
          2023 OPHIR INSTITUTE. All Rights Reserved
        </p>
      </div>
    </body>
  </html>
  
  `;
};
