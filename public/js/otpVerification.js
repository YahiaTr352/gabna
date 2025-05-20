// (async function () {
//   let fixedData;
// try {
//  const res = await axios.get("http://localhost:3001/api/clients/payment-data", {
//    withCredentials: true,
//  });
//  console.log(res);
//  fixedData = res.data;
// } catch (error) {
//  showToast("Failed to load payment data.");
//  console.log(error);
//  return;
// }

// // function getQueryParams() {
// //   const params = new URLSearchParams(window.location.search);
// //   return {
// //     otp: params.get('otp')
// //   };
// // }

// // const otp = getQueryParams();
// // console.log(fixedData);
// // console.log(`otp is : ${otp}`);

// function getCookie(name) {
//   const cookies = document.cookie.split("; ");
//   const found = cookies.find(row => row.startsWith(name + "="));
//   return found ? found.split("=")[1] : null;
// }

// const token = getCookie("token");


// // console.log(fixedData.merchantMSISDN);
// document.addEventListener("DOMContentLoaded", () => {
//   // const otp = fixedData.otp;
//   // const token = localStorage.getItem("token");
//   const otp = fixedData.otp;
//   console.log(otp);
//   showToast(`Your verification code is : ${otp}`, "success", 10000);


//   // showToast(`Your verification code is : ${otp}` , "success" , 10000);

//     const inputs = document.querySelectorAll(".otp-inputs input");
//     const resendBtn = document.getElementById("resendBtn");
//     const form = document.getElementById("otpForm");
  
//     inputs.forEach((input, index) => {
//       input.addEventListener("input", () => {
//         if (input.value.length === 1 && index < inputs.length - 1) {
//           inputs[index + 1].focus();
//         }
//       });
  
//       input.addEventListener("keydown", (e) => {
//         if (e.key === "Backspace" && !input.value && index > 0) {
//           inputs[index - 1].focus();
//         }
//       });
//     });
  
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const otpCode = Array.from(inputs).map((input) => input.value).join("");
  
//       if (otpCode.length !== 6 || !/^\d{6}$/.test(otpCode)) {
//         showToast("Please enter a valid 6-digit OTP.");
//         return;
//       }
  
//       try {
//         const response = await axios.post("http://localhost:3001/api/clients/payment-confirmation", {
//           code : fixedData.code,
//           merchantMSISDN: fixedData.merchantMSISDN,
//           transactionID: fixedData.transactionID,
//           OTP: otpCode,
//           token
//         }, {
//           withCredentials: true // ✨ ضروري جداً
//         });
  
//         if (response.data.errorCode === 0) {
//           showToast("OTP verified successfully! ✅" , "success");
//         }

//       } catch (error) {
//         console.log(error);
//         if(error.response.status === 404 || 405 || 406 || 407 || 408 || 410 ){
//           showToast(error.response.data.errorDesc);
//         }

//         else {
//           showToast("something went wrong, try again later.");
//         }
//       }
//     });

//     resendBtn.addEventListener("click", async () => {
//       if (resendBtn.classList.contains("disabled")) return;
    
//       resendBtn.classList.add("disabled");
//       let seconds = 60;
//       resendBtn.textContent = `Resend OTP in ${seconds}s`;
    
//       const timerInterval = setInterval(() => {
//         seconds--;
//         resendBtn.textContent = `Resend OTP in ${seconds}s`;
//         if (seconds <= 0) {
//           clearInterval(timerInterval);
//           resendBtn.classList.remove("disabled");
//           resendBtn.textContent = "Resend OTP";
//         }
//       }, 1000);
    
//       try {
//         const response = await axios.post("http://localhost:3001/api/clients/resend-otp", {
//           code: fixedData.code,
//           merchantMSISDN: fixedData.merchantMSISDN,
//           transactionID: fixedData.transactionID,
//           token
//         }, {
//           withCredentials: true
//         });
    
