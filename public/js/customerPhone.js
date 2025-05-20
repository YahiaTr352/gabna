
// // async function sendData() {

// //     try {
// //       baseURL = "http://localhost:3001";
// //       let fixedData;

// //       try {
// //       // استخرج UUID (publicID) من الـ URL فقط
// //       const pathParts = window.location.pathname.split("/");
// //       const publicID = pathParts[pathParts.length - 1]; // هذا هو الـ UUID الظاهر

// //       const res = await axios.get(`${baseURL}/api/clients/payment-data`, {
// //         withCredentials: true,
// //         headers: {
// //           "x-page-id": publicID, // نرسله كـ header
// //         }
// //       });

// //       const rawData = res.data;

// //       fixedData = {
// //         companyName: DOMPurify.sanitize(rawData.companyName),
// //         programmName: DOMPurify.sanitize(rawData.programmName),
// //         merchantMSISDN: DOMPurify.sanitize(rawData.merchantMSISDN),
// //         code: DOMPurify.sanitize(rawData.code),
// //         amount: DOMPurify.sanitize(rawData.amount),
// //         transactionID: DOMPurify.sanitize(rawData.transactionID)
// //       };
// //     } catch (error) {
// //       showToast("Failed to load payment data.");
// //       console.log(error);
// //       return;
// //     }


// //       try{
// //       const response = await axios.post(`${baseURL}/api/clients/get-token`, {
// //         companyName : fixedData.companyName ,
// //         programmName : fixedData.programmName  ,
// //         merchantMSISDN : fixedData.merchantMSISDN  ,
// //         code : fixedData.code  
// //       }, {
// //         withCredentials: true
// //       });
// //       const data = response.data;
  
// //       if (data.errorCode === 0) {
// //         console.log(data.token);
// //         const token = DOMPurify.sanitize(data.token);
// //         document.cookie = `token=${token}; path=/; SameSite=Lax`;
// //       }

// //     }catch(error){
// //       showToast("something went wrong, try again later.")
// //     }

// //     function getCookie(name) {
// //       const cookies = document.cookie.split("; ");
// //       const found = cookies.find(row => row.startsWith(name + "="));
// //       return found ? found.split("=")[1] : null;
// //     }
    
// //     const token = getCookie("token");
  
// //       document.getElementById("paymentForm").addEventListener("submit", async function (event) {
// //         event.preventDefault();
        
// //         const customerMSISDN = DOMPurify.sanitize(document.getElementById("customerMSISDN").value.trim());
// //         const confirmCustomerMSISDN = DOMPurify.sanitize(document.getElementById("confirmCustomerMSISDN").value.trim());

// //         if(!customerMSISDN || !confirmCustomerMSISDN){
// //           showToast("All fields are required.");
// //           return;
// //         }
  
// //         if (customerMSISDN !== confirmCustomerMSISDN) {
// //           showToast("Phone numbers do not match.");
// //           return;
// //         }
  
// //         const phoneRegex = /^0?9\d{8}$/;

// //         const validateCustomerPhoneNumber = (phoneNumber) => {
// //           return phoneRegex.test(phoneNumber) && !isNaN(phoneNumber);
// //         };        

// //         if (!validateCustomerPhoneNumber(customerMSISDN)){
// //           showToast("Invalid phone number. It must be a Syrian number starting with 09.");
// //           return;
// //         }
  
// //         try {
// //           const response = await axios.post('http://localhost:3001/api/clients/payment-request', {
// //             code : fixedData.code ,
// //             customerMSISDN,
// //             merchantMSISDN : fixedData.merchantMSISDN, 
// //             amount : fixedData.amount,
// //             transactionID : fixedData.transactionID,
// //             token
// //           }, {
// //             withCredentials: true // ✨ ضروري جداً
// //           });
// //           const result = response.data;
  
