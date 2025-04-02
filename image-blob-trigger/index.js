const axios = require("axios");

module.exports = async function (context, myBlob) {
  context.log("Blob trigger function processed a blob");
  context.log("수동 실행: Blob Trigger 테스트");
  context.log("Blob 이름:", context.bindingData?.blobTrigger || "없음");
  context.log("Blob 크기:", myBlob ? myBlob.length : "없음");

  const blobName = context.bindingData.imageName;
  // const containerName = context.bindingData.containerName;
  const containerName = "images";
  const blobUrl = `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${blobName}`;

  context.log("blobUrl : "+blobUrl);
  try {
    const response = await axios.post(
      `${process.env.VISION_ENDPOINT}/computervision/imageanalysis:analyze?api-version=2024-02-01&features=denseCaptions&language=en`,
      {
        url: blobUrl
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": process.env.VISION_KEY
        }
      }
    );
    const captions = response.data?.denseCaptionsResult?.values || [];
    context.log("Dense captions:", captions);
  } catch (err) {
    context.log.error("Vision API 호출 중 오류 발생:", err.message);
  }
}; 