//         if (response.data.errorCode === 0) {
//           const newOtp = response.data.otp;
//           showToast(`Your verification code is : ${newOtp}` , "success" , 10000);
//         }
//       } catch (error) {
//         console.log(error);
//         clearInterval(timerInterval);
//         resendBtn.classList.remove("disabled");
//         resendBtn.textContent = "Resend OTP";

//         showToast("something went wrong, try again later.");

//       }
//     });    
//   });
// })();

// (async function () {
//   let fixedData;

//   try {
//     const res = await axios.get("http://localhost:3001/api/clients/payment-data", {
//       withCredentials: true,
//     });
//     fixedData = res.data;
//     console.log("paymentData:", fixedData);
//   } catch (error) {
//     showToast("Failed to load payment data.");
//     console.log(error);
//     return;
//   }

//     // Helper
//     function getCookie(name) {
//       const cookies = document.cookie.split("; ");
//       const found = cookies.find(row => row.startsWith(name + "="));
//       return found ? found.split("=")[1] : null;
//     }

//   const token = getCookie("token");

//   // الآن نبدأ بتنفيذ الكود لما نتأكد أن fixedData جاهز
//   const otp = fixedData.otp;
//   console.log(`OTP is: ${otp}`);
//   showToast(`Your verification code is : ${otp}`, "success", 10000);

//   const inputs = document.querySelectorAll(".otp-inputs input");
//   const resendBtn = document.getElementById("resendBtn");
//   const form = document.getElementById("otpForm");

//   inputs.forEach((input, index) => {
//     input.addEventListener("input", () => {
//       if (input.value.length === 1 && index < inputs.length - 1) {
//         inputs[index + 1].focus();
//       }
//     });

//     input.addEventListener("keydown", (e) => {
//       if (e.key === "Backspace" && !input.value && index > 0) {
//         inputs[index - 1].focus();
//       }
//     });
//   });

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const otpCode = Array.from(inputs).map((input) => input.value).join("");

//     console.log("Typed OTP:", otpCode);
//     console.log("Expected OTP:", fixedData.otp);

//     if (otpCode.length !== 6 || !/^\d{6}$/.test(otpCode)) {
//       showToast("Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       console.log(fixedData);
//       const response = await axios.post("http://localhost:3001/api/clients/payment-confirmation", {
//         code: fixedData.code,
//         merchantMSISDN: fixedData.merchantMSISDN,
//         OTP: otpCode,
//         token
//       }, {
//         withCredentials: true
//       });

//       if (response.data.errorCode === 0) {
//         showToast("OTP verified successfully! ✅", "success");
//       }
//     } catch (error) {
//       console.log(error.message);
    
//       if (error.response && [404, 405, 406, 407, 408, 410].includes(error.response.status)) {
//         showToast(error.response.data.errorDesc);
//       } else {
//         showToast("Something went wrong, try again later.");
//         console.log(error.message);
//       }
//     }
//   });

//   resendBtn.addEventListener("click", async () => {
//     if (resendBtn.classList.contains("disabled")) return;

//     resendBtn.classList.add("disabled");
//     let seconds = 60;
//     resendBtn.textContent = `Resend OTP in ${seconds}s`;

//     const timerInterval = setInterval(() => {
//       seconds--;
//       resendBtn.textContent = `Resend OTP in ${seconds}s`;
//       if (seconds <= 0) {
//         clearInterval(timerInterval);
//         resendBtn.classList.remove("disabled");
//         resendBtn.textContent = "Resend OTP";
//       }
//     }, 1000);

//     try {
//       const response = await axios.post("http://localhost:3001/api/clients/resend-otp", {
//         code: fixedData.code,
//         merchantMSISDN: fixedData.merchantMSISDN,
//         transactionID: fixedData.transactionID,
//         token
//       }, {
//         withCredentials: true
//       });

//       if (response.data.errorCode === 0) {
//         const newOtp = response.data.otp;
//         showToast(`Your verification code is : ${newOtp}`, "success", 10000);
//       }
//     } catch (error) {
//       console.log(error);
//       clearInterval(timerInterval);
//       resendBtn.classList.remove("disabled");
//       resendBtn.textContent = "Resend OTP";