// //           if (result.errorCode === 0) {
// //             showToast("You have received an OTP. ✅" , "success");
// //             setTimeout(() => {
// //               // window.location.href = `http://localhost:3001/api/clients/otpVerification-page`;
// //               window.location.href = `http://localhost:3001/api/clients/otpVerification-page/${fixedData.transactionID}`;
// //             }, 3000);
// //           } 

// //         } catch (error) {
// //           console.log(error);
// //             if(error.response.status === 404){
// //               const errorMessage = DOMPurify.sanitize(error.response.data.message);
// //               showToast(errorMessage);
// //                return;
// //             }

// //             else{
// //               showToast("something went wrong, try again later.");
// //           }

// //           console.log(error);
// //         }
// //       });
  
// //     } catch (error) {
// //       console.error("Error getting token:", error);
// //     }
// //   }
  
// //   window.onload = sendData;
  

// let otpPageID = "";

// async function sendData() {
//   try {
//     const pathParts = window.location.pathname.split("/");
//     const publicID = pathParts[pathParts.length - 1];

//     const res = await axios.get(`http://localhost:3001/api/clients/payment-data`, {
//       withCredentials: true,
//       headers: {
//         "x-page-id": publicID
//       }
//     });

//     const rawData = res.data;

//     const fixedData = {
//       companyName: DOMPurify.sanitize(rawData.companyName),
//       programmName: DOMPurify.sanitize(rawData.programmName),
//       merchantMSISDN: DOMPurify.sanitize(rawData.merchantMSISDN),
//       code: DOMPurify.sanitize(rawData.code),
//       amount: DOMPurify.sanitize(rawData.amount),
//       transactionID: DOMPurify.sanitize(rawData.transactionID),
//     };

//     // جلب التوكن
//     const tokenRes = await axios.post("http://localhost:3001/api/clients/get-token", {
//       companyName: fixedData.companyName,
//       programmName: fixedData.programmName,
//       merchantMSISDN: fixedData.merchantMSISDN,
//       code: fixedData.code
//     }, {
//       withCredentials: true
//     });

//     const token = DOMPurify.sanitize(tokenRes.data.token);
//     document.cookie = `token=${token}; path=/; SameSite=Lax`;

//     // خزّن otpPageID
//     otpPageID = DOMPurify.sanitize(rawData.otpPageID); // لازم ترجعه من السيرفر إذا بدك تستخدمه هون
//   } catch (err) {
//     console.error("Error:", err);
//     showToast("Failed to load payment data.");
//     return;
//   }

//   document.getElementById("paymentForm").addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const customerMSISDN = DOMPurify.sanitize(document.getElementById("customerMSISDN").value.trim());
//     const confirmCustomerMSISDN = DOMPurify.sanitize(document.getElementById("confirmCustomerMSISDN").value.trim());

//     if (!customerMSISDN || !confirmCustomerMSISDN) {
//       showToast("All fields are required.");
//       return;
//     }

//     if (customerMSISDN !== confirmCustomerMSISDN) {
//       showToast("Phone numbers do not match.");
//       return;
//     }

//     const phoneRegex = /^0?9\d{8}$/;
//     if (!phoneRegex.test(customerMSISDN)) {
//       showToast("Invalid phone number. It must be a Syrian number starting with 09.");
//       return;
//     }

//     try {
//       const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

//       const response = await axios.post('http://localhost:3001/api/clients/payment-request', {
//         code: fixedData.code,
//         customerMSISDN,
//         merchantMSISDN: fixedData.merchantMSISDN,
//         amount: fixedData.amount,
//         transactionID: fixedData.transactionID,
//         token
//       }, {
//         withCredentials: true
//       });

//       const result = response.data;

//       if (result.errorCode === 0) {
//         showToast("You have received an OTP. ✅", "success");
//         setTimeout(() => {
//           window.location.href = `http://localhost:3001/api/clients/otpVerification-page/${otpPageID}`;
//         }, 3000);
//       }
//     } catch (err) {
//       console.error(err);
//       showToast("Something went wrong. Try again.");
//     }
//   });
// }

// window.onload = sendData;



  // let fixedData;
  // let otpPageID = "";

  // async function sendData() {
  //   const baseURL = "http://localhost:3001";

  //   try {
  //     // استخرج publicID من رابط الصفحة
  //     const pathParts = window.location.pathname.split("/");
  //     const publicID = pathParts[pathParts.length - 1];

  //     // جلب بيانات المعاملة من السيرفر
  //     const res = await axios.get(`${baseURL}/api/clients/payment-data`, {
  //       withCredentials: true,
  //       headers: {
  //         "x-page-id": publicID,
  //       }
  //     });

  //     const rawData = res.data;

  //     fixedData = {
  //       companyName: DOMPurify.sanitize(rawData.companyName),
  //       programmName: DOMPurify.sanitize(rawData.programmName),
  //       merchantMSISDN: DOMPurify.sanitize(rawData.merchantMSISDN),
  //       code: DOMPurify.sanitize(rawData.code),
  //       amount: DOMPurify.sanitize(rawData.amount),
  //       transactionID: DOMPurify.sanitize(rawData.transactionID)
  //     };

  //     otpPageID = DOMPurify.sanitize(rawData.otpPageID); // هذا يرجع من السيرفر لما تنشئ المعاملة

  //     // إرسال البيانات للحصول على التوكن
  //     const tokenRes = await axios.post(`${baseURL}/api/clients/get-token`, {
  //       companyName: fixedData.companyName,
  //       programmName: fixedData.programmName,
  //       merchantMSISDN: fixedData.merchantMSISDN,
  //       code: fixedData.code
  //     }, {
  //       withCredentials: true
  //     });

  //     const token = DOMPurify.sanitize(tokenRes.data.token);
  //     document.cookie = `token=${token}; path=/; SameSite=Lax`;

  //   } catch (error) {
  //     console.error("Error loading data:", error);
  //     showToast("فشل تحميل البيانات أو إنشاء المعاملة.");
  //     return;
  //   }

  //   // حدث عند إرسال النموذج
  //   document.getElementById("paymentForm").addEventListener("submit", async function (event) {
  //     event.preventDefault();

  //     const customerMSISDN = DOMPurify.sanitize(document.getElementById("customerMSISDN").value.trim());
  //     const confirmCustomerMSISDN = DOMPurify.sanitize(document.getElementById("confirmCustomerMSISDN").value.trim());

  //     if (!customerMSISDN || !confirmCustomerMSISDN) {
  //       showToast("جميع الحقول مطلوبة.");
  //       return;
  //     }

  //     if (customerMSISDN !== confirmCustomerMSISDN) {
  //       showToast("رقما الهاتف غير متطابقين.");
  //       return;
  //     }

  //     const phoneRegex = /^0?9\d{8}$/;
  //     if (!phoneRegex.test(customerMSISDN)) {
  //       showToast("رقم الهاتف غير صالح. يجب أن يبدأ بـ 09.");
  //       return;
  //     }

  //     const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

  //     try {
  //       const response = await axios.post(`${baseURL}/api/clients/payment-request`, {
  //         code: fixedData.code,
  //         customerMSISDN,
  //         merchantMSISDN: fixedData.merchantMSISDN,
  //         amount: fixedData.amount,
  //         transactionID: fixedData.transactionID,
  //         token
  //       }, {
  //         withCredentials: true
  //       });

  //       const result = response.data;

  //       if (result.errorCode === 0) {
  //         showToast("تم إرسال رمز التحقق. ✅", "success");

  //         setTimeout(() => {
  //           // التوجيه باستخدام publicID لصفحة OTP
  //           window.location.href = `${baseURL}/api/clients/otpVerification-page/${otpPageID}`;
  //         }, 3000);
  //       }

  //     } catch (err) {
  //       if (err.response?.status === 404) {
  //         const errorMessage = DOMPurify.sanitize(err.response.data.message);
  //         showToast(errorMessage);
  //       } else {
  //         showToast("حدث خطأ ما، حاول لاحقاً.");
  //       }
  //       console.error(err);
  //     }
  //   });
  // }

  // window.onload = sendData;