//       showToast("something went wrong, try again later.");
//     }
//   });


// })();

// document.addEventListener("DOMContentLoaded", async () => {
//   let fixedData;

  // try {
  //   baseURL = "http://localhost:3001"

  //   const res = await axios.get(`${baseURL}/api/clients/payment-data`, {
  //     withCredentials: true,
  //   });
  //   const rawData = res.data;

  //   fixedData = {
  //     otp: DOMPurify.sanitize(rawData.otp),
  //     code: DOMPurify.sanitize(rawData.code),
  //     merchantMSISDN: DOMPurify.sanitize(rawData.merchantMSISDN),
  //     transactionID: DOMPurify.sanitize(rawData.transactionID),
  //   };

  // } catch (error) {
  //   showToast("Failed to load payment data.");
  //   console.log(error);
  //   return;
  // }

//   try {
//         baseURL = "http://localhost:3001"
//   const pathParts = window.location.pathname.split("/");
//   const transactionID = pathParts[pathParts.length - 1];

//   const res = await axios.get(`${baseURL}/api/clients/payment-data?transactionID=${transactionID}`, {
//     withCredentials: true,
//   });

//   console.log(res);
//   const rawData = res.data;

//     fixedData = {
//       otp: DOMPurify.sanitize(rawData.otp),
//       code: DOMPurify.sanitize(rawData.code),
//       merchantMSISDN: DOMPurify.sanitize(rawData.merchantMSISDN),
//       transactionID: DOMPurify.sanitize(rawData.transactionID),
//     };
// } catch (error) {
//   showToast("Failed to load payment data.");
//   console.log(error);
//   return;
// }


//   // Helper
//   function getCookie(name) {
//     const cookies = document.cookie.split("; ");
//     const found = cookies.find(row => row.startsWith(name + "="));
//     return found ? found.split("=")[1] : null;
//   }

//   const token = getCookie("token");

//   const otp = fixedData.otp;
//   console.log(otp);
//   console.log(`OTP is: ${otp}`);
//   showToast(`Your verification code is : ${otp}`, "success", 10000);

//   const inputs = document.querySelectorAll(".otp-inputs input");
//   const resendBtn = document.getElementById("resendBtn");
//   const form = document.getElementById("otpForm");

//   inputs.forEach((input, index) => {
//     input.addEventListener("input", () => {
//       if (input.value.length === 1 && index < inputs.length - 1) {
//         inputs[index + 1].focus();
//       }
//     });

//     input.addEventListener("keydown", (e) => {
//       if (e.key === "Backspace" && !input.value && index > 0) {
//         inputs[index - 1].focus();
//       }
//     });
//   });

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const otpCode = DOMPurify.sanitize(Array.from(inputs).map((input) => input.value).join(""));

//     console.log("Typed OTP:", otpCode);
//     console.log("Expected OTP:", fixedData.otp);

//     if (otpCode.length !== 6 || !/^\d{6}$/.test(otpCode)) {
//       showToast("Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${baseURL}/api/clients/payment-confirmation`, {
//         code: fixedData.code,
//         merchantMSISDN: fixedData.merchantMSISDN,
//          transactionID : fixedData.transactionID,
//         OTP: otpCode,
//         token
//       }, {
//         withCredentials: true
//       });

//       if (response.data.errorCode === 0) {
//         showToast("OTP verified successfully! ✅", "success");
//       }
//     } catch (error) {
//       console.log(error.message);

//       if (error.response && [404, 405, 406, 407, 408, 409 , 410 , 411 , 412].includes(error.response.status)) {
//         const errorMessage = DOMPurify.sanitize(error.response.data.errorDesc);
//         showToast(errorMessage);
//       } else {
//         showToast("Something went wrong, try again later.");
//         console.log(error.message);
//         console.log(error);
//       }
//     }
//   });

//   resendBtn.addEventListener("click", async () => {
//     if (resendBtn.classList.contains("disabled")) return;

//     resendBtn.classList.add("disabled");
//     let seconds = 60;
//     resendBtn.textContent = `Resend OTP in ${seconds}s`;

//     const timerInterval = setInterval(() => {
//       seconds--;
//       resendBtn.textContent = `Resend OTP in ${seconds}s`;
//       if (seconds <= 0) {
//         clearInterval(timerInterval);
//         resendBtn.classList.remove("disabled");
//         resendBtn.textContent = "Resend OTP";
//       }
//     }, 1000);

//     try {
//       const response = await axios.post(`${baseURL}/api/clients/resend-otp`, {
//         code: fixedData.code,
//         merchantMSISDN: fixedData.merchantMSISDN,
//         transactionID: fixedData.transactionID,
//         token
//       }, {
//         withCredentials: true
//       });

//       console.log("Resend OTP response:", response.data);

//       if (response.data.errorCode === 0) {
//         const newOtp = DOMPurify.sanitize(response.data.otp);
//         if (newOtp) {
//           showToast(`Your verification code is : ${newOtp}`, "success", 10000);
//         } else {
//           showToast("OTP not returned from server", "error");
//         }
//       }
//     } catch (error) {
//       if (error.response && [405 , 410].includes(error.response.status)) {
//         clearInterval(timerInterval);
//         resendBtn.classList.remove("disabled");
//         resendBtn.textContent = "Resend OTP";
//         const errorMessage = DOMPurify.sanitize(error.response.data.errorDesc);
//         showToast(errorMessage);
//       } else {
//       console.log(error);
//       clearInterval(timerInterval);
//       resendBtn.classList.remove("disabled");
//       resendBtn.textContent = "Resend OTP";
//       showToast("Something went wrong, try again later.");
//       }
//     }
//   });
// });