//   let fixedData;
// let otpPageID = "";

// async function sendData() {
//   const baseURL = "http://localhost:3001";

//   try {
//     // Extract publicID from the URL
//     const pathParts = window.location.pathname.split("/");
//     const publicID = pathParts[pathParts.length - 1];

//     // Fetch transaction data from the server
//     const res = await axios.get(`${baseURL}/api/clients/payment-data`, {
//       withCredentials: true,
//       headers: {
//         "x-page-id": publicID,
//       }
//     });

//     const rawData = res.data;

//     fixedData = {
//       companyName: DOMPurify.sanitize(rawData.companyName),
//       programmName: DOMPurify.sanitize(rawData.programmName),
//       merchantMSISDN: DOMPurify.sanitize(rawData.merchantMSISDN),
//       code: DOMPurify.sanitize(rawData.code),
//       amount: DOMPurify.sanitize(rawData.amount),
//       transactionID: DOMPurify.sanitize(rawData.transactionID)
//     };

//     otpPageID = DOMPurify.sanitize(rawData.otpPageID);

//     // Request token
//     const tokenRes = await axios.post(`${baseURL}/api/clients/get-token`, {
//       companyName: fixedData.companyName,
//       programmName: fixedData.programmName,
//       merchantMSISDN: fixedData.merchantMSISDN,
//       code: fixedData.code
//     }, {
//       withCredentials: true
//     });

//     const token = DOMPurify.sanitize(tokenRes.data.token);
//     document.cookie = `token=${token}; path=/; SameSite=Lax`;

//   } catch (error) {
//     console.error("Error loading data:", error);
//     showToast("Failed to load data or create transaction.");
//     return;
//   }

//   // Handle form submission
//   document.getElementById("paymentForm").addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const customerMSISDN = DOMPurify.sanitize(document.getElementById("customerMSISDN").value.trim());
//     const confirmCustomerMSISDN = DOMPurify.sanitize(document.getElementById("confirmCustomerMSISDN").value.trim());

//     if (!customerMSISDN || !confirmCustomerMSISDN) {
//       showToast("All fields are required.");
//       return;
//     }

//     if (customerMSISDN !== confirmCustomerMSISDN) {
//       showToast("Phone numbers do not match.");
//       return;
//     }

//     const phoneRegex = /^0?9\d{8}$/;
//     if (!phoneRegex.test(customerMSISDN)) {
//       showToast("Invalid phone number. It must start with 09.");
//       return;
//     }

//     const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

//     try {
//       const response = await axios.post(`${baseURL}/api/clients/payment-request`, {
//         code: fixedData.code,
//         customerMSISDN,
//         merchantMSISDN: fixedData.merchantMSISDN,
//         amount: fixedData.amount,
//         transactionID: fixedData.transactionID,
//         token
//       }, {
//         withCredentials: true
//       });

//       const result = response.data;

//       if (result.errorCode === 0) {
//         showToast("Verification code sent successfully. ✅", "success");

//         setTimeout(() => {
//           // Redirect to OTP verification page
//           window.location.href = `${baseURL}/api/clients/otpVerification-page/${otpPageID}`;
//         }, 3000);
//       }

//     } catch (err) {
//       if (err.response?.status === 404) {
//         const errorMessage = DOMPurify.sanitize(err.response.data.message);
//         showToast(errorMessage);
//       } else {
//         showToast("Something went wrong, please try again later.");
//       }
//       console.error(err);
//     }
//   });
// }

// window.onload = sendData;

const baseURL = "https://gabna-qjbq.onrender.com";