window.addEventListener("DOMContentLoaded", async () => {
  const baseURL = "https://paymentgateway-0bks.onrender.com"
  let fixedData;

  try {

    
    // // ✅ استخراج الـ publicID من الـ URL
    // const pathParts = window.location.pathname.split("/");
    // const publicID = pathParts[pathParts.length - 1];

    // // ✅ جلب البيانات من السيرفر باستخدام الـ publicID كـ Header
    // const res = await axios.get(`${baseURL}/api/clients/payment-data`, {
    //   withCredentials: true,
    //   headers: {
    //     "x-page-id": publicID
    //   }
    // });

    // const rawData = res.data;

    // fixedData = {
    //   companyName: DOMPurify.sanitize(rawData.companyName),
    //   programmName: DOMPurify.sanitize(rawData.programmName),
    //   otp: DOMPurify.sanitize(rawData.otp),
    //   code: DOMPurify.sanitize(rawData.code),
    //   merchantMSISDN: DOMPurify.sanitize(rawData.merchantMSISDN),
    //   transactionID: DOMPurify.sanitize(rawData.transactionID)
    // };

     // توليد مفتاح RSA للمتصفح
    rsaKeyPair = await generateRSAKeyPair();
    const exportedPublicKey = await exportPublicKey(rsaKeyPair.publicKey);
    const resKey = await axios.post(`${baseURL}/api/clients/exchange-keys`, {
      clientPublicKey: exportedPublicKey, // ✅ تعديل الاسم
    }, {
      withCredentials: true
    });

    serverPublicKey = await importServerPublicKey(resKey.data.serverPublicKey);

    } catch (error){
      console.log(error);
    }


        const pathParts = window.location.pathname.split("/");
    const publicID = pathParts[pathParts.length - 1];
const payload = { pageID: publicID };
const encryptedPayload = await encryptHybrid(JSON.stringify(payload), serverPublicKey);


try{
const res = await axios.post(`${baseURL}/api/clients/payment-data`, encryptedPayload, {
  withCredentials: true
});


console.log(res);

// 3. فك تشفير الاستجابة
const decrypted = await decryptHybrid(res.data, rsaKeyPair.privateKey);
const rawData = decrypted;

console.log(rawData);


// 4. تعقيم البيانات
fixedData = {
  companyName: DOMPurify.sanitize(rawData.companyName),
  programmName: DOMPurify.sanitize(rawData.programmName),
  merchantMSISDN: DOMPurify.sanitize(rawData.merchantMSISDN),
  code: DOMPurify.sanitize(rawData.code),
  amount: DOMPurify.sanitize(rawData.amount),
  transactionID: DOMPurify.sanitize(rawData.transactionID),
  otp: DOMPurify.sanitize(rawData.otp),
};
otpPageID = DOMPurify.sanitize(rawData.otpPageID);

} catch (error) {
    if (error.response?.data?.encryptedAESKey) {
      // إذا الخطأ مشفّر
      const decryptedError = await decryptHybrid(error.response.data, rsaKeyPair.privateKey);
      const errMsg = decryptedError.message || decryptedError.errorDesc || "Unknown encrypted error";
      console.log(DOMPurify.sanitize(errMsg), "error");
    }
     else {
      console.log(DOMPurify.sanitize(error));
    }
}
  // ✅ عرض OTP في toast للتجريب
  console.log(`OTP is: ${fixedData.otp}`);
  showToast(`Your verification code is: ${fixedData.otp}`, "success", 10000);

  // ✅ قراءة التوكن من الكوكيز
  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const found = cookies.find(row => row.startsWith(name + "="));
    return found ? found.split("=")[1] : null;
  }

  const token = getCookie("token");

  const inputs = document.querySelectorAll(".otp-inputs input");
  const resendBtn = document.getElementById("resendBtn");
  const form = document.getElementById("otpForm");

  // ✅ التنقل بين خانات الإدخال
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  // ✅ التحقق من رمز OTP عند الإرسال
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const otpCode = DOMPurify.sanitize(Array.from(inputs).map(input => input.value).join(""));

    if (otpCode.length !== 6 || !/^\d{6}$/.test(otpCode)) {
      showToast("Please enter a valid 6-digit OTP.");
      return;
    }

    // try {
    //   const response = await axios.post(`${baseURL}/api/clients/payment-confirmation`, {
    //     code: fixedData.code,
    //     merchantMSISDN: fixedData.merchantMSISDN,
    //     transactionID: fixedData.transactionID,
    //     OTP: otpCode,
    //     token
    //   }, {
    //     withCredentials: true
    //   });

    //   if (response.data.errorCode === 0) {
    //     showToast("OTP verified successfully! ✅", "success");
    //     // يمكنك التوجيه إلى صفحة نجاح مثلاً
    //   } else {
    //     showToast("Verification failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.log(error);

    //   if (error.response && error.response.data?.errorDesc) {
    //     showToast(DOMPurify.sanitize(error.response.data.errorDesc));
    //   } else {
    //     showToast("Something went wrong, try again later.");
    //   }
    // }

        const paymentConfirmationPayload ={
          code: fixedData.code,
          merchantMSISDN: fixedData.merchantMSISDN,
          transactionID: fixedData.transactionID,
          OTP: otpCode,
          token
    };

    const encryptedPaymentConfirmationPayload = await encryptHybrid(JSON.stringify(paymentConfirmationPayload), serverPublicKey);

    try {
    const confirmRes = await axios.post(`${baseURL}/api/clients/payment-confirmation`, encryptedPaymentConfirmationPayload, {
      withCredentials: true
    });
const decryptedConfirmRes = await decryptHybrid(confirmRes.data, rsaKeyPair.privateKey);


if (decryptedConfirmRes.errorCode === 0) {
  showToast("OTP verified successfully! ✅", "success");

  // ثم نرسل getRedirct-url كالمعتاد
         const redirectUrlPayload ={
        companyName: fixedData.companyName,
        programmName: fixedData.programmName,
        code: fixedData.code
    };


    try{
    const encryptedRedirectUrlPayload = await encryptHybrid(JSON.stringify(redirectUrlPayload), serverPublicKey);

    

    const urlResponse = await axios.post(`${baseURL}/api/clients/getRedirct-url`, encryptedRedirectUrlPayload, {
      withCredentials: true
    });


    const decryptedUrlResponse = await decryptHybrid(urlResponse.data, rsaKeyPair.privateKey);

   if (decryptedUrlResponse.url) {
    window.location.href = decryptedUrlResponse.url;
  } else {
    showToast("URL not found for this transaction.");
  }
  }catch (error) {
    if (error.response?.data?.encryptedAESKey) {
      // إذا الخطأ مشفّر
      const decryptedError = await decryptHybrid(error.response.data, rsaKeyPair.privateKey);
      const errMsg = decryptedError.message || decryptedError.errorDesc || "Unknown encrypted error";
      console.log(DOMPurify.sanitize(errMsg), "error");
    }
    else {
      console.log("Unexpected error occurred", "error");
    }
}

} 

} catch (error) {

    if (error.response?.data?.encryptedAESKey) {
      // إذا الخطأ مشفّر
      const decryptedError = await decryptHybrid(error.response.data, rsaKeyPair.privateKey);
      const errMsg = decryptedError.message || decryptedError.errorDesc || "Unknown encrypted error";
      console.log(DOMPurify.sanitize(errMsg), "error");

 if(error.response.status === 404 || 405 || 406 || 407 || 408 || 410 ){
        const errorMessage = DOMPurify.sanitize(errMsg);
        showToast(errorMessage);
        return;
    }

    else {
      showToast("something went wrong, try again later.");
    }


    } else {
      console.log(DOMPurify.sanitize(error));
      showToast("something went wrong, try again later.");
    }
}
  });

  // ✅ إعادة إرسال OTP
  resendBtn.addEventListener("click", async () => {
    if (resendBtn.classList.contains("disabled")) return;

    resendBtn.classList.add("disabled");
    let seconds = 60;
    resendBtn.textContent = `Resend OTP in ${seconds}s`;

    const timerInterval = setInterval(() => {
      seconds--;
      resendBtn.textContent = `Resend OTP in ${seconds}s`;
      if (seconds <= 0) {
        clearInterval(timerInterval);
        resendBtn.classList.remove("disabled");
        resendBtn.textContent = "Resend OTP";
      }
    }, 1000);

            const resendOtpPayload ={
        code: fixedData.code,
        merchantMSISDN: fixedData.merchantMSISDN,
        transactionID: fixedData.transactionID,
        token
    };

    const encryptedresendOtpPayload = await encryptHybrid(JSON.stringify(resendOtpPayload), serverPublicKey);

    try {
    const response = await axios.post(`${baseURL}/api/clients/resend-otp`, encryptedresendOtpPayload, {
      withCredentials: true
    });


    const decryptedResendOtp = await decryptHybrid(response.data, rsaKeyPair.privateKey);

      if (decryptedResendOtp.errorCode === 0) {
        const newOtp = DOMPurify.sanitize(decryptedResendOtp.otp);
        showToast(`Your new verification code is: ${newOtp}`, "success", 10000);
      } 
    }catch (error) {
    if (error.response?.data?.encryptedAESKey) {
      // إذا الخطأ مشفّر
      const decryptedError = await decryptHybrid(error.response.data, rsaKeyPair.privateKey);
      const errMsg = decryptedError.message || decryptedError.errorDesc || "Unknown encrypted error";
      console.log(DOMPurify.sanitize(errMsg), "error");

      if (error.response && [405 , 410].includes(error.response.status)) {
        clearInterval(timerInterval);
        resendBtn.classList.remove("disabled");
        resendBtn.textContent = "Resend OTP";
        const errorMessage = DOMPurify.sanitize(errMsg);
        showToast(errorMessage);
        return;

      } else {
      clearInterval(timerInterval);
      resendBtn.classList.remove("disabled");
      resendBtn.textContent = "Resend OTP";
      showToast("Something went wrong, try again later.");
      }
    } else {
      console.log(DOMPurify.sanitize(error));
      showToast("something went wrong, try again later.");
    }
}
  });
});