async function sendData() {
  try {
    // توليد مفتاح RSA للمتصفح
    rsaKeyPair = await generateRSAKeyPair();
    const exportedPublicKey = await exportPublicKey(rsaKeyPair.publicKey);
    const resKey = await axios.post(`${baseURL}/api/clients/exchange-keys`, {
      clientPublicKey: exportedPublicKey, // ✅ تعديل الاسم
    }, {
      withCredentials: true
    });

    serverPublicKey = await importServerPublicKey(resKey.data.serverPublicKey);


        const pathParts = window.location.pathname.split("/");
const publicID = pathParts[pathParts.length - 1];
const payload = { pageID: publicID };
const encryptedPayload = await encryptHybrid(JSON.stringify(payload), serverPublicKey);

// 2. إرسال الطلب المشفر بـ POST
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


    // تشفير البيانات وإرسال طلب token
    const tokenPayload ={
      companyName: fixedData.companyName,
      programmName: fixedData.programmName,
      merchantMSISDN: fixedData.merchantMSISDN,
      code: fixedData.code
    };

    const encryptedTokenPayload = await encryptHybrid(JSON.stringify(tokenPayload), serverPublicKey);

    const tokenRes = await axios.post(`${baseURL}/api/clients/get-token`, encryptedTokenPayload, {
      withCredentials: true
    });

    const result = await decryptHybrid(tokenRes.data, rsaKeyPair.privateKey);
    console.log(result);
    document.cookie = `token=${result.token}; path=/; SameSite=Lax`;

  } catch (error) {
    if (error.response?.data?.encryptedAESKey) {
      // إذا الخطأ مشفّر
      const decryptedError = await decryptHybrid(error.response.data, rsaKeyPair.privateKey);
      const errMsg = decryptedError.message || decryptedError.errorDesc || "Unknown encrypted error";
      console.log(DOMPurify.sanitize(errMsg), "error");
      showToast("something went wrong, try again later.")
    } else {
      console.log(DOMPurify.sanitize(error));
    }
}
  // معالجة الفورم
  document.getElementById("paymentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const customerMSISDN = DOMPurify.sanitize(document.getElementById("customerMSISDN").value.trim());
    const confirmCustomerMSISDN = DOMPurify.sanitize(document.getElementById("confirmCustomerMSISDN").value.trim());

    if (!customerMSISDN || !confirmCustomerMSISDN) {
      return showToast("All fields are required.");
    }

    if (customerMSISDN !== confirmCustomerMSISDN) {
      return showToast("Phone numbers do not match.");
    }

    const phoneRegex = /^0?9\d{8}$/;
    if (!phoneRegex.test(customerMSISDN)) {
      return showToast("Invalid phone number. It must start with 09.");
    }

    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

    try {
    
      const paymentRequestPayload = {
        code: fixedData.code,
        customerMSISDN,
        merchantMSISDN: fixedData.merchantMSISDN,
        amount: fixedData.amount,
        transactionID: fixedData.transactionID,
        token
      };

      const encryptedpaymentRequestPayload = await encryptHybrid(JSON.stringify(paymentRequestPayload), serverPublicKey);

      const response = await axios.post(`${baseURL}/api/clients/payment-request`, encryptedpaymentRequestPayload, {
        withCredentials: true
      });

      const result = await decryptHybrid(response.data, rsaKeyPair.privateKey);

      if (result.errorCode === 0) {
        showToast("Verification code sent successfully ✅", "success");
        setTimeout(() => {
          window.location.href = `${baseURL}/api/clients/otpVerification-page/${otpPageID}`;
        }, 3000);
      } else {
        showToast(result.message || "Something went wrong.");
      }
    } catch (error) {

    if (error.response?.data?.encryptedAESKey) {
      // إذا الخطأ مشفّر
      const decryptedError = await decryptHybrid(error.response.data, rsaKeyPair.privateKey);
      const errMsg = decryptedError.message || decryptedError.errorDesc || "Unknown encrypted error";
      console.log(DOMPurify.sanitize(errMsg), "error");

if (error.response.status === 404) {
  const errorMessage = DOMPurify.sanitize(errMsg); // الرسالة المفكوكة
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
}

window.onload = sendData;